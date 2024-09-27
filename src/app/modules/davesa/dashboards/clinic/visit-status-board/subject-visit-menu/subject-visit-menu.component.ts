import { NgClass, NgFor, NgForOf, NgIf } from "@angular/common";
import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, OnInit, Output, ViewChild, ViewEncapsulation } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatRippleModule } from "@angular/material/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatSelectModule } from "@angular/material/select";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { MatTooltipModule } from "@angular/material/tooltip";
import { TranslocoModule } from "@ngneat/transloco";
import { GridModule, GroupService, ToolbarService } from "@syncfusion/ej2-angular-grids";
import { SidebarComponent, SidebarModule } from "@syncfusion/ej2-angular-navigations";
import { List } from "app/core/interfaces/generics/list.interface";
import { Participant } from "app/core/interfaces/participant.interface";
import { Visit } from "app/core/interfaces/visit.interface";
import { DashboardV2Service } from "app/core/services/dashboard-v2.service";
import { FilterParams } from "app/core/types/filter-params.type";
import { NgApexchartsModule } from "ng-apexcharts";

@Component({
  selector: "subject-visit-menu",
  templateUrl: "./subject-visit-menu.component.html",
  styleUrls: ["./subject-visit-menu.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
      TranslocoModule,
      MatIconModule,
      MatTooltipModule,
      MatButtonModule,
      MatRippleModule,
      MatMenuModule,
      MatTabsModule,
      MatButtonToggleModule,
      NgApexchartsModule,
      MatTableModule,
      NgClass,
      GridModule,
      SidebarModule,
      NgIf,
      NgFor,
      NgForOf,
      MatFormFieldModule,
      MatSelectModule

  ],
  providers: [
    ToolbarService,
    GroupService
    ,
    
  ],

})
export class SubjectVisitMenuComponent implements OnInit {
  private _dashboardV2Service = inject(DashboardV2Service);
  @ViewChild("sidebarSubjectDetails") sidebarSubjectDetails: SidebarComponent;
  @Input() participants: Participant[];
  @Input() bgClass: string;
  @Input() matToolTip: string;
  @Input() count: number;
  @Input() study_oid:string;
  @Input() visitStatus:string;
  filterParamsData: FilterParams= {
    limit: 0,
    offset: 0,
    study_oid: "",
    status: "",
  };

  public positionRight: string = "Right";
  public showBackdrop: boolean = false;

  public matToolTipPosition: string = "above";
  public sidebarOpen: boolean = false;
  public subjectInfo: Visit;
  public visits: Visit[];
  constructor(

  ) {}

  ngOnInit() {
  }

  openSidebarSubject(visit) {
   this.subjectInfo = visit;
   this.sidebarSubjectDetails.toggle();
  }

  visitList(isOpen) {
    if (isOpen) {
      this.filterParamsData.study_oid = this.study_oid;
      this.filterParamsData.status = this.visitStatus;
      this._dashboardV2Service
        .getllVisitsByStatus(this.filterParamsData)
        .subscribe((res: List<Visit>) => {
          if (res) {
            console.log('visitList', res.data)

            this.visits =res.data;
          }
        });
    }
  }

  onSidebarCreated() {
    this.sidebarSubjectDetails.hide();
  }

  public closeRightClick(): void {
    this.sidebarSubjectDetails.hide();
  }
}