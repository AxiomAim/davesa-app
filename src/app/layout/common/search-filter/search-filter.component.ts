import { ChangeDetectionStrategy, Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Output, EventEmitter, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldControl, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { SiteAccount } from 'app/core/interfaces/site-account.interface';
import { SiteAccountV2Service } from 'app/core/services/site-account-v2.service';
import { BroadcasterV1Service } from 'app/core/services/broadcaster-v1.service';
import { FilterParams } from 'app/core/types/filter-params.type';
import { NgFor, NgIf } from '@angular/common';
import { AuthDavesaApiService } from 'app/core/auth-davesa/auth-davesa-api.service';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'search-filter',
  templateUrl: './search-filter.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatIconModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatLabel,
    NgIf,    
    NgFor,
    MatInputModule
  ],

})
export class SearchFilterComponent implements OnInit {
  _broadcasterService = inject(BroadcasterV1Service);
  _siteAccountV2Service = inject(SiteAccountV2Service);
  _authDavesaApiService = inject(AuthDavesaApiService);

  searchControl = new FormControl();
  siteControl = new FormControl();
  @Input() label: string;
  @Input() placeholder: string;
  @Input() isSiteFilter: boolean;
  @Input() componentName:string;
  @Output() searchData = new EventEmitter<string>();
  @Output() changeSite = new EventEmitter<number>();
  isUserLoggedAsAdmin: boolean = false;
  siteAccounts: SiteAccount[] = [];
  selected: number;
  isAdmin: boolean = false;
  isFirstTimeCall:boolean=false;

  constructor(
  ) {}

  ngOnInit(): void {
    this.searchControl.valueChanges.pipe(distinctUntilChanged(), debounceTime(800)).subscribe((res) => {
      if(this.componentName){
        if(!this.isFirstTimeCall){
          this.searchData.emit(res);
        }else{
          this.isFirstTimeCall=false;
        }
      }else{
        this.searchData.emit(res);
      }
     
    });
    if(this.componentName){
       // get filters from local storage;
       let storedFilters = this._broadcasterService.getTableFilters(
        this.componentName
      );
      if (storedFilters) {
        this.isFirstTimeCall=true;
        this.siteControl.setValue(storedFilters.site_account_id);
        this.searchControl.setValue(storedFilters.query);
      }
    }
    this.getSiteFilter();
  }

  getSiteFilter() {
    try {
      this._authDavesaApiService.getAuthUserAccessInfo().subscribe((res) => {
        // if user is admin or sitemanger then they get site filter
        if (res != null) {
          this.isAdmin = true;
          if (this.isSiteFilter && this.isAdmin) {
            this.isUserLoggedAsAdmin = true;
            this.getSiteList();
          }
        }
      });  
    } catch(err) {
      console.error(err);
    }
  }

  changeSiteAccount(data: number) {
    this.changeSite.emit(data);
  }

  getSiteList() {
    const params: FilterParams = {
      offset: 0,
      limit: 0,
      sort_field: '',
      sort_direction: '',
      query: '',
    };
    this._siteAccountV2Service.getAll(params).subscribe((res) => {
      this.siteAccounts = res.data;
    });
  }
}
