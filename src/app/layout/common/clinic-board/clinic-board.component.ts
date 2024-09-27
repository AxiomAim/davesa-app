import {Component, inject, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {
    GridAllModule,
    GridComponent,
    GroupService,
    PageSettingsModel,
    TextWrapSettingsModel,
    ToolbarItems,
    ToolbarService,
} from "@syncfusion/ej2-angular-grids";
import {SidebarComponent, SidebarModule} from "@syncfusion/ej2-angular-navigations";
import {BehaviorSubject, map, Observable, Subscription, switchMap, take, tap} from "rxjs";
//SidebarSubjectDetails
import {AuthDavesaApiService} from "app/core/auth-davesa/auth-davesa-api.service";
import {EsourceFunctions} from "app/core/functions/esource-form-functions";
import {Visit} from "app/core/interfaces/visit.interface";
import {FilterParams} from "app/core/types/filter-params.type";
import {ParticipantsV1Service} from "app/core/services/participants-v1.service";
import {FinanceStudyBudgetSettingsService} from "app/core/services/finance-study-budget-settings.service";
import {FinanceAdminService} from "app/core/services/finance-admin.service";
import {SubjectManagerV2Service} from "app/core/services/subject-manager-v2.service";
import {TranslocoModule} from "@ngneat/transloco";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatRippleModule} from "@angular/material/core";
import {MatMenuModule} from "@angular/material/menu";
import {MatTabsModule} from "@angular/material/tabs";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {NgApexchartsModule} from "ng-apexcharts";
import {MatTableModule} from "@angular/material/table";
import {AsyncPipe, DatePipe, NgClass, NgFor, NgIf} from "@angular/common";
import {DashboardV1Service} from "app/core/services/dashboard-v1.service";
import {Page} from "app/core/interfaces/page.model";
import {PersonalAssignUserV1Service} from "app/core/services/personal-assign-user-v1.service";
import {GlobalSocketV1Service} from "app/core/services/global-socket-v1.service";
import {GetOne} from "app/core/interfaces/generics/getOne.interface";
import {MatSnackBarService} from "app/core/services/mat-snack-bar.service";
import {CreateResponse} from "app/core/interfaces/response.interface";
import {UserRoleEnum} from "app/core/enum/userRole.enum";
import {StudyBudgetSetting} from "app/core/interfaces/finance-budget-setting.interface";
import {VisitStatus} from "app/core/enum/visit-status.enum";
import {DavesaConfirmationService} from "@davesa/services/confirmation";
import {GridModule} from "@ngbracket/ngx-layout";
import {MatChipsModule} from "@angular/material/chips";
import {MatTooltip, MatTooltipModule} from "@angular/material/tooltip";
import {ParticipantsV2Service} from "app/core/services/participants-v2.service";
import {DavesaVisitService} from "@davesa/services/visit/visit.service";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {BroadcasterV2Service} from "app/core/services/broadcaster-v2.service";
import {BroadcasterV1Service} from "app/core/services/broadcaster-v1.service";
import {VisitsV2Service} from "app/core/services/visits-v2.services";
import {DashboardV2Service} from "app/core/services/dashboard-v2.service";
import {ClinicBoardService} from "./clinic-board.service";
import { Participant } from "app/core/interfaces/participant.interface";
import { VisitComComponent } from "../visit-com/visit-com.component";
import { SettingsComponent } from "../settings/settings.component";

const clinicStatus: string[] = ["pending", "in", "out", "review"];

