import { Injectable } from '@angular/core';
import { DavesaMockApiService, DavesaMockApiUtils } from '@davesa/lib/mock-api';
import { User } from 'app/core/interfaces/user.interface';
import { UsersService } from 'app/modules/davesa/apps/users/users.service';
import { assign, cloneDeep } from 'lodash-es';
import { from, map, Subject, takeUntil } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class UsersMockApi {
    private _users: User[];
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _davesaMockApiService: DavesaMockApiService,
        private _usersService: UsersService
    ) {


        // Register Mock API handlers
        this.registerHandlers();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Register Mock API handlers
     */
    registerHandlers(): void {
        // -----------------------------------------------------------------------------------------------------
        // @ Users - GET
        // -----------------------------------------------------------------------------------------------------
        this._davesaMockApiService.onGet('api/apps/users/all').reply(() => {
            // Clone the users
            const users = cloneDeep(this._users);

            // Sort the users by the name field by default
            users.sort((a:any, b:any) => a.name.localeCompare(b.name));

            // Return the response
            return [200, users];
        });

        // -----------------------------------------------------------------------------------------------------
        // @ Users Search - GET
        // -----------------------------------------------------------------------------------------------------
        this._davesaMockApiService
            .onGet('api/apps/users/search')
            .reply(({ request }) => {
                this._usersService.users$
                .pipe(takeUntil(this._unsubscribeAll))
                .subscribe((users: User[]) => {
                    this._users = users;
                });
    
                // Get the search query
                const query = request.params.get('query');
                // Clone the users
                let users = cloneDeep(this._users);

                // If the query exists...
                if (query) {
                    // Filter the contacts
                    users = users.filter(
                        (contact: any) =>
                            contact.name &&
                            contact.name
                                .toLowerCase()
                                .includes(query.toLowerCase())
                    );
                }

                // Sort the contacts by the name field by default
                users.sort((a:any, b:any) => a.name.localeCompare(b.name));

                // Return the response
                return [200, users];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ USer - GET
        // -----------------------------------------------------------------------------------------------------
        this._davesaMockApiService
            .onGet('api/apps/users/user')
            .reply(({ request }) => {
                // Get the id from the params
                const oid = request.params.get('id');

                // Clone the users
                const users = cloneDeep(this._users);

                // Find the user
                const user = users.find((item) => item.oid === oid);

                // Return the response
                return [200, user];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ USer - POST
        // -----------------------------------------------------------------------------------------------------
        this._davesaMockApiService
            .onPost('api/apps/users/user')
            .reply(() => {
                // Generate a new user
                // const newUSer = {
                //     id: DavesaMockApiUtils.guid(),
                //     avatar: null,
                //     name: 'New USer',
                //     emails: [],
                //     phoneNumbers: [],
                //     job: {
                //         title: '',
                //         company: '',
                //     },
                //     birthday: null,
                //     address: null,
                //     notes: null,
                //     tags: [],
                // };

                // Unshift the new user
                this._users.unshift(null);

                // Return the response
                return [200, null];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ USer - PATCH
        // -----------------------------------------------------------------------------------------------------
        this._davesaMockApiService
            .onPatch('api/apps/users/user')
            .reply(({ request }) => {
                // Get the id and user
                const id = request.body.oid;
                const user = cloneDeep(request.body.user);

                // Prepare the updated user
                let updatedUSer = null;

                // Find the user and update it
                this._users.forEach((item, index, users) => {
                    if (item.oid === id) {
                        // Update the user
                        users[index] = assign({}, users[index], user);

                        // Store the updated user
                        updatedUSer = users[index];
                    }
                });

                // Return the response
                return [200, updatedUSer];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ USer - DELETE
        // -----------------------------------------------------------------------------------------------------
        this._davesaMockApiService
            .onDelete('api/apps/users/user')
            .reply(({ request }) => {
                // Get the id
                const oid = request.params.get('oid');

                // Find the user and delete it
                this._users.forEach((item, index) => {
                    if (item.oid === oid) {
                        this._users.splice(index, 1);
                    }
                });

                // Return the response
                return [200, true];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Avatar - POST
        // -----------------------------------------------------------------------------------------------------

        /**
         * Read the given file as mock-api url
         *
         * @param file
         */
        const readAsDataURL = (file: File): Promise<any> =>
            // Return a new promise
            new Promise((resolve, reject) => {
                // Create a new reader
                const reader = new FileReader();

                // Resolve the promise on success
                reader.onload = (): void => {
                    resolve(reader.result);
                };

                // Reject the promise on error
                reader.onerror = (e): void => {
                    reject(e);
                };

                // Read the file as the
                reader.readAsDataURL(file);
            });
        this._davesaMockApiService
            .onPost('api/apps/users/avatar')
            .reply(({ request }) => {
                // Get the id and avatar
                const oid = request.body.oid;
                const avatar = request.body.profile_img_url;

                // Prepare the updated user
                let updatedUSer: any = null;

                // In a real world application, this would return the path
                // of the saved image file (from host, S3 bucket, etc.) but,
                // for the sake of the demo, we encode the image to base64
                // and return it as the new path of the uploaded image since
                // the src attribute of the img tag works with both image urls
                // and encoded images.
                return from(readAsDataURL(avatar)).pipe(
                    map((path) => {
                        // Find the user and update it
                        this._users.forEach((item, index, users) => {
                            if (item.oid === oid) {
                                // Update the avatar
                                users[index].profile_img_url = path;

                                // Store the updated user
                                updatedUSer = users[index];
                            }
                        });

                        // Return the response
                        return [200, updatedUSer];
                    })
                );
            });
    }
}
