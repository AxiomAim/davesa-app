import { AsyncPipe, DatePipe, NgClass, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectorRef, Component, inject, Input, NgZone, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { DavesaHighlightComponent } from '@davesa/components/highlight';
import { BroadcasterV1Service } from 'app/core/services/broadcaster-v1.service';
import { SubjectManagerV2Service } from 'app/core/services/subject-manager-v2.service';
import {
    BehaviorSubject,
    Observable,
    Subject,
    Subscription,
    combineLatest,
    map,
    pluck,
    take,
    takeUntil,
    tap,
} from 'rxjs';
import { StudiesService } from '../../studies.service';
import { SortByFieldPipe } from '@davesa/pipes/sortByField.pipe';
import { SortByIndexPipe } from 'app/core/pipes/sortByIndex.pipe';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SidebarAllModule, SidebarComponent } from '@syncfusion/ej2-angular-navigations';
import { Router } from '@angular/router';
import { VisitStatus } from 'app/core/enum/visit-status.enum';
import { Column, ColumnModel, GridComponent, GridModule, GroupService, PageService, TextWrapSettingsModel, ToolbarItems, ToolbarService, VirtualScrollService } from '@syncfusion/ej2-angular-grids';
import { VisitItemComponent } from './visit-item/visit-item.component';
import { ScrollingModule } from '@angular/cdk/scrolling';

@Component({
    selector: 'participant-visits',
    templateUrl: './participant-visits.component.html',
    styleUrls: ['./participant-visits.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        MatIconModule,
        DavesaHighlightComponent,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        FormsModule,
        MatOptionModule,
        NgClass,
        AsyncPipe,
        SortByIndexPipe,
        SortByFieldPipe,
        NgClass,
        MatTableModule,
        MatPaginatorModule,
        NgIf,
        NgFor,
        SidebarAllModule,
        NgTemplateOutlet,
        DatePipe,
        VisitItemComponent,
        ScrollingModule,
        GridModule

        
    ],
    providers: [
      PageService, 
      ToolbarService,
      GroupService,
      VirtualScrollService
    ]
})

export class ParticipantVisitsComponent implements OnInit, OnDestroy {
  @ViewChild('template')
  public template: object;  
  @ViewChild('headerTemplate')
  public headerTemplate: object;
  // public fields: Object = { text: 'visit_name', value: 'Visit'};

  @ViewChild('itemdGrid') public itemdGrid: GridComponent;
  public filters = { status: 'All', condition: 'All', other: 'All' };
  public pageSettings?: Object;
  public wrapSettings: TextWrapSettingsModel;
  public toolbar: ToolbarItems[] = ['Search'];
  public sortOptions: object;
  public rules: object = { required: true };

  @Input() oid: string;
    filterParamsData = {
      offset: 0,
      limit: 10,
      sort_field: "",
      sort_direction: "",
      query: "",
      study_oid: "",
    };

    private _subjectManagerV2Service = inject(SubjectManagerV2Service);
    private _broadcasterService = inject(BroadcasterV1Service);

    @ViewChild("sidebarSubjectDetails") sidebarSubjectDetails: SidebarComponent;
    @ViewChild("sidebarCompareVisit") sidebarCompareVisit: SidebarComponent;
    showCompareVisit: boolean = false;

    
    rows: any[] = [];
    dynamicColumn: any[] = [];
    column: any[] = [];
    pageSize: number;
    allCount: number;
    defaultStudySubscription: Subscription;
    public subjectInfo: any;

    private _visitStatus: BehaviorSubject<any> = new BehaviorSubject(null);
    get visitStatus$(): Observable<any> {
      return this._visitStatus.asObservable();
    }

    private _participants: BehaviorSubject<any> = new BehaviorSubject(null);
    get participants$(): Observable<any> {
      return this._participants.asObservable();
    }

    iconSize: string = 'icon-size-8';
    selectedIcon: string[];
    private _unsubscribeAll: Subject<any> = new Subject();
    public readonly pageLimitOptions = [10, 25, 50, 100];

    transform(array: any, field: string): any[] {
        if (!Array.isArray(array)) {
          return;
        }
        array.sort((a: any, b: any) => {
          if (a[field] < b[field]) {
            return -1;
          } else if (a[field] > b[field]) {
            return 1;
          } else {
            return 0;
          }
        });
        return array;
    }


