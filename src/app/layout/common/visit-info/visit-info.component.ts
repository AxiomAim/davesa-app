import { NgClass, NgFor, NgIf } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
  inject
} from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatRippleModule } from "@angular/material/core";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatTabsModule } from "@angular/material/tabs";
import { TranslocoModule } from "@ngneat/transloco";
import { GridModule } from "@syncfusion/ej2-angular-grids";
import {
  ListViewComponent,
  ListViewModule,
  SelectEventArgs,
} from "@syncfusion/ej2-angular-lists";
import { SidebarModule } from "@syncfusion/ej2-angular-navigations";
import { DialogComponent, DialogModule } from "@syncfusion/ej2-angular-popups";
import { TreeGridComponent } from "@syncfusion/ej2-angular-treegrid";
import { Query } from "@syncfusion/ej2-data";
import { FilteringEventArgs } from "@syncfusion/ej2-dropdowns";
import { StatusType } from "app/core/enum/status-type.enum";
import { VisitStatus } from "app/core/enum/visit-status.enum";
import { DashboardV2Service } from "app/core/services/dashboard-v2.service";
import { PersonalAssignUserV1Service } from "app/core/services/personal-assign-user-v1.service";
import { SubjectManagerV2Service } from "app/core/services/subject-manager-v2.service";
import { NgApexchartsModule } from "ng-apexcharts";
import { MatSnackBarService } from "app/core/services/mat-snack-bar.service";
import { GlobalSocketV1Service } from "app/core/services/global-socket-v1.service";
import { PermissionV2Service } from "app/core/services/permission-v2.service";
import { FinanceStudyBudgetSettingsService } from "app/core/services/finance-study-budget-settings.service";
import { FinanceAdminService } from "app/core/services/finance-admin.service";
import { DavesaConfirmationService } from "@davesa/services/confirmation";
import { Permission } from "app/core/enum/permission.enum";
import { AuthDavesaApiService } from "app/core/auth-davesa/auth-davesa-api.service";
import { VisitInfoEsourceComponent } from "./visit-info-esource/visit-info-esource.component";
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { TreeGridModule } from '@syncfusion/ej2-angular-treegrid';
import { MatExpansionModule } from '@angular/material/expansion';
import { ParticipantComponent } from "../participant/participant.component";

@Component({
  selector: "visit-info",
  templateUrl: "./visit-info.component.html",
  styleUrls: ["./visit-info.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
      TranslocoModule,
      MatIconModule,
      MatButtonModule,
      MatRippleModule,
      MatMenuModule,
      MatTabsModule,
      MatButtonToggleModule,
      NgApexchartsModule,
      NgClass,
      GridModule,
      SidebarModule,
      NgIf,
      NgFor,
      DialogModule,
      ListViewModule,
      VisitInfoEsourceComponent,
      DropDownListModule,
      TreeGridModule,
      MatExpansionModule,
      ParticipantComponent

  ],
  providers: [
    DashboardV2Service,
    PersonalAssignUserV1Service,
    SubjectManagerV2Service,
    ,
    
  ],

})
export class VisitInfoComponent implements OnInit, OnChanges {
  private _authDavesaApiService = inject(AuthDavesaApiService);
  private _matSnackBarService = inject(MatSnackBarService);
  private _dashboardService = inject(DashboardV2Service);

  @Input() subjectInfo;
  @Input() isCompareVisit: boolean = false;
  @Output() closeVisitSidebar = new EventEmitter<any>();

  @ViewChild("taskGrid") public taskGrid: TreeGridComponent;
  @ViewChild("List") listviewInstance: ListViewComponent;
  @ViewChild("esourceFormsGrid") public esourceFormsGrid: TreeGridComponent;
  @ViewChild("ejDialog", { static: false }) public userDialog: DialogComponent;

  subjectVisitStatus:string;
  isAdmin: boolean = false;
  permissionsObj: any;
  createUserArray: any[] = [];
  updateUserArray: any[] = [];
  visitStatus = VisitStatus;
  panel: string = "Procedure eSource Forms";
  filterParamsData = {
    visitOffset: 0,
    visitLimit: 0,
    offset: 0,
    procedureOffset: 0,
    procedureLimit: 0,
    sort_field: "",
    sort_direction: "",
    query: "",
    subject_oid: "",
    study_oid: "",
  };
  doaFilterParams = {
    offset: 0,
    limit: 0,
    sort_field: "",
    sort_direction: "",
    query: "",
    study_oid: "",
    study_task_id: 0,
  };