@Component({
    selector: "clinic-board",
    templateUrl: "./clinic-board.component.html",
    styleUrls: ["./clinic-board.component.scss"],
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
        MatTableModule,
        MatChipsModule,
        NgClass,
        NgIf,
        NgFor,
        SidebarModule,
        GridModule,
        GridAllModule,
        AsyncPipe,
        DatePipe,
        NgClass,
        MatTooltipModule,
        MatSlideToggleModule,
        SettingsComponent
    ],

    providers: [
        DashboardV1Service,
        PersonalAssignUserV1Service,
        GlobalSocketV1Service,
        ParticipantsV1Service,
        SubjectManagerV2Service,
        ToolbarService,
        GroupService,
    ],
})
export class ClinicBoardComponent extends EsourceFunctions implements OnInit, OnDestroy {
    private _authDavesaApiService = inject(AuthDavesaApiService);
    private _snackBarService = inject(MatSnackBarService);
    private _broadcasterV1Service = inject(BroadcasterV1Service);
    private _davesaVisitService = inject(DavesaVisitService);
    private _participantsV2Service = inject(ParticipantsV2Service);
    private _visists2Service = inject(VisitsV2Service);
    private _dashboardV2Service = inject(DashboardV2Service);
    public viewSettings: boolean = false;

    @ViewChild("grid") public grid: GridComponent;
    @ViewChild("sidebarSubjectDetails") sidebarSubjectDetails: SidebarComponent;
    public positionRight: string = "Right";
    unfilterCount: number;
    public wrapSettings: TextWrapSettingsModel;
    public toolbar: ToolbarItems[];
    public enableAdaptiveUI: boolean = false;
    public sortOptions: object;
    public esourceFormData: object;
    public visit: Visit;
    public animate: boolean = false;
    public enableRtl: boolean = true;
    public showBackdrop: boolean = false;
    public type: string = "Push";
    public width: string = "540px";
    public target: string = "content";
    public enablePersistence: boolean = true;
    public pageSettings: PageSettingsModel;
    subscription: Subscription;
    subjectsVisitArr: Array<Object> = [];
    checkInActionIcon: string = "visibility";
    page = new Page();
    public clinicBoard: any[];
    public participantInfo: any;
    public rows: any[];

    allVisits: Visit[];
    public taskDataSource: Object[];
    public esourceDataSource: Object[] = [];

    public _clinicBoard: BehaviorSubject<any[] | null> = new BehaviorSubject(
        null
    );
    get clinicBoard$(): Observable<Participant[]> {
        return this._clinicBoard.asObservable();
    }


    filterParamsData: FilterParams = {
        offset: 0,
        limit: 0,
        sort_field: "created_at",
        sort_direction: "D",
        query: "",
    };

    filterManagerParamsData = {
        visitOffset: 0,
        visitLimit: 0,
        offset: 0,
        procedureOffset: 0,
        procedureLimit: 10,
        sort_field: "visit_type",
        sort_direction: "A",
        query: "",
        subject_oid: "",
    };

    userRole: string;
    subjectVisitOidFromUrl: string = "";
    public doaRequestSubscription: Subscription;
    @ViewChild("sidebarCompareVisit") sidebarCompareVisit: SidebarComponent;
    showCompareVisit: boolean = false;
    showVisit: boolean = false;
    constructor(
        private router: Router,
        private _studyBudgetSettingService: FinanceStudyBudgetSettingsService,
        private _financeAdminService: FinanceAdminService,
        public _subjectManagerV2Service: SubjectManagerV2Service, // public dialogRef: MatDialogRef<VisitInfoDialogComponent>,
        private activatedRoute: ActivatedRoute,
        private _davesaConfirmationService: DavesaConfirmationService,
        private _clinicBoardService: ClinicBoardService
    ) {
        super(_subjectManagerV2Service);
        this.page.size = 0;
        this.page.offset = 0;
    }

    // getClinicBoard() {
    //     this._clinicBoardService.getClinicBoard().pipe(
    //         switchMap((res: any) => {
    //             this._clinicBoardService._clinicBoard.next(res.data);
    //             return this._clinicBoardService.clinicBoard$.pipe(
    //                 tap(() => {
    //                     this.clinicBoard = res.data.map((visitData) => {
    //                         return {
    //                             ...visitData,
    //                             subject_id: visitData["subject"].subject_id,
    //                             primary_coordinator: visitData?.["study"]?.study_delegation_role_users.map((user) => {
    //                                 return user?.study_invite_user?.user?.first_name;
    //                             }),
    //                             study_number: visitData["study"].number,
    //                             visit_name: visitData["visit_name"]
    //                                 ? visitData["visit_name"]
    //                                 : visitData["study_schedule_visit"]?.name,
    //                             arrived: visitData["subject_clinic"]?.check_in_time,
    //                             departed: visitData["subject_clinic"]?.check_out_time,
    //                         };
    //                     this.userRole = this._authDavesaApiService.userDetails()?.user_role?.role?.name;
    //                     this.unfilterCount = 0;

