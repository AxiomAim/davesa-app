import { AsyncPipe, DatePipe, NgClass, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectorRef, Component, inject, Input, NgZone, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { DavesaHighlightComponent } from '@davesa/components/highlight';
import { SortByIndexPipe } from 'app/core/pipes/sortByIndex.pipe';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SidebarAllModule, SidebarComponent } from '@syncfusion/ej2-angular-navigations';
import { VisitStatus } from 'app/core/enum/visit-status.enum';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { SortByFieldPipe } from '@davesa/pipes/sortByField.pipe';

@Component({
    selector: 'visit-item',
    templateUrl: './visit-item.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        MatIconModule,
        NgClass,
        MatMenuModule,
        MatMenuTrigger,
        MatIconModule,
        MatButtonModule,
        DatePipe,
               
    ],
    providers: [
      
    ]
})
export class VisitItemComponent implements OnInit, OnDestroy {
  @Input() visit: any;

    constructor(

    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    async ngOnInit() {

    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
    
    }

    getTextClass(visit: any) {
      switch(visit.visit_status) {
        case VisitStatus.SCHEDULE: 
          return 'text-gray-900';
        case VisitStatus.UNCONFIRMED: 
          return 'text-white';
        case VisitStatus.CONFIRMED: 
          return 'text-white';
        case VisitStatus.RESCHEDULE: 
          return 'text-white';
        case VisitStatus.ABSENT: 
          return 'text-white';
        case VisitStatus.MISSED: 
          return 'text-white';
        case VisitStatus.CLINIC: 
          return 'text-white';
        case VisitStatus.REVIEW: 
          return 'text-white';
        case VisitStatus.FINISHED: 
          return 'text-white';
        case VisitStatus.ENDORSED: 
          return 'text-white';
        case VisitStatus.VALIDATED: 
          return 'text-white';
        case VisitStatus.MONITOR: 
          return 'text-white';
      }
    }

    getBgClass(visit: any) {
      switch(visit.visit_status) {
        case VisitStatus.SCHEDULE: 
          return 'bg-gray-300';
        case VisitStatus.UNCONFIRMED: 
          return 'bg-cyan-500';
        case VisitStatus.CONFIRMED: 
          return 'bg-cyan-700';
        case VisitStatus.RESCHEDULE: 
          return 'bg-lime-500';
        case VisitStatus.ABSENT: 
          return 'bg-pink-500';
        case VisitStatus.MISSED: 
          return 'bg-rose-500';
        case VisitStatus.CLINIC: 
          return 'bg-sky-500';
        case VisitStatus.REVIEW: 
          return 'bg-emerald-600';
        case VisitStatus.FINISHED: 
          return 'bg-emerald-700';
        case VisitStatus.ENDORSED: 
          return 'bg-emerald-800';
        case VisitStatus.VALIDATED: 
          return 'bg-emerald-900';
        case VisitStatus.MONITOR: 
          return 'bg-emerald-950';
      }
    }
}
  