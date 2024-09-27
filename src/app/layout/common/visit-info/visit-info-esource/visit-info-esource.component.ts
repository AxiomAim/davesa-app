import { NgClass, NgFor, NgIf } from "@angular/common";
import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, OnInit, Output, ViewEncapsulation } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatRippleModule } from "@angular/material/core";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatTabsModule } from "@angular/material/tabs";
import { TranslocoModule } from "@ngneat/transloco";
import { GridModule } from "@syncfusion/ej2-angular-grids";
import { SidebarModule } from "@syncfusion/ej2-angular-navigations";
import { AuthDavesaApiService } from "app/core/auth-davesa/auth-davesa-api.service";
import { EsourceFunctions } from "app/core/functions/esource-form-functions";
import { MatSnackBarService } from "app/core/services/mat-snack-bar.service";
import { ParticipantsV2Service } from "app/core/services/participants-v2.service";
import { ProcedureService } from "app/core/services/procedure.service";
import { StudiesV2Service } from "app/core/services/studies-v2.service";
import { SubjectManagerV2Service } from "app/core/services/subject-manager-v2.service";
import * as moment from "moment";
import { NgApexchartsModule } from "ng-apexcharts";

@Component({
  selector: "visit-info-esource",
  templateUrl: "./visit-info-esource.component.html",
  styleUrls: ["./visit-info-esource.component.scss"],
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
      NgFor

  ],
  providers: [
    
  ],

})
export class VisitInfoEsourceComponent
  extends EsourceFunctions
  implements OnInit
{
  private _matSnackBarService = inject(MatSnackBarService);
  private _studiesV2Service = inject(StudiesV2Service);
  // private _participantsV2Service = inject(ParticipantsV2Service);
  private _authDavesaApiService = inject(AuthDavesaApiService);

  formData: any;
  @Input() esourceData;
  @Input() isCompareVisit:boolean;
  @Output() completeEsourceEvent = new EventEmitter<any>();
  surveyData: any;
  currentStudy: any;
  constructor(
    private procedureService: ProcedureService,
    public _subjectManagerV1Service: SubjectManagerV2Service,
  ) {
    super(_subjectManagerV1Service);
  }

  ngOnInit(): void {
    this.getStudyById(this.esourceData?.study_oid);
    this.getEsourceData();
  }

  //Get study data by oid
  getStudyById(oid) {
    this._studiesV2Service.getById(oid).subscribe((res) => {
      if (res["data"]) {
       
        this.currentStudy = res["data"];
      }
    });
  }

  getInvestigatorName(): string {
    const investigator = `${this.currentStudy?.pi_user_list?.[0]?.study_invite_user?.user?.first_name} ${this.currentStudy?.pi_user_list?.[0]?.study_invite_user?.user?.last_name} `;
    return this.currentStudy?.pi_user_list?.length > 0 ? investigator : "";
  }

  getEsourceData() {
    if (this.esourceData.esource_form_oid) {
     
      this._subjectManagerV1Service
        .getOneSubjectEsourceForm(this.esourceData.esource_form_oid)
        .subscribe((res) => {
          if (res) {
            this.formData = res["data"].form_data;
            let subjectEsourceOid = res["data"].oid;

            this.setSurveyData(this.formData, subjectEsourceOid,res['data']?.user,res['data']);
          }
        });
    } else {
      this.setSurveyData(null, null, null,null);
    }
    this.setProcedureInfo();
  }

  async submitForm(formResponse) {
    let { formData, isComplete, options, formAuditTrail } = formResponse;
    let data = {
      subject_id: this.esourceData.subject.id,
      visit_id: this.esourceData.study_visit_id,
      procedure_id: this.esourceData.study_procedure_id,
      form_data: formData,
      esource_form_id: this.esourceData.study_esource_form_id,
      is_complete: isComplete,
    };
    // Form Audit Trail
    formAuditTrail = {
      trail_history: formAuditTrail,
      created_by: this._authDavesaApiService.userDetails().oid,
      created_at: new Date(),
    };
    if (this.esourceData.esource_form_oid) {
      this._subjectManagerV1Service
        .updateSubjectEsourceForm({
          ...data,
          oid: this.esourceData.esource_form_oid,
          ...(formAuditTrail.trail_history.length && {
            audit_trail: formAuditTrail,
          }),
        })
        .subscribe((res: any) => {
          if (this.fileUploadStatusArray.length) {
            this.toggleFileUploadStatus({
              data: this.fileUploadStatusArray,
              subject_esource_form_oid: this.currentSubjectEsourceFormOid,
              type: "update",
            });
          }

          this.completeEsourceEvent.emit(isComplete);
          this._matSnackBarService.success(res.message);
          options?.showSaveSuccess();
        });
    } else {
      this._subjectManagerV1Service
        .createSubjectEsourceForm({
          ...data,
          ...(formAuditTrail.trail_history.length && {
            audit_trail: formAuditTrail,
          }),
        })
        .subscribe((res: any) => {
          if (res) {
            if (this.fileUploadStatusArray.length) {
              this.toggleFileUploadStatus({
                data: this.fileUploadStatusArray,
                subject_esource_form_oid: res.data.oid,
                type: "create",
              });
            }
            this.completeEsourceEvent.emit(isComplete);
            this._matSnackBarService.success(res.message);
            options?.showSaveSuccess();
          } else {
            this.completeEsourceEvent.emit(isComplete);
            this._matSnackBarService.error(res.message);
          }
        });
    }
  }
  async toggleFileUploadStatus(fileData) {
    this._subjectManagerV1Service
      .toggleFileUploadStatus(fileData)
      .subscribe((res) => {
        if (res) {
          this.fileUploadStatusArray = [];
        }
      });
  }

  setProcedureInfo() {
    const procedureInfo = {
      procedureName: this.esourceData?.name,
      procedureDate: this.esourceData?.appointment_start_date,
      studyOid: this.esourceData.study_oid,
      study_id: this.esourceData.study_id,
      isAdmin: this.esourceData.isAdmin,
      esourceFormCapture: this.esourceData.esourceFormCapture,
      visitStatus: this.esourceData?.visit_status,
    };

    this.procedureService.setProcedureInfo(procedureInfo);
  }
  // ? Permission methods

  setSurveyData(formData, subjectEsourceOid,user,subject_esource_form) {
    this.surveyData = {
      formModel: this.esourceData.json_form_data,
      formData: formData,
      esourceForm: this.esourceData.esourceForm,
      subjectOid: this.esourceData.subject.oid,
      studyOid: this.esourceData.study_oid,
      user:user,
      subject_esource_form:subject_esource_form,
      subjectEsourceOid: subjectEsourceOid,
      pdfHeaderData: {
        "Sponsor Name": this.currentStudy?.sponsor_contact_info?.name,
        "Study Number": this.currentStudy?.number,
        "Site Name": this.currentStudy?.site_account?.site_name,
        "Site ID": this.currentStudy?.site_number,
        Investigator: this.getInvestigatorName(),
        "Protocol Ver": this.currentStudy?.study_protocols[0]?.version,
        Subject: this.esourceData?.subject?.subject_id,
        Visit: this.esourceData?.visit?.study_schedule_visit?.name,
        // "Visit Date": this.esourceData?.visit?.visit_date
        //   ? moment(new Date(this.esourceData?.visit?.visit_date)).format(
        //       "DD MMM YYYY"
        //     )
        //   : "",
        // "Print Date": moment(new Date()).format("DD MMM YYYY h:mm a"),
        "Print By": `${this._authDavesaApiService.userDetails()?.first_name} ${
          this._authDavesaApiService.userDetails()?.last_name
        }`,
      },
      submitStatus: this.esourceData.esourceForm?.status,
    };
  }
}