    //                     // if url has subject_visit-oid query params then open subject visit info in sidebar
    //                     if (this.subjectVisitOidFromUrl !== "") {
    //                         this._visists2Service
    //                         .getByOid(this.subjectVisitOidFromUrl)
    //                         .subscribe((res: GetOne<Visit>) => {
    //                             if (res) {
    //                             this.participantInfo = res.data;
    //                             this.sidebarSubjectDetailsToggle();
    //                             this.subjectVisitOidFromUrl = "";
    //                             }
    //                         });
    //                     }

    //                     });
    //                 })
    //             );
    //         })
    //     );
    // }

    getAll() {
        this._participantsV2Service
        .getAllByStudy(this.filterParamsData)
        .subscribe((res: any) => {
            if (res["data"]) {
            this.rows = res["data"].map((visitData) => {
                return {
                ...visitData,
                subject_id: visitData["subject"].subject_id,
                primary_coordinator: visitData?.[
                    "study"
                ]?.study_delegation_role_users.map((user) => {
                    return user?.study_invite_user?.user?.first_name;
                }),
                study_number: visitData["study"].number,
                visit_name: visitData["visit_name"]
                    ? visitData["visit_name"]
                    : visitData["study_schedule_visit"]?.name,
                arrived: visitData["subject_clinic"]?.check_in_time,
                departed: visitData["subject_clinic"]?.check_out_time,
                };
            });
            this._clinicBoard.next(this.rows)

            this.userRole = this._authDavesaApiService.userDetails()?.user_role?.role?.name;
            this.unfilterCount = 0;

            // if url has subject_visit-oid query params then open subject visit info in sidebar
            if (this.subjectVisitOidFromUrl !== "") {
                this._visists2Service
                .getByOid(this.subjectVisitOidFromUrl)
                .subscribe((res: GetOne<Visit>) => {
                    if (res) {
                    this.visit = res.data;
                    this.sidebarSubjectDetailsToggle();
                    this.subjectVisitOidFromUrl = "";
                    }
                });
            }
            }
        });
    }

    checkIn(subjectInfo, showDlg?: boolean): void {
        // Open the confirmation dialog
        const confirmation = this._davesaConfirmationService.open({
            title: "View Visit Details",
            message: "Do you want to view this visit details ?",
            icon: {
                show: true,
                name: "heroicons_outline:davesa-c",
            },
            actions: {
                confirm: {
                    show: true,
                    label: "View",
                    color: "primary",
                },
                cancel: {
                    show: true,
                    label: "Cancel",
                },
            },
            dismissible: true,
        });

        // Subscribe to the confirmation dialog closed action
        confirmation.afterClosed().subscribe((result) => {
            if (result) {
                this._participantsV2Service
                .checkIn({subject_visit_id: subjectInfo.id})
                .subscribe((res: CreateResponse) => {
                    if (res) {
                        this._snackBarService.success(res["message"]);
                        this.getAll();
                    }
                });
            }
        });
    }

    closeSidebarSubjectDetails() {
        this.visit = null;
        this.getAll();
    }

