import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { DatePipe, NgClass, NgTemplateOutlet } from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    inject,
    OnDestroy,
    OnInit,
    TemplateRef,
    ViewChild,
    ViewContainerRef,
    ViewEncapsulation,
} from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { GlobalSocketV1Service } from 'app/core/services/global-socket-v1.service';
import { MessagesService } from 'app/layout/common/messages/messages.service';
import { Message } from 'app/layout/common/messages/messages.types';
import { Subject, Subscription, takeUntil } from 'rxjs';

@Component({
    selector: 'messages',
    templateUrl: './messages.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs: 'messages',
    standalone: true,
    imports: [
        MatButtonModule,
        MatIconModule,
        MatTooltipModule,
        NgClass,
        NgTemplateOutlet,
        RouterLink,
        DatePipe,
    ],
})
export class MessagesComponent implements OnInit, OnDestroy {
    private _globalSocketV1Service = inject(GlobalSocketV1Service);

    @ViewChild('messagesOrigin') private _messagesOrigin: MatButton;
    @ViewChild('messagesPanel') private _messagesPanel: TemplateRef<any>;
    notificationSubjectSubscription: Subscription;

    messages: Message[];
    messageCategories: any;
    unreadCount: number = 0;
    private _overlayRef: OverlayRef;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _messagesService: MessagesService,
        private _overlay: Overlay,
        private _viewContainerRef: ViewContainerRef
    ) {
        this._globalSocketV1Service.connectSocket();

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Subscribe to message changes
        this._messagesService.messages$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((messages: Message[]) => {
                // Load the messages
                this.messages = messages;

                // Calculate the unread count
                this._calculateUnreadCount();

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

            this._messagesService.messagesCategories$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((messageCategories: Message[]) => {
                // Load the messages
                this.messageCategories = messageCategories;

                // Calculate the unread count
                this._calculateUnreadCount();

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

            this.notificationSubjectSubscription = this._globalSocketV1Service.getGlobalNotification$.subscribe((res) => {
                    if ('data' in res) {
                        this._messagesService._messages.next(
                    res['data']['subtitle']
                        ? [...new Set([res['data'], ...this.messages])]
                        : this.messages
                    )}
                    if ('removeNotificationIds' in res.data) {
                    this.messages = this.messages.filter(
                        (data) => !res.data['removeNotificationIds'].includes(data.id)
                    );
                    }
                    this.unreadCount = this.messages.length;
                }
            )
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();

        // Dispose the overlay
        if (this._overlayRef) {
            this._overlayRef.dispose();
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Open the messages panel
     */
    openPanel(): void {
        // Return if the messages panel or its origin is not defined
        if (!this._messagesPanel || !this._messagesOrigin) {
            return;
        }

        // Create the overlay if it doesn't exist
        if (!this._overlayRef) {
            this._createOverlay();
        }

        // Attach the portal to the overlay
        this._overlayRef.attach(
            new TemplatePortal(this._messagesPanel, this._viewContainerRef)
        );
    }

    /**
     * Close the messages panel
     */
    closePanel(): void {
        this._overlayRef.detach();
    }

    /**
     * Mark all messages as read
     */
    markAllAsRead(): void {
        // Mark all as read
        this._messagesService.markAllAsRead().subscribe();
    }

    /**
     * Toggle read status of the given message
     */
    toggleRead(message: Message): void {
        // Toggle the read status
        message.has_read = !message.has_read;

        // Update the message
        this._messagesService.update(message.id, message).subscribe();
    }

    /**
     * Delete the given message
     */
    delete(message: Message): void {
        // Delete the message
        this._messagesService.delete(message.id).subscribe();
    }

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create the overlay
     */
    private _createOverlay(): void {
        // Create the overlay
        this._overlayRef = this._overlay.create({
            hasBackdrop: true,
            backdropClass: 'davesa-backdrop-on-mobile',
            scrollStrategy: this._overlay.scrollStrategies.block(),
            positionStrategy: this._overlay
                .position()
                .flexibleConnectedTo(
                    this._messagesOrigin._elementRef.nativeElement
                )
                .withLockedPosition(true)
                .withPush(true)
                .withPositions([
                    {
                        originX: 'start',
                        originY: 'bottom',
                        overlayX: 'start',
                        overlayY: 'top',
                    },
                    {
                        originX: 'start',
                        originY: 'top',
                        overlayX: 'start',
                        overlayY: 'bottom',
                    },
                    {
                        originX: 'end',
                        originY: 'bottom',
                        overlayX: 'end',
                        overlayY: 'top',
                    },
                    {
                        originX: 'end',
                        originY: 'top',
                        overlayX: 'end',
                        overlayY: 'bottom',
                    },
                ]),
        });

        // Detach the overlay from the portal on backdrop click
        this._overlayRef.backdropClick().subscribe(() => {
            this._overlayRef.detach();
        });
    }

    /**
     * Calculate the unread count
     *
     * @private
     */
    private _calculateUnreadCount(): void {
        let count = 0;

        if (this.messages && this.messages.length) {
            count = this.messages.filter((message) => !message.has_read).length;
        }

        this.unreadCount = count;
    }




    // readNotification(message: any) {
    //     let data = {
    //       oid: message.oid,
    //       has_read: true,
    //     };
    //     this._messagesService.updateNotification(data).subscribe((res) => {
    //       this.getNotificationList();
    //     });
    //   }
    
    //   onScrollDown() {
    //     this.filterParamsData.limit = this.filterParamsData.limit + 10;
    //     this.getNotificationList();
    //   }
    
    //   onScrollUp() {}
    
    //   getUserData() {
    //     return this._tokenService.getDecodedAccessToken()?.id;
    //   }
    //   actionButtonPermission(message) {
    //     if (
    //       message?.notification_category?.code &&
    //       message.notification_category.code === NotificationType.DELEGATIONROLE
    //     ) {
    //       return true;
    //     }
    
    //     if (
    //       message?.notification_category?.code &&
    //       message.notification_category.code === NotificationType.ESOURCEFORMAPPROVED
    //     ) {
    //       return true;
    //     }
    
    //     if (
    //       message?.notification_category?.code &&
    //       message.notification_category.code === NotificationType.ESOURCEFORMQUERYAPPROVED
    //     ) {
    //       return true;
    //     }
    
    //     return false;
    //   }
    
    //   ngOnDestroy() {
    //     this.notificationSubjectSubscription.unsubscribe();
    //   }
    
    //   getMomentDate(date: Date) {
    //     return moment(date).fromNow();
    //   }
    //   markAllAsRead() {
    //     this._messagesService.markAllAsReadNotification().subscribe((res) => {
    //       this.getNotificationList();
    //     });
    //   }
    //   filterNotification(id) {
    //     if (id == 0) {
    //       this.filterParamsData.category_id = 0;
    //       this.getNotificationList();
    //     } else {
    //       this.filterParamsData.category_id = id;
    //       this.getNotificationList();
    //     }
    //   }
    //   onChange(e) {
    //     if (e.checked) {
    //       this.filterParamsData.read_type = 1;
    //       this.getNotificationList();
    //     } else {
    //       this.filterParamsData.read_type = 0;
    //       this.getNotificationList();
    //     }
    //   }
    
    //   openLink(message){
    //     if(message?.notification_category?.code === NotificationType.SUBJECTVISIT){
    //       const {pathname,search } = new URL(message?.link);
    //      let path = decodeURI(pathname);
    //      this.route.navigateByUrl(path);
    //      const parameters = new URLSearchParams(search);
    //      let subject_visit_oid = parameters.get('subject_visit_oid');
    //      this._broadCasterService.setSubjectVisitOid(subject_visit_oid);
    //      this.trigger.closeMenu();
        
    //     }else{
    //       fileViewerFunction.fileViewer(message?.link,this.route);
    
    //   }
    // }
    
    //   seLinkName(message){
    //     if(message?.notification_category?.code === NotificationType.SUBJECTVISIT){
    //       return 'View Visit';
    //     }
    //     else if(message?.notification_category?.code === NotificationType.UPLOADSTUDYDOCUMENT){
    //       return 'View Document';
    //     }
    //     else{
    //       return 'View';
    //     }
    //   }
    
    //   setReadNotificationIcon(message){
    //     if(message?.notification_category?.code === NotificationType.UPLOADSTUDYDOCUMENT){
    //       return 'done';
    //     }
    //     else{
    //       return 'visibility';
    //     }
    //   }
    
}