  // public doaUsers: { [key: string]: Object }[] = [];
  // // maps the appropriate column to fields property
  // public fields: Object = { text: "name", value: "id" };
  // public statusFields: Object = { text: "name", value: "value" };
  // // set the placeholder to the DropDownList input
  // public taskDataSource: Object[];
  // public esourceDataSource: Object[] = [];
  // public taskPageSettings: Object;
  // public position: Object;
  // public userRemoveArray: Object[] = [];
  // selectedProcedureTask: any;
  // public title = "";
  // public visible: Boolean = false;
  // showEsource:Boolean=false;
  // EsourceData:any[]=[];
  // type: object[] = [
  //   { name: "Pending", value: StatusType.PENDING },
  //   { name: "Complete", value: StatusType.COMPLETED },
  // ];
  constructor(
    // private _subjectManagerService: SubjectManagerV2Service,
    // private _personalIAssignUser: PersonalAssignUserV1Service,
    // private _globalSocketService: GlobalSocketV1Service,
    // private _permissionService: PermissionV2Service,
    // private _studyBudgetSettingService: FinanceStudyBudgetSettingsService,
    // private _financeAdminService: FinanceAdminService,
    // private _davesaConfirmationService: DavesaConfirmationService

  ) {}

  ngOnInit(): void {
  

  }

  ngOnChanges(changes: SimpleChanges) {
    // if (changes["subjectInfo"] && this.subjectInfo) {
    //   this.esourceDataSource = [];
    //   this.taskDataSource = [];
    //   this.getSubjectInfo();
    // }
  }

  getSubjectInfo() {
    // this.title = `Close Visit ${this.subjectInfo.subject.subject_id}-${this.subjectInfo.study_schedule_visit.name}`;
    // this.doaFilterParams["study_oid"] = this.subjectInfo.study.oid;
    // this.getProcedureTasks();
    // this.taskPageSettings = {
    //   pageSize: 10,
    //   pageSizeMode: "Root",
    //   pageSizes: true,
    // };
    // this.filterParamsData.subject_oid = this.subjectInfo.subject.oid;
    // this.filterParamsData.study_oid = this.subjectInfo.study.oid;
    

    // // this.doaFilterParams.study_task_id = task.study_task_id;
    // this._personalIAssignUser
    //   .getAssignUserRoles(this.doaFilterParams)
    //   .subscribe((res) => {
    //     this.doaUsers = res["data"].map((doa) => {
    //       let temp = doa.study_invite_user.user;
    //       return {
    //         name: `${
    //           temp.first_name.charAt(0).toUpperCase() + temp.first_name.slice(1)
    //         } ${temp.last_name}`,
    //         id: temp.id,
    //         userCredentialsIsValid: temp?.status,
    //       };
    //     });
    //   });
    // this.getLoginUser();
  }
  onFiltering(e: FilteringEventArgs) {
    // let query = new Query();
    // query =
    //   e.text != "" ? query.where("name", "startswith", e.text, true) : query;
    // e.updateData(this.doaUsers, query);
  }