    ngOnInit() {
        this.wrapSettings = {wrapMode: "Content"};
        this.pageSettings = {
            pageSize: 10,
            pageSizes: true,
        };
        this.toolbar = ["Search"];
        this.sortOptions = {
            columns: [{field: "created_at", direction: "Descending"}],
        };

        this.getAll();
        /* when user accept study request from notification refresh study list */
        this.doaRequestSubscription = this._broadcasterV1Service.isDelegationRoleAccept.subscribe((data: boolean) => {
            if (data) {
                this.getAll();
            }
        });
        // if user click on link from subject visit status update notification
        this._broadcasterV1Service.subjectVisitOid.subscribe((data) => {
            if (data) {
                this._visists2Service.getByOid(data).subscribe((res: GetOne<Visit>) => {
                    if (res) {
                        this.visit = res.data;
                        this.sidebarSubjectDetailsToggle();
                        this._broadcasterV1Service.setSubjectVisitOid("");
                    }
                });
            }
        });
        // if user click on link from subject visit status update mail
        this.activatedRoute.queryParams.subscribe((res) => {
            if (res) {
                if (res["subject_visit_oid"]) {
                    this.subjectVisitOidFromUrl = res["subject_visit_oid"];
                }
            }
        });
    }

    public onLoad(): void {
        // (this.grid as any).adaptiveDlgTarget = document.getElementsByClassName('e-mobile-content')[0] as HTMLElement;
    }

    async openVisit(participantInfo) {
        this.viewSettings = true;
        // await this.getAllVisits(participantInfo);
        // await this.getProcedureTasks(participantInfo);

        // await this._participantsV2Service.setParticipantInfo(participantInfo);
        // await this._dashboardV2Service.setToStorage();
        // this.openVisitDrawer();
    }

    async viewVisitDetails(visit) {
        console.log('row', visit.subject)
        this.participantInfo = visit.subject;
        this._davesaVisitService.setParticipant(this.participantInfo);
    }

