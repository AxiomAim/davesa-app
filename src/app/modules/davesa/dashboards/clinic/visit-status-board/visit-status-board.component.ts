import { NgClass, NgIf } from "@angular/common";
import { ApplicationConfig, ChangeDetectionStrategy, Component, inject, OnInit, QueryList, ViewChild, ViewChildren, ViewEncapsulation } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatRippleModule } from "@angular/material/core";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { TranslocoModule } from "@ngneat/transloco";
import {
  GridComponent,
  GridModule,
  GroupService,
  PageSettingsModel,
  TextWrapSettingsModel,
  ToolbarItems,
  ToolbarService,
  PageService, 
  EditService, 
  SortService, 
  FilterService, 
  SearchService, 
  DetailRowService,
} from "@syncfusion/ej2-angular-grids";
import { NgApexchartsModule } from "ng-apexcharts";
import { Observable, ReplaySubject, Subject, Subscription, takeUntil } from "rxjs";
import { Study } from "app/core/interfaces/study.interface";
import { StudyVisit } from "app/core/interfaces/study-visit.interface";
import { FilterParams } from "app/core/types/filter-params.type";
import { List } from "app/core/interfaces/generics/list.interface";
import { VisitStatus } from "app/core/enum/visit-status.enum";
import { SubjectVisitMenuComponent } from "./subject-visit-menu/subject-visit-menu.component";
import { MatTooltipModule } from "@angular/material/tooltip";
import { DavesaLoadingService } from "@davesa/services/loading";
import { DavesaConfigService } from "@davesa/services/config";
import { DashboardV2Service } from "app/core/services/dashboard-v2.service";
import { ScrollingModule } from "@angular/cdk/scrolling";
import { DavesaScrollbarDirective } from "@davesa/directives/scrollbar";
import { ScrollStrategy, ScrollStrategyOptions } from '@angular/cdk/overlay';

@Component({
  selector: "visit-status-board",
  templateUrl: "./visit-status-board.component.html",
  styleUrls: ["./visit-status-board.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
      TranslocoModule,
      MatTooltipModule,
      MatIconModule,
      MatButtonModule,
      MatRippleModule,
      MatMenuModule,
      MatTabsModule,
      MatButtonToggleModule,
      NgApexchartsModule,
      MatTableModule,
      NgClass,
      GridModule,
      SubjectVisitMenuComponent,
      NgIf,
      ScrollingModule,
      DavesaScrollbarDirective,

      
  ],
  providers: [
    ToolbarService,
    GroupService,
    PageService, 
    EditService, 
    SortService, 
    FilterService, 
    SearchService, 
    DetailRowService,
  
  ],

})
export class VisitStatusBoardComponent implements OnInit {
  private _davesaConfigService = inject(DavesaConfigService);
  private _dashboardV2Service = inject(DashboardV2Service);
  private _unsubscribeAll: Subject<any> = new Subject<any>();


config: ApplicationConfig;
  @ViewChild("visitStatusGrid") public visitStatusGrid: GridComponent;
  public rules: object = { required: true };
  public filters = { status: 'All', condition: 'All', other: 'All' };
  // public pageSettings?: Object;
  public wrapSettings: TextWrapSettingsModel;
  public toolbar: ToolbarItems[] = ['Search'];
  public sortOptions: object;
  public visitStatus$: Observable<Study[]>;
  public pageSettings: PageSettingsModel;
  unfilterCount: number;
  visitStatus=VisitStatus;
  public rows: StudyVisit[];
  filterParamsData : FilterParams= {
    offset: 0,
    limit: 10,
    sort_field: "created_at",
    sort_direction: "D",
    query: "",
  };

  
  constructor(
  ) {

    this._davesaConfigService.config$
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((config: ApplicationConfig) => {
        this.config = config;
        document.body.classList.add(this.config['scheme']);

    });
  }

  ngOnInit(): void {
    this._dashboardV2Service.loadFromStorage()

    this.wrapSettings = { wrapMode: 'Both' };
    this.pageSettings = {
      pageSize: this.filterParamsData.limit,
      pageSizes: true,
    };
    this.sortOptions = {
      columns: [{ field: "created_at", direction: "Descending" }],
    };
    this.getStudyVisits();
  }

  getStudyVisits() {
    this.rows = this._dashboardV2Service.allStudyVisits();
    if(!this.rows)
    this._dashboardV2Service
      .getAllStudyVisits(this.filterParamsData)
      .subscribe((res: List<StudyVisit>) => {
        if (res) {
          this.rows = res.data.map((study) => {
            console.log('rows', this.rows)
            return {
              ...study,
              crc: this.setCrc(study.study_delegation_role_users),
            };
          });          
          this._dashboardV2Service.setAllStudyVisits(this.rows)

          this.unfilterCount = res.unfilter_count;
        }
      });
  }

  setCrc(role) {
    if (role) {
      return role
        .map(
          (user) =>
            `${user.study_invite_user.user.first_name} ${user.study_invite_user.user.last_name}`
        )
        .join(", ");
    }
    return "";
  }

  search(): void {
    var timeout = null;
    let element = document.getElementById(
      this.visitStatusGrid.element.id + "_searchbar"
    );
    if (element !== null) {
      element.addEventListener("keyup", () => {
        clearTimeout(timeout);
        this.filterParamsData.offset = 0;
        this.filterParamsData.query = (event.target as HTMLInputElement).value;
        timeout = setTimeout(() => {
          this.getStudyVisits();
          this.visitStatusGrid.searchSettings.key = this.filterParamsData.query;
        }, 800);
      });
    }
  }

  actionBegin(args) {
    console.log("args",args);
    if (args.requestType === "sorting") {
      if (args.columnName && args.direction) {
        this.filterParamsData.sort_field = args.columnName;
        if (args.direction === "Descending") {
          this.filterParamsData.sort_direction = "D";
        } else if (args.direction === "Ascending") {
          this.filterParamsData.sort_direction = "A";
        }
        this.getStudyVisits();
      }
    }
    if (args.requestType === "paging") {
      this.filterParamsData.offset = (args.currentPage - 1) * args.pageSize;
      this.filterParamsData.limit = args.pageSize;
      this.getStudyVisits();
    }
  }
}