    /**
     * Constructor
     */
    constructor(
        private _studiesService: StudiesService,
        private _changeDetectorRef: ChangeDetectorRef,
        private router: Router,

    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    async ngOnInit() {
      
        await this._studiesService.getVisitStatus()
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((visitStatus) => {
            visitStatus = this.transform(visitStatus, 'sort')
            this._visitStatus.next(visitStatus);            
            this._changeDetectorRef.markForCheck();
        });

        await this.getSubjects()
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
        if (this.defaultStudySubscription)
          this.defaultStudySubscription.unsubscribe();
    
    }

    getElementVisit(element) {
      return element.visit;
    }

    
    async getSubjects() {
      this.filterParamsData.study_oid = this.oid;

      await this._subjectManagerV2Service
        .getSubjectsAndVisitByStudy(this.filterParamsData)
        .subscribe((res: any) => {
          if (res?.data) {

            let baseColumn = ["subjectId", "status"];
            let dynamicColumnVisitName = [];
  
            this.rows = res?.data.map((subjectItem) => {
              subjectItem.visit = subjectItem.visit.map((visitItem) => {
                return {
                  ...visitItem,
                  visit_name: visitItem?.visit_name
                    ? visitItem?.visit_name
                    : visitItem.study_schedule_visit.name,
                  visit_id: visitItem.id,
                  visit_oid: visitItem.oid,
                  visit_status: visitItem.status,
                  visit_type: visitItem.visit_type,
                  visit_appointment_date:
                    visitItem?.appointment_start_date || null,
                  is_visit_there: true,
                };
              });
              return subjectItem;
            });
            console.log('rows', this.rows)
            this._participants.next(this.rows);

            // get all visit name data for dynamic column name
            dynamicColumnVisitName = [].concat(
              ...this.rows.map((subjectDynColumn) => {
                const newRes = subjectDynColumn.visit.map((visitItem) => visitItem.visit_name);
                return newRes
              })
            );
  
            // remove redundant data
            dynamicColumnVisitName = Array.from(new Set(dynamicColumnVisitName));
  
            this.rows = this.rows.map((subjectVisit) => {
              dynamicColumnVisitName.forEach((item) => {
                let visitItem = subjectVisit.visit.find(
                  (visitItem) => visitItem.visit_name === item
                );
                subjectVisit[item] = null;
                if (visitItem) {
                  subjectVisit[item] = visitItem.visit_appointment_date;
                }
              });
              return subjectVisit;
            });
    

            this.column = [...baseColumn, ...dynamicColumnVisitName];
            this.dynamicColumn = dynamicColumnVisitName;
  
            this.pageSize = res["unfilter_count"];
            this.allCount = res["all_count"];
          }
        });
    }
  
    pagination(event) {
      this.filterParamsData.limit = event.pageSize;
      this.filterParamsData.offset = event.pageIndex;
      this.filterParamsData.offset = event.pageIndex * event.pageSize;
      this.getSubjects();
    }
  
  
    resetFilter() {
      this.filterParamsData.query = "";
      this.getSubjects();
    }
    
    viewSubjectDetail(subjectInfo) {
      if (subjectInfo?.oid) {
        this.router.navigate(["/subject/subject-view"], {
          queryParams: {
            subject_oid: subjectInfo?.oid,
            study_oid: this.oid,
          },
          preserveFragment: true,
        });
      }
    }
  
    setAppointment(subject, visits, visitName) {
      // subject["study_oid"] = this.oid;
      // let selectedVisit = visits.find((item) => item.visit_name === visitName);
      // if (selectedVisit) subject.selectedVisit = selectedVisit;
      // let dialogRef = this.dialog.open(SetAppointmentComponent, {
      //   width: "500px",
      //   height: "auto",
      //   data: subject,
      // });
      // dialogRef.afterClosed().subscribe((res) => {
      //   if (res) {
      //     this.getSubjects();
      //   }
      // });
    }
  
    getStatusColor(visitName, isColor = true, visits = []) {
      let visitStatus = VisitStatus.SCHEDULE;
      if (isColor) {
        visitStatus = visitName ? visitName : visitStatus;
      } else {
        if (visitName && visits.length) {
          let status = visits.find(
            (item) => item.visit_name === visitName
          )?.status;
          visitStatus = status ? status : visitStatus;
        }
      }
  
      return this._broadcasterService.getStatusColor(visitStatus);
    }
  
    isThereVisit(visits, visitName) {
      // console.log('visits', visits)
      // console.log('visitName', visitName)
      let selectedVisit = visits.find((item) => item.visit_name === visitName);
      return selectedVisit?.is_visit_there;
    }
  
    searchData(res: string) {
      this.filterParamsData.query = res;
      this.filterParamsData.offset = 0;
      this.getSubjects();
    }
  
    visitInfoDialog(element, visit, dynamicColumnName) {
      let subjectInfo = visit.find(
        (item) => item.visit_name === dynamicColumnName
      );
      this.subjectInfo = {
        ...subjectInfo,
        study_schedule_visit_id: subjectInfo.study_schedule_visit.id,
      };
      console.log("subjectInfo", this.subjectInfo);
      this.sidebarSubjectDetailsToggle();
    }
  
    onSidebarCreated(item?: any) {
      this.sidebarSubjectDetails.hide();
      this.sidebarCompareVisit.hide();
    }
  
    public closeRightClick(): void {
      this.sidebarCompareVisit.hide();
      this.sidebarSubjectDetails.hide();
      this.showCompareVisit = false;
      this.getSubjects();
    }
  
  
  
    public sidebarSubjectDetailsToggle(): void {
      this.sidebarSubjectDetails.toggle();
    }
  
    compareVisit() {
      this.sidebarCompareVisit.toggle();
      if (this.sidebarCompareVisit.isOpen) {
        this.showCompareVisit = true;
      }
      console.log("this.showCompareVisit",this.showCompareVisit);
    }
    closeCompareSidebar() {
      this.sidebarCompareVisit.hide();
      this.showCompareVisit = false;
    }

    getBgClass(visit: any) {
      switch(visit.visit_status) {
        case VisitStatus.SCHEDULE: 
          return 'bg-gray-100';
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
    async getVisitStatus(visit: any) {
      return await this.visitStatus$.subscribe((visits) => {
          const item = visits.find(item => item && item.visit_status === visit.visit_status)
          console.log('item', item.bgClass);          
          return item.bgClass
        })
    }

    public addTemplateColumn(visit: any) {
      console.log('visit', visit)
      var templateColumnValues = {field: visit.visit_name, headerText: visit.visit_name, width: 20, headerTemplate: this.headerTemplate, template: this.template};
      this.itemdGrid.columns.push(templateColumnValues as Column & string & ColumnModel);
      this.itemdGrid.refreshColumns();
  }
}

  