    async getProcedureTasks(participantInfo) {
        await this._dashboardV2Service
        .getAssignedTaskUser({
            study_visit_id: participantInfo.study_schedule_visit_id,
            subject_id: participantInfo.subject.id,
        })
        .pipe(
            take(1),
            switchMap((mainRes: any) => {
                return this._subjectManagerV2Service
                .getProcedureByVisitId({
                    ...this.filterParamsData,
                    visit_oid: participantInfo.study_schedule_visit.oid,
                    type: "clinicProcedure",
                })
                .pipe(
                    take(1),
                    map((res: any) => {
                        if (res) {
                            const taskDataSource = res["data"].data.map((procedure, index) => {
                                let obj = {
                                    name: procedure.study_procedure.name,
                                    id: index + 1,
                                };

                                this.esourceDataSource.push({
                                    ...obj,
                                    esourceForms: procedure.study_procedure.study_procedure_esource_forms.map(
                                        (esource) => {
                                            let userExists = mainRes["data"].find(
                                                (listData) =>
                                                    listData["study_procedure_id"] === procedure.study_procedure.id &&
                                                    listData["study_visit_id"] === procedure.study_schedule_id &&
                                                    listData["study_esource_form_id"] === esource.esource_form.id
                                            );
                                            return {
                                                name: esource.esource_form.name,
                                                study_visit_id: procedure.study_schedule_id,
                                                subject_id: this.visit.subject.id,
                                                study_procedure_id: procedure.study_procedure.id,
                                                study_esource_form_id: esource.esource_form.id,
                                                json_form_data: esource.esource_form.form_data,
                                                form_data: esource.subject_esource_form?.form_data,
                                                user_id: userExists?.user_id,
                                                status: userExists?.status,
                                                user_name: userExists?.first_name,
                                                esource_form_oid: esource.subject_esource_form?.oid,
                                                oid: userExists?.user_id ? userExists.oid : "",
                                                audit_trails: esource.esource_form?.audit_trails,
                                                id: esource.esource_form?.id,
                                            };
                                        }
                                    ),
                                });
                                return {
                                    ...obj,
                                    tasks: procedure.study_procedure.study_procedure_study_tasks.map((task) => {
                                        let userExists = mainRes["data"].find(
                                            (listData) =>
                                                listData["study_procedure_id"] === procedure.study_procedure.id &&
                                                listData["study_visit_id"] === procedure.study_schedule_id &&
                                                listData["study_task_id"] === task.study_task.id
                                        );
                                        return {
                                            name: task.study_task.name,
                                            type: task.study_task.type,
                                            subject_id: this.visit.subject.id,
                                            study_visit_id: procedure.study_schedule_id,
                                            study_procedure_id: procedure.study_procedure.id,
                                            study_task_id: task.study_task.id,
                                            status: userExists?.status,
                                            user_id: userExists?.user_id,
                                            user_name: userExists?.user?.first_name + " " + userExists?.user?.last_name,
                                            oid: userExists?.user_id ? userExists.oid : "",
                                        };
                                    }),
                                };
                            });
                            this._dashboardV2Service.setTaskDataSource(taskDataSource);
                        }
                        const taskDataSource = this.taskDataSource.map((procedure) => {
                            let procedure_task_status = "";
                            let task_length = procedure["tasks"].length;
                            let isPending = procedure["tasks"].find((task) => task.status === "pending");
                            if (isPending) {
                                procedure_task_status = "Pending";
                            } else {
                                let isComplete = procedure["tasks"].filter((task) => task.status === "completed");
                                if (isComplete && isComplete.length > 0 && isComplete.length === task_length) {
                                    procedure_task_status = "Complete";
                                } else {
                                    let isPendingOrComplete = procedure["tasks"].find(
                                        (task) => task.status === "pending" || task.status === "completed"
                                    );
                                    if (isPendingOrComplete) {
                                        procedure_task_status = "Pending";
                                    } else {
                                        procedure_task_status = "";
                                    }
                                }
                            }
                            return {
                                ...procedure,
                                procedure_task_status,
                            };
                        });
                        this._dashboardV2Service.setTaskDataSource(taskDataSource);

                        const esourceDataSource = this.esourceDataSource.map((procedure) => {
                            let procedure_esource_status = "";
                            let task_length = procedure["esourceForms"].length;
                            let isPending = procedure["esourceForms"].find((task) => task.status === "pending");
                            if (isPending) {
                                procedure_esource_status = "Pending";
                            } else {
                                let isComplete = procedure["esourceForms"].filter(
                                    (task) => task.status === "completed"
                                );
                                if (isComplete && isComplete.length > 0 && isComplete.length === task_length) {
                                    procedure_esource_status = "Complete";
                                } else {
                                    let isPendingOrComplete = procedure["esourceForms"].find(
                                        (task) => task.status === "pending" || task.status === "completed"
                                    );
                                    if (isPendingOrComplete) {
                                        procedure_esource_status = "Pending";
                                    } else {
                                        procedure_esource_status = "";
                                    }
                                }
                            }
                            return {
                                ...procedure,
                                procedure_esource_status,
                            };
                        });
                        this._dashboardV2Service.setEsourceDataSource(esourceDataSource);

                        if (mainRes instanceof Subscription) {
                            mainRes.unsubscribe();
                        }
                    })
                );
            })
        )
        .subscribe({
            next: (res: any) => {
                if (res instanceof Subscription) {
                    res.unsubscribe();
                }
            },
            error: (error) => {
                console.log("Error in getProcedureTasks", error);
            },
            complete: () => {},
        });
    }


    checkOutParticipant(subjectInfo: any): void {
        const confirmation = this._davesaConfirmationService.open({
            title: "Check Out Participant",
            message: "Do you want to check out this Particiapnt ?",
            icon: {
                show: true,
                name: "heroicons_outline:davesa-c",
            },
            actions: {
                confirm: {
                    show: true,
                    label: "Check Out",
                    color: "warn",
                },
                cancel: {
                    show: true,
                    label: "Cancel",
                },
            },
            dismissible: true,
        });

        // Subscribe to the confirmation dialog closed action
        confirmation.afterClosed().subscribe((result) => {
            if (result) {
                this._participantsV2Service
                .checkOut({oid: subjectInfo.subject_clinic.oid})
                .subscribe((res: Response) => {
                    if (res) {
                        this._snackBarService.success(res["message"]);
                        if (subjectInfo?.study?.is_finance) {
                            this._studyBudgetSettingService
                            .getBudgetSettings(subjectInfo.study.oid)
                            .subscribe((budget: GetOne<StudyBudgetSetting>) => {
                                if (budget.data.invoice_event === VisitStatus.REVIEW) {
                                    this._financeAdminService
                                    .generateVisitBillableItem({
                                        subject_visit_oid: subjectInfo.oid,
                                        study_id: subjectInfo.study.id,
                                    })
                                    .subscribe((billableItemRes: any) => {
                                        if (billableItemRes) {
                                            this._snackBarService.success(billableItemRes.message);
                                        }
                                    });
                                }
                            });
                        }
                        this.getAll();
                    }
                });
            }
        });
    }