  // Get procedure task and esource data
  getProcedureTasks() {
    // this._dashboardService
    //   .getAssignedTaskUser({
    //     study_visit_id: this.subjectInfo.study_schedule_visit_id,
    //     subject_id: this.subjectInfo.subject.id,
    //   })
    //   .subscribe((mainRes) => {
    //     this._subjectManagerService
    //       .getProcedureByVisitId({
    //         ...this.filterParamsData,
    //         visit_oid: this.subjectInfo.study_schedule_visit.oid,
    //         type: "clinicProcedure",
    //       })
    //       .subscribe((res) => {
    //         if (res) {
    //           this.taskDataSource = res["data"].data.map((procedure, index) => {
    //             let obj = {
    //               name: procedure.study_procedure.name,
    //               id: index + 1,
    //             };
    //               this.esourceDataSource.push({
    //                 ...obj,
    //                 esourceForms:
    //                   procedure.study_procedure.study_procedure_esource_forms.map(
    //                     (esource) => {
    //                       let userExists = mainRes["data"].find(
    //                         (listData) =>
    //                           listData["study_procedure_id"] ===
    //                             procedure.study_procedure.id &&
    //                           listData["study_visit_id"] ===
    //                             procedure.study_schedule_id &&
    //                           listData["study_esource_form_id"] ===
    //                             esource.esource_form.id
    //                       );
    //                       return {
    //                         name: esource.esource_form.name,
    //                         study_visit_id: procedure.study_schedule_id,
    //                         subject_id: this.subjectInfo.subject.id,
    //                         study_procedure_id: procedure.study_procedure.id,
    //                         study_esource_form_id: esource.esource_form.id,
    //                         json_form_data: esource.esource_form.form_data,
    //                         form_data: esource.subject_esource_form?.form_data,
    //                         user_id: userExists?.user_id,
    //                         status: userExists?.status,
    //                         user_name: userExists?.first_name,
    //                         esource_form_oid: esource.subject_esource_form?.oid,
    //                         oid: userExists?.user_id ? userExists.oid : "",
    //                         audit_trails:esource.esource_form?.audit_trails,
    //                         id:esource.esource_form?.id,
    //                       };
    //                     }
    //                   ),
    //               });
              

    //             return {
    //               ...obj,
    //               tasks:
    //                 procedure.study_procedure.study_procedure_study_tasks.map(
    //                   (task) => {
    //                     let userExists = mainRes["data"].find(
    //                       (listData) =>
    //                         listData["study_procedure_id"] ===
    //                           procedure.study_procedure.id &&
    //                         listData["study_visit_id"] ===
    //                           procedure.study_schedule_id &&
    //                         listData["study_task_id"] === task.study_task.id
    //                     );
    //                     return {
    //                       name: task.study_task.name,
    //                       type: task.study_task.type,
    //                       subject_id: this.subjectInfo.subject.id,
    //                       study_visit_id: procedure.study_schedule_id,
    //                       study_procedure_id: procedure.study_procedure.id,
    //                       study_task_id: task.study_task.id,
    //                       status: userExists?.status,
    //                       user_id: userExists?.user_id,
    //                       user_name:
    //                         userExists?.user?.first_name +
    //                         " " +
    //                         userExists?.user?.last_name,
    //                       oid: userExists?.user_id ? userExists.oid : "",
    //                     };
    //                   }
    //                 ),
    //             };
    //           });
    //         }
    //         this.taskDataSource = this.taskDataSource.map((procedure) => {
    //           let procedure_task_status = "";
    //           let task_length = procedure["tasks"].length;
    //           let isPending = procedure["tasks"].find(
    //             (task) => task.status === "pending"
    //           );
    //           if (isPending) {
    //             procedure_task_status = "Pending";
    //           } else {
    //             let isComplete = procedure["tasks"].filter(
    //               (task) => task.status === "completed"
    //             );
    //             if (
    //               isComplete &&
    //               isComplete.length > 0 &&
    //               isComplete.length === task_length
    //             ) {
    //               procedure_task_status = "Complete";
    //             } else {
    //               let isPendingOrComplete = procedure["tasks"].find(
    //                 (task) =>
    //                   task.status === "pending" || task.status === "completed"
    //               );
    //               if (isPendingOrComplete) {
    //                 procedure_task_status = "Pending";
    //               } else {
    //                 procedure_task_status = "";
    //               }
    //             }
    //           }
    //           return {
    //             ...procedure,
    //             procedure_task_status,
    //           };
    //         });
    //         this.esourceDataSource = this.esourceDataSource.map((procedure) => {
    //           let procedure_esource_status = "";
    //           let task_length = procedure["esourceForms"].length;
    //           let isPending = procedure["esourceForms"].find(
    //             (task) => task.status === "pending"
    //           );
    //           if (isPending) {
    //             procedure_esource_status = "Pending";
    //           } else {
    //             let isComplete = procedure["esourceForms"].filter(
    //               (task) => task.status === "completed"
    //             );
    //             if (
    //               isComplete &&
    //               isComplete.length > 0 &&
    //               isComplete.length === task_length
    //             ) {
    //               procedure_esource_status = "Complete";
    //             } else {
    //               let isPendingOrComplete = procedure["esourceForms"].find(
    //                 (task) =>
    //                   task.status === "pending" || task.status === "completed"
    //               );
    //               if (isPendingOrComplete) {
    //                 procedure_esource_status = "Pending";
    //               } else {
    //                 procedure_esource_status = "";
    //               }
    //             }
    //           }
    //           return {
    //             ...procedure,
    //             procedure_esource_status,
    //           };
    //         });
    //       });
    //   });
  }

