import {Component, inject, OnInit, OnDestroy, ViewChild, TemplateRef, ChangeDetectorRef, HostBinding} from "@angular/core";
import {AlertMessagesService} from "./alert-messages.service";
import {NgClass, NgTemplateOutlet} from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { FlexLayoutModule } from '@ngbracket/ngx-layout';

@Component({
  selector: 'alert-messages',
  templateUrl: './alert-messages.component.html',
  styleUrls: ['./alert-messages.component.scss'],
  imports: [
    NgClass,
    MatIconModule, 
    MatButtonModule,
    FlexLayoutModule
  ],
  standalone: true
})
export class AlertMessagesComponent {

  alertMessagesService = inject(AlertMessagesService);

  alertMessage = this.alertMessagesService.alertMessage;

  // @HostBinding('class') get classList(): any {
    /* eslint-disable @typescript-eslint/naming-convention */
    // return {
    //     'alert-messages-appearance-border': this.alertMessage().style === 'border',
    //     'alert-messages-appearance-fill': this.alertMessage().style === 'fill',
    //     'alert-messages-appearance-outline': this.alertMessage().style === 'outline',
    //     'alert-messages-appearance-soft': this.alertMessage().style === 'soft',
    //     // 'alert-messages-dismissed': this.alertMessagesService.alertMessage().dismissed,
    //     // 'alert-messages-dismissible': this.alertMessagesService.alertMessage().dismissible,
    //     'alert-messages-show-icon': this.alertMessage().showIcon,
    //     'alert-messages-type-primary': this.alertMessage().type === 'primary',
    //     'alert-messages-type-accent': this.alertMessage().type === 'accent',
    //     'alert-messages-type-warn': this.alertMessage().type === 'warn',
    //     'alert-messages-type-basic': this.alertMessage().type === 'basic',
    //     'alert-messages-type-info': this.alertMessage().type === 'info',
    //     'alert-messages-type-success': this.alertMessage().type === 'success',
    //     'alert-messages-type-warning': this.alertMessage().type === 'warning',
    //     'alert-messages-type-error': this.alertMessage().type === 'error',
    // };
    /* eslint-enable @typescript-eslint/naming-convention */
// }
  getStyle(style: string) {
    switch(style) {
      case'primary': return 'bg-primary-50 text-primary-800 dark:bg-white dark:bg-opacity-5 dark:text-primary-400';
      case'accent': return 'bg-accent-50 text-accent-800 dark:bg-white dark:bg-opacity-5 dark:text-accent-400';
      case'warn': return 'bg-warn-50 text-warn-800 dark:bg-white dark:bg-opacity-5 dark:text-warn-400';
      case'info': return 'bg-gray-50 text-gray-800 dark:bg-white dark:bg-opacity-5 dark:text-gray-400';
      case'insuccessfo': return 'bg-green-50 text-green-800 dark:bg-white dark:bg-opacity-5 dark:text-green-400';
      case'error': return 'bg-warn-50 text-warn-800 dark:bg-white dark:bg-opacity-5 dark:text-warn-400';
      default: return 'bg-green-50 text-green-800 dark:bg-white dark:bg-opacity-5 dark:text-green-400';
    }
  }

  getIconColor(style: string) {
    switch(style) {
      case'primary': return 'bg-primary-50 text-primary-800 dark:bg-white dark:bg-opacity-5 dark:text-primary-400 icon-size-7';
      case'accent': return 'bg-accent-50 text-accent-800 dark:bg-white dark:bg-opacity-5 dark:text-accent-400 icon-size-7';
      case'warn': return 'bg-warn-50 text-warn-800 dark:bg-white dark:bg-opacity-5 dark:text-warn-400 icon-size-7';
      case'info': return 'bg-gray-50 text-gray-800 dark:bg-white dark:bg-opacity-5 dark:text-gray-400 icon-size-7';
      case'success': return 'bg-green-50 text-green-800 dark:bg-white dark:bg-opacity-5 dark:text-green-400 icon-size-7';
      case'error': return 'bg-warn-50 text-warn-800 dark:bg-white dark:bg-opacity-5 dark:text-warn-400 icon-size-7';
      default: return 'bg-gray-50 text-gray-800 dark:bg-white dark:bg-opacity-5 dark:text-gray-400 icon-size-7';
    }
  }

  getIcon(style: string) {
    switch(style) {
      case 'primary': return 'heroicons_solid:x-circle';
      case 'accent': return 'heroicons_solid:x-circle';
      case 'warn': return 'heroicons_solid:x-circle';
      case'info': return 'heroicons_solid:x-circle';
      case'success': return 'heroicons_solid:x-circle';
      case'error': return 'heroicons_solid:x-circle';
      default: return 'heroicons_solid:x-circle';
    }
  }

  dismiss(): void {
    this.alertMessagesService.clear();
  }



}
