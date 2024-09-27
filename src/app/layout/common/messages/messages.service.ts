import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MessagesV2Service } from 'app/core/services/messages-v2.service';
import { Message } from 'app/layout/common/messages/messages.types';
import { map, Observable, ReplaySubject, switchMap, take, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MessagesService {
    private _messagesV2Service = inject(MessagesV2Service);
    
    filterParamsData = {
        offset: 0,
        limit: 10,
        sort_field: 'created_at',
        sort_direction: 'D',
        query: '',
        read_type: 0,
        category_id: 0,
      };
      categoryFilterParamsData = {
        offset: 0,
        limit: 0,
        sort_field: 'created_at',
        sort_direction: 'D',
        query: '',
      };
    
    public _messages: ReplaySubject<Message[]> = new ReplaySubject<Message[]>(1);

    public _messageCategories: ReplaySubject<Message[]> = new ReplaySubject<Message[]>(null);
    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for messages
     */
    get messages$(): Observable<Message[]> {
        return this._messages.asObservable();
    }

    get messagesCategories$(): Observable<Message[]> {
        return this._messageCategories.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get all messages
     */
    
    // this.getNotificationList();
    // this.getUserData();
    // this.getNotificationCategories();
    // this.notificationSubjectSubscription = this._globalSocketService.getGlobalNotification$.subscribe((res) => {
    //   if ('data' in res) {
    //     this.notifications = res['data']['subtitle']
    //       ? [...new Set([res['data'], ...this.notifications])]
    //       : this.notifications;
    //     if ('removeNotificationIds' in res.data) {
    //       this.notifications = this.notifications.filter(
    //         (data) => !res.data['removeNotificationIds'].includes(data.id)
    //       );
    //     }
    //     this.badgeNumber = this.notifications.length;
    //   }
    // });

    
    getAll(): Observable<Message[]> {
        return this._messagesV2Service.getAll(this.filterParamsData).pipe(tap((messages) => {
                this._messages.next(messages);
            }
        ));
    }

    getAllBtCatergory(): Observable<Message[]> {
        return this._messagesV2Service.getAllBtCatergory(this.categoryFilterParamsData).pipe(tap((messages) => {
                this._messageCategories.next(messages);
            }
        ));
    }

    /**
     * Create a message
     *
     * @param message
     */
    create(message: Message): Observable<Message> {
        return this.messages$.pipe(
            take(1),
            switchMap((messages) =>
                this._httpClient
                    .post<Message>('api/common/messages', { message })
                    .pipe(
                        map((newMessage) => {
                            // Update the messages with the new message
                            this._messages.next([...messages, newMessage]);

                            // Return the new message from observable
                            return newMessage;
                        })
                    )
            )
        );
    }

    /**
     * Update the message
     *
     * @param id
     * @param message
     */
    update(id: string, message: Message): Observable<Message> {
        return this.messages$.pipe(
            take(1),
            switchMap((messages) =>
                this._httpClient
                    .patch<Message>('api/common/messages', {
                        id,
                        message,
                    })
                    .pipe(
                        map((updatedMessage: Message) => {
                            // Find the index of the updated message
                            const index = messages.findIndex(
                                (item) => item.id === id
                            );

                            // Update the message
                            messages[index] = updatedMessage;

                            // Update the messages
                            this._messages.next(messages);

                            // Return the updated message
                            return updatedMessage;
                        })
                    )
            )
        );
    }

    /**
     * Delete the message
     *
     * @param id
     */
    delete(id: string): Observable<boolean> {
        return this.messages$.pipe(
            take(1),
            switchMap((messages) =>
                this._httpClient
                    .delete<boolean>('api/common/messages', { params: { id } })
                    .pipe(
                        map((isDeleted: boolean) => {
                            // Find the index of the deleted message
                            const index = messages.findIndex(
                                (item) => item.id === id
                            );

                            // Delete the message
                            messages.splice(index, 1);

                            // Update the messages
                            this._messages.next(messages);

                            // Return the deleted status
                            return isDeleted;
                        })
                    )
            )
        );
    }

    /**
     * Mark all messages as read
     */
    markAllAsRead(): Observable<any> {
        return this._messagesV2Service.markAllAsRead().pipe(take(1), tap(
            this.getAll().pipe(tap((res) => res))))
    }
}
