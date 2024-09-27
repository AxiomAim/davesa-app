import { inject, Injectable } from '@angular/core';
import {
    DavesaNavigationItem,
    DavesaNavigationService,
} from '@davesa/components/navigation';
import { DavesaMockApiService } from '@davesa/lib/mock-api';
import { EntityDataV2Service } from 'app/core/services/entity-data-v2.service';
import { SiteAccountV2Service } from 'app/core/services/site-account-v2.service';
import { StudiesV2Service } from 'app/core/services/studies-v2.service';
import { SubjectManagerV2Service } from 'app/core/services/subject-manager-v2.service';
import { UsersV2Service } from 'app/core/services/users-v2.service';
import { contacts } from 'app/mock-api/apps/contacts/data';
import { tasks } from 'app/mock-api/apps/tasks/data';
import { defaultNavigation } from 'app/mock-api/common/navigation/data';
import { UsersService } from 'app/modules/davesa/apps/users/users.service';
import { cloneDeep } from 'lodash-es';

@Injectable({ providedIn: 'root' })
export class SearchMockApi {
    private _usersV2Service = inject(UsersV2Service);
    private _entityDataV2Service = inject(EntityDataV2Service);
    private _studiesV2Service = inject(StudiesV2Service);
    private _subjectManagerV2Service = inject(SubjectManagerV2Service);
    private _siteAccountV2Service = inject(SiteAccountV2Service);


    private readonly _defaultNavigation: DavesaNavigationItem[] =
        defaultNavigation;
    // private _allUsers = inject(UsersV2Service).allUsers();
    private readonly _contacts: any[] = contacts;
    private readonly _tasks: any[] = tasks;
    private readonly _users: any[] = contacts;

    /**
     * Constructor
     */
    constructor(
        private _davesaMockApiService: DavesaMockApiService,
        private _davesaNavigationService: DavesaNavigationService,
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
        // Get the flat navigation and store it
        const flatNavigation = this._davesaNavigationService.getFlatNavigation(
            this._defaultNavigation
        );

        // -----------------------------------------------------------------------------------------------------
        // @ Search results - GET
        // -----------------------------------------------------------------------------------------------------

        this._davesaMockApiService
            .onPost('api/common/search/users')
            .reply(({ request }) => {
                this._usersV2Service.loadFromStorage();
                const response = this._usersV2Service.allUsers(); 
                console.log('response', response)

                // Get the search query
                const query = cloneDeep(request.body.query.toLowerCase());

                // If the search query is an empty string,
                // return an empty array
                if (query === '') {
                    return [200, { results: [] }];
                }


                // Filter the users
                const usersResults = cloneDeep(response).filter(
                    (user: any) => user.name.toLowerCase().includes(query)
                );

                usersResults.sort((a: any, b: any) => {
                    const lastNameComparison = a.name.localeCompare(b.name);
                    return lastNameComparison != 0 ? lastNameComparison : a.name.localeCompare(b.name);
                });

                console.log('results', usersResults)
                
                // sorted
                // Filter the navigation
                const pagesResults = cloneDeep(flatNavigation).filter(
                    (page) =>
                        page.title?.toLowerCase().includes(query) ||
                        (page.subtitle && page.subtitle.includes(query))
                );

                // Filter the tasks
                // const tasksResults = cloneDeep(this._tasks).filter((task) =>
                //     task.title.toLowerCase().includes(query)
                // );

                // Prepare the results array
                const results = [];

                // If there are contacts results...
                if (usersResults.length > 0) {
                    // Normalize the results
                    usersResults.forEach((result: any) => {
                        // Add a link
                        result.link = '/apps/users/' + result.oid;
                        // Add the name as the value
                        result.value = result.name;
                    });

                    // Add to the results
                    results.push({
                        id: 'users',
                        label: 'Users',
                        results: usersResults,
                    });
                }
                console.log('results', results)

                // If there are page results...
                if (pagesResults.length > 0) {
                    // Normalize the results
                    pagesResults.forEach((result: any) => {
                        // Add the page title as the value
                        result.value = result.title;
                    });

                    // Add to the results
                    results.push({
                        id: 'pages',
                        label: 'Pages',
                        results: pagesResults,
                    });
                }

                // // If there are tasks results...
                // if (tasksResults.length > 0) {
                //     // Normalize the results
                //     tasksResults.forEach((result) => {
                //         // Add a link
                //         result.link = '/apps/tasks/' + result.id;

                //         // Add the title as the value
                //         result.value = result.title;
                //     });

                //     // Add to the results
                //     results.push({
                //         id: 'tasks',
                //         label: 'Tasks',
                //         results: tasksResults,
                //     });
                // }

                // Return the response
                return [200, results];
            });





        // this._davesaMockApiService
        //     .onPost('api/common/search')
        //     .reply(({ request }) => {
        //         // Get the search query
        //         const query = cloneDeep(request.body.query.toLowerCase());

        //         // If the search query is an empty string,
        //         // return an empty array
        //         if (query === '') {
        //             return [200, { results: [] }];
        //         }

        //         // Filter the contacts
        //         const contactsResults = cloneDeep(this._contacts).filter(
        //             (contact) => contact.name.toLowerCase().includes(query)
        //         );

        //         // Filter the navigation
        //         const pagesResults = cloneDeep(flatNavigation).filter(
        //             (page) =>
        //                 page.title?.toLowerCase().includes(query) ||
        //                 (page.subtitle && page.subtitle.includes(query))
        //         );

        //         // Filter the tasks
        //         const tasksResults = cloneDeep(this._tasks).filter((task) =>
        //             task.title.toLowerCase().includes(query)
        //         );

        //         // Prepare the results array
        //         const results = [];

        //         // If there are contacts results...
        //         if (contactsResults.length > 0) {
        //             // Normalize the results
        //             contactsResults.forEach((result) => {
        //                 // Add a link
        //                 result.link = '/apps/contacts/' + result.id;

        //                 // Add the name as the value
        //                 result.value = result.name;
        //             });

        //             // Add to the results
        //             results.push({
        //                 id: 'contacts',
        //                 label: 'Contacts',
        //                 results: contactsResults,
        //             });
        //         }

        //         // If there are page results...
        //         if (pagesResults.length > 0) {
        //             // Normalize the results
        //             pagesResults.forEach((result: any) => {
        //                 // Add the page title as the value
        //                 result.value = result.title;
        //             });

        //             // Add to the results
        //             results.push({
        //                 id: 'pages',
        //                 label: 'Pages',
        //                 results: pagesResults,
        //             });
        //         }

        //         // If there are tasks results...
        //         if (tasksResults.length > 0) {
        //             // Normalize the results
        //             tasksResults.forEach((result) => {
        //                 // Add a link
        //                 result.link = '/apps/tasks/' + result.id;

        //                 // Add the title as the value
        //                 result.value = result.title;
        //             });

        //             // Add to the results
        //             results.push({
        //                 id: 'tasks',
        //                 label: 'Tasks',
        //                 results: tasksResults,
        //             });
        //         }

        //         // Return the response
        //         return [200, results];
        //     });
    }
}