    updateFilterParamsData(data: FilterParams) {
        for (let [key, value] of Object.entries(data)) {
            this.filterParamsData[key] = value;
        }
        this.getAll();
    }

    navigateToPatient(subject: {subject: {oid: string}}) {
        this.router.navigate(["/subject/subject-view"], {
            queryParams: {oid: subject?.subject?.oid},
            preserveFragment: true,
        });
    }

    // Grid icon change change based on condition

    getGridToolTip(row, type) {
        if (type === "clinic_in") {
            if (!row.subject_clinic?.check_in_time) {
                return "Check Subject into Clinic";
            } else {
                return false;
            }
        } else if (type === "clinic_view") {
            return "View Visit Details";
        }
    }

    getGridIcon(rowData, type) {
        if (type === "mat_solid:cancel") {
            if (!rowData.subject_clinic?.check_in_time) {
                return "davesaicons_solid:check-in";
            } else {
                return false;
            }
        } else if (type === "davesaicons_solid:davesa-c") {
            return "davesaicons_solid:davesa-c";
        } else {
            if (rowData.subject_clinic?.check_in_time && !rowData.subject_clinic?.check_out_time) {
                return "mat_solid:cancel";
            }
            if (rowData.subject_clinic?.check_in_time && rowData.subject_clinic?.check_out_time) {
                return "davesaicons_solid:davesa-c";
            }
        }
    }

    disabledBtnByRole(): boolean {
        return this.userRole === UserRoleEnum.monitor;
    }

    ngOnDestroy(): void {
        this.doaRequestSubscription.unsubscribe();
    }

    public sidebarSubjectDetailsToggle(): void {
        this.sidebarSubjectDetails.toggle();
    }

    onSidebarCreated() {
        this.sidebarCompareVisit.hide();
        this.sidebarSubjectDetails.hide();
    }

    // ? Permission methods

    openSubject(data) {
        this.router.navigate(["subject/subject-view"], {
            queryParams: {
                subject_oid: data.subject.oid,
                study_oid: data.study?.oid,
            },
            preserveFragment: true,
        });
    }

    public closeRightClick(): void {
        this.sidebarCompareVisit.hide();
        this.sidebarSubjectDetails.hide();
        this.showCompareVisit = false;
    }

    compareVisit() {
        this.sidebarCompareVisit.toggle();
        if (this.sidebarCompareVisit.isOpen) {
            this.showCompareVisit = true;
        }
    }
    closeCompareSidebar() {
        this.sidebarCompareVisit.hide();
        this.showCompareVisit = false;
    }

    closeVisitSidebar(e) {
        this.sidebarCompareVisit.hide();
        this.sidebarSubjectDetails.hide();
        this.showCompareVisit = false;
    }

    getSubjectStatus(row: any) {
        if (row.subject_clinic?.check_in_time) {
            if (!row.subject_clinic?.check_out_time) {
                return "bg-amber-100";
            } else {
                return "bg-green-100";
            }
        } else {
            return "bg-grey-200";
        }
    }

    // getAllVisits(participantInfo) {
    //     if (!this.allVisits) {
    //         this.filterManagerParamsData.subject_oid = participantInfo.subject.oid;
    //         console.log("params", this.filterManagerParamsData);
    //         this._participantsV2Service
    //         .getVisitByStudy(this.filterManagerParamsData)
    //         .pipe(take(1))
    //         .subscribe(async (res) => {
    //             console.log("res", res.data);
    //             if (res && res.data && res?.data?.data?.length) {
    //                 console.log("res['data'].data", res["data"].data);
    //                 this.allVisits = res["data"].data;
    //             }
    //         });
    //     }
    // }
}