  close(): void {
//     if (this.updateUserArray.length > 0 || this.createUserArray.length > 0) {
//       const config: any = {
//         title: 'Proceed Without Save?',
//         message:
//             `Your changes will be lost if you don't save them.`,
//             icon: {
//                 show: true,
//                 name: 'heroicons_outline:davesa-c',
//                 color: '',
//             },
//             actions: {
//                 confirm: {
//                     show: true,
//                     label: 'Confirm',
//                     color: 'primary',
//                 },
//                 cancel: {
//                     show: false,
//                     label: 'Cancel',
//                 },
//             },
//             dismissible: true,        
//     };

//     // Open the dialog and save the reference of it
//     const dialogRef = this._davesaConfirmationService.open(
//         config
//     );

//     // Subscribe to afterClosed from the dialog reference
//     dialogRef.afterClosed().subscribe((result) => {
//       if (result) {
//         this.updateUserArray = [];
//         this.createUserArray = [];
//         this.closeVisitSidebar.emit(true);
//       }
//   });
// } else {
//   this.closeVisitSidebar.emit(true);
// }
}

  save() {
    // if (this.updateUserArray.length > 0 || this.createUserArray.length > 0) {
    //   this._dashboardService
    //     .createUpdateClinicTaskAssignUser({
    //       createData: this.createUserArray,
    //       updateData: this.updateUserArray,
    //     })
    //     .subscribe((res) => {
    //       if (res) {
    //         this.createUserArray = [];
    //         this.updateUserArray = [];
    //         this.esourceDataSource = [];
    //         this.taskDataSource = [];
    //         this._matSnackBarService.success(res.message);
    //         this.getProcedureTasks();
    //       }
    //     });
    // }
  }

  panelClick(data) {
    this.panel = data.tab.textLabel;
    this.save();
  }

  handleDropDownChange(e: any, data) {
    if (e["value"] !== null) {
      data["user_id"] = e["value"];
      this.UpdateVisit(data, "esource");
    }
  }

  openEsourceDialog(data) {
    // this.EsourceData = {
    //   ...data,
    //   subject: this.subjectInfo.subject,
    //   appointment_start_date: this.subjectInfo.appointment_start_date,
    //   study_oid: this.subjectInfo.study.oid,
    //   study_id: this.subjectInfo.study.id,
    //   visit_status: this.subjectInfo.status,
    //   isAdmin: this.isAdmin,
    //   esourceFormCapture: this.permissionsObj,
    //   esourceForm:data,
    //   visit:this.subjectInfo
    // };
  }

  addUser(task) {
    // this.selectedProcedureTask = task;
    // this.doaFilterParams.study_task_id = task.study_task_id;
    // this._dashboardService
    //   .AssignTaskUserList({
    //     study_oid: this.subjectInfo.study.oid,
    //     study_task_id: task.study_task_id,
    //   })
    //   .subscribe((res) => {
    //     if (res) {
    //       this.doaUsers = res["data"].map((doa) => {
    //         let temp = doa.user;
    //         return {
    //           name: `${temp.first_name} ${temp.last_name}`,
    //           id: doa.user_id,
    //           userCredentialsIsValid: temp?.status,
    //         };
    //       });
    //     }
    //   });

    // this.userDialog.show();
  }

  // send notification if user credential not match with task required credential
  sendNotification(userId: Number) {
    // this._personalIAssignUser
    //   .sendNotificationToTaskUser({
    //     study_task_id: this.doaFilterParams.study_task_id,
    //     user_id: userId,
    //   })
    //   .subscribe((res) => {
    //     this._globalSocketService.sendGlobalNotification(res.data);
    //     this._matSnackBarService.success(res.message);
    //     //  this.userDialog.hide();
    //   });
  }

  public onBeforeOpen = function (args: any): void {
    // setting maxHeight to the Dialog.
    args.maxHeight = "300px";
  };

  onUserSelect(e: SelectEventArgs, data) {
    data["user_id"] = e.data["id"];
    data["user_name"] = e.data["name"];
    this.UpdateVisit(data, "task");
    this.userDialog.hide();
  }

  onActionBegin() {
    // this.doaUsers.forEach((user) => {
    //   if (!user.userCredentialsIsValid) {
    //     this.listviewInstance.disableItem(user);
    //   }
    // });
  }
  statusChange(e: any, data, type) {
    data["status"] = e.value;
    this.UpdateVisit(data, type);
  }

