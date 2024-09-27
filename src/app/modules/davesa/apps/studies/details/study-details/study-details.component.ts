import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { ChangeDetectionStrategy, Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FilterParams } from 'app/core/types/filter-params.type';
import { Study } from 'app/core/interfaces/study.interface';
import { StudyContacts } from '../../studies.types';
import { StudiesService } from '../../studies.service';
import { HelperService } from 'app/core/services/helper-service/helper.service';
import { Page } from 'app/core/interfaces/page.model';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { AsyncPipe } from '@angular/common';
import { GridComponent, GridModule, TextWrapSettingsModel, ToolbarItems } from '@syncfusion/ej2-angular-grids';


@Component({
  selector: "study-details",
  templateUrl: "./study-details.component.html",
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    AsyncPipe,
    GridModule
  ]
})
export class StudyDetailsComponent implements OnInit {
  @Input() oid: string;
  @Input("study") study?: Study;
  private _study: BehaviorSubject<Study | null> = new BehaviorSubject(
    null
  );
  get study$(): Observable<Study> {
    return this._study.asObservable();
}

  private _contacts: BehaviorSubject<StudyContacts[] | null> = new BehaviorSubject(
    null
  );
  get contacts$(): Observable<StudyContacts[]> {
    return this._contacts.asObservable();
}

  @ViewChild('itemdGrid') public itemdGrid: GridComponent;
  public filters = { status: 'All', condition: 'All', other: 'All' };
  public pageSettings?: Object;
  public wrapSettings: TextWrapSettingsModel;
  public toolbar: ToolbarItems[] = ['Search'];
  public sortOptions: object;
  viewDoa: boolean = false;
  viewContacts: boolean = false;
  viewTeam: boolean = false;



  panel: string = "Study Details";
  studySub: Subscription;
  studyDetails: Study;
  page = new Page();
  filterParams: FilterParams = {
    offset: 0,
    limit: 10,
    sort_field: "created_at",
    sort_direction: "D",
    query: "",
    study_oid: "",
  };

  studyContacts: StudyContacts[] = [];
  constructor(
    private _studiesService: StudiesService,
    private _helperService: HelperService,
    private router: Router
  ) {
    this.page.size = 10;
    this.page.offset = 0;
  }

  ngOnInit(): void {
    this.pageSettings = { pageSizes: ['5', '10','15','20', 'All'], };
    this.getStudy();
    this.getStudyContacts();
  }

  getStudy() {
    this._studiesService.getById(this.oid).subscribe((res: any) => {
      this._study.next(res.data);
    });
  }

  /*study contact list */
  getStudyContacts() {
    this.filterParams.study_oid = this.oid;
    this._studiesService.getStudyContacts(this.filterParams).subscribe((res: any) => {
      if (res) {
        this.studyContacts = res["data"];
        this.studyContacts.filter((element) => {
          element["category"] = element?.entity_datum?.name;
        });
        this.page.totalElements = res.unfilter_count;

        this._contacts.next(this.studyContacts)
      }
    });
  }

  // updateFilterParamsData(data: FilterParams) {
  //   this.filterParams = data;
  //   this.getAllStudyContacts();
  // }

  // openPdf(url){
  //   fileViewerFunction.fileViewer(url,this.router);
  // }

  trackByFn(index: number, item: any): any {
    return item.id || index;
}

}