  // common update function for visit task and visit esource
  UpdateVisit(data, type) {
    if (data.oid) {
      let userUpdate = this.updateUserArray.find((item) => {
        if (type === "task") {
          return (
            item.study_task_id === data.study_task_id &&
            item.study_procedure_id === data.study_procedure_id
          );
        } else {
          return (
            item.study_esource_form_id ===
              data.study_esource_form_id &&
            item.study_procedure_id === data.study_procedure_id
          );
        }
      });
      if (userUpdate) {
        userUpdate["user_id"] = data["user_id"];
        userUpdate["status"] = data["status"];
        userUpdate = data;
      } else {
        let task = {
          subject_id: data.subject_id,
          study_visit_id: data.study_visit_id,
          study_procedure_id: data.study_procedure_id,
          user_id: data.user_id,
          oid: data.oid,
          status: data["status"],
        };
        if (type === "task") {
          task["study_task_id"] = data.study_task_id;
        } else if (type === "esource") {
          task["study_esource_form_id"] = data.study_esource_form_id;
        }
        this.updateUserArray.push(task);
      }
    } else {
      let userUpdate = this.createUserArray.find(
        (item) =>
          item.study_esource_form_id === data.study_esource_form_id &&
          item.study_procedure_id === data.study_procedure_id
      );
      if (userUpdate) {
        userUpdate["user_id"] = data["user_id"];
        userUpdate["status"] = data["status"];
        userUpdate = data;
      } else {
        let task = {
          subject_id: data.subject_id,
          study_visit_id: data.study_visit_id,
          study_procedure_id: data.study_procedure_id,
          user_id: data.user_id,
          status: data["status"],
        };
        if (type === "task") {
          task["study_task_id"] = data.study_task_id;
        } else if (type === "esource") {
          task["study_esource_form_id"] = data.study_esource_form_id;
        }
        this.createUserArray.push(task);
      }
    }
  }

  getLoginUser() {
    this._authDavesaApiService.getAuthUserAccessInfo().subscribe((res) => {
      if (res != null) {
        this.permissionsObj = res;
        this.isAdmin = true;
      } else {
        this.getPermission();
      }
    });
  }
  getPermission() {
    // this._permissionService
    //   .getPermissionModuleWise(
    //     this.subjectInfo.study.oid,
    //     Permission.ESOURCE_FORM_CAPTURE
    //   )
    //   .subscribe((res) => {
    //     this.permissionsObj = res;
    //   });
  }

  CloseorCompleteVisit(visitStatus): void {
  //   if (this.updateUserArray.length > 0 || this.createUserArray.length > 0) {
  //     const config: any = {
  //       title: 'Do you want to update status of visit?',
  //       message: `It will update current visit status to ${visitStatus}.`,
  //       icon: {
  //               show: true,
  //               name: 'heroicons_outline:davesa-c',
  //               color: '',
  //           },
  //           actions: {
  //               confirm: {
  //                   show: true,
  //                   label: 'Confirm',
  //                   color: 'primary',
  //               },
  //               cancel: {
  //                   show: false,
  //                   label: 'Cancel',
  //               },
  //           },
  //           dismissible: true,        
  //   };

  //   // Open the dialog and save the reference of it
  //   const dialogRef = this._davesaConfirmationService.open(
  //       config
  //   );

  //   // Subscribe to afterClosed from the dialog reference
  //   dialogRef.afterClosed().subscribe((result) => {
  //     if (result) {
  //       this._subjectManagerService
  //         .makeAppointment({
  //           oid: this.subjectInfo.oid,
  //           status: visitStatus,
  //         })
  //         .subscribe({
  //           next: (res) => {
  //             this._matSnackBarService.success("Status Update SuccessFully");
  //             this.subjectInfo.status = res.data.status;
  //             if (this.subjectInfo?.study?.is_finance) {
  //               this._studyBudgetSettingService
  //                 .getBudgetSettings(this.subjectInfo.study.oid)
  //                 .subscribe((budget) => {
  //                   if (budget.data.invoice_event === res.data.status) {
  //                     this._financeAdminService
  //                       .generateVisitBillableItem({
  //                         subject_visit_oid: this.subjectInfo.oid,
  //                         study_id: this.subjectInfo.study.id,
  //                       })
  //                       .subscribe((billableItemRes: any) => {
  //                         if (billableItemRes) {
  //                           this._matSnackBarService.success(
  //                             billableItemRes.message
  //                           );
  //                         }
  //                       });
  //                   }
  //                 });
  //             }
  //           },
  //           error: (error) => {
  //             this._matSnackBarService.error(error?.error?.error);
  //           },
  //         });
  //     }
  //   });
  // }
  }


  completeEsource(){
    // this.esourceDataSource = [];
    // this.taskDataSource = [];
    // this.getProcedureTasks();
  }
}
