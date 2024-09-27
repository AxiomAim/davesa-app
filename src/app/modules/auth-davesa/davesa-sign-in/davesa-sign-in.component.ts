import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation, NgZone, inject } from '@angular/core';
import {
  FormControl,
    FormsModule,
    NgForm,
    ReactiveFormsModule,
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { davesaAnimations } from '@davesa/animations';
import { DavesaAlertComponent, DavesaAlertType } from '@davesa/components/alert';
import { DomainEnum } from "app/core/enum/domain.enum";
import { MatSelectModule } from '@angular/material/select';
import { TitleCasePipe } from '@angular/common';
import { GetOne } from 'app/core/interfaces/generics/getOne.interface';
import { User } from 'app/core/interfaces/user.interface';
import { GoogleAuth } from 'app/core/interfaces/google-auth.interface';
import { GoogleUserProfile } from 'app/core/interfaces/google-user-profile.interface';
import { AuthDavesaApiService } from 'app/core/auth-davesa/auth-davesa-api.service';

@Component({
    selector: 'auth-davesa-sign-in',
    templateUrl: './davesa-sign-in.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: davesaAnimations,
    standalone: true,
    imports: [
        RouterLink,
        DavesaAlertComponent,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        MatProgressSpinnerModule,
        MatSelectModule,
        TitleCasePipe,
    ],
})
export class AuthDavesaSignInComponent implements OnInit {
  private _authDavesaApiService = inject(AuthDavesaApiService);

    @ViewChild('signInNgForm') signInNgForm: NgForm;
    public title = "AuthDavesaSignInComponent";
    alert: { type: DavesaAlertType; message: string } = {
        type: 'success',
        message: '',
    };
    signInForm: UntypedFormGroup;
    showAlert: boolean = false;


    public domain = new FormControl('rdr.davesa.com');
  
    public isDomainControl: boolean = false;
    isVisible: boolean = false;
    @ViewChild("loginRef", { static: true }) loginElement!: ElementRef;
    auth2: any;
    userRoleList: any[] = [];
  
    //google auth variables
    selectedGroup: any[] = [];
    links;
    authorizationCode: string;
    oAuthToken: string;
    oAuthVerifier: string;
    studyOId: string;
    studyMails: any[];
    windowObjectReference = null;
    previousUrl = null;
    // popup related
    private windowHandle: Window; // reference to the window object we will create
    private intervalId: any = null; // For setting interval time between we check for authorization code or token
    private loopCount = 600; // the count until which the check will be done, or after window be closed automatically.
    private intervalLength = 100;
  
    /**
     * Constructor
     */
    constructor(
        private _formBuilder: UntypedFormBuilder,
        private _router: Router,
        private ngZone: NgZone
    ) {

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Create the form
        this.signInForm = this._formBuilder.group({
        username: ['tom@davesa.com', [Validators.required, Validators.minLength(3)]],
        password: ['DAV#s3cu!21', [Validators.required, Validators.minLength(6)]],
        role_id: [null],
        });
        const token = this._authDavesaApiService.token();
        if (token) {
          this._router.navigateByUrl("/");
        }    
        this.getSubDomainName();      
    }

    public onSubmit(values: Object): void {
      this.showAlert = false;    
      if (this.signInForm.valid) {
        // for app subdomain we called org-user login api
        if (this.domain.value.includes(DomainEnum.APP)) {
          let credentials = {
            username: this.signInForm.value.username,
            password: this.signInForm.value.password,
            type: "normal",
          };
          this.orgSignIn(credentials)
        } else {
          let credentials = {
            username: this.signInForm.value.username,
            password: this.signInForm.value.password,
            role_id: this.signInForm.value.role_id,
            type: "normal",
          };
          if (credentials.role_id === null) {
            this._authDavesaApiService.getUserDetails(this.signInForm.value.username).subscribe(
              {
                next: (res: GetOne<User>) => {
                    if(res) {
                      this.userRoleList = res.data.user_roles;
                      if (res.data.user_roles && res.data.user_roles.length == 1) {
                        this.signInForm.controls["role_id"].setValue(
                          res.data.user_roles[0].role_id
                        );
                        credentials.role_id = res.data.user_roles[0].role_id;
                      }
                      if (res.data.user_roles.length > 1)
                        this.signInForm.controls["role_id"].setValidators([
                          Validators.required,
                        ]);
                    }
                  },
                error: (err) => {
                  this.alert = {
                    type: 'error',
                    message: JSON.stringify(err.error.error),
                  };
                  console.log('error', this.alert)

                  // Show the alert
                  // this.showAlert = true;
                },
              }
            );      
          } else if (this.userRoleList && this.userRoleList.length > 0) {
            console.log('signIn')
            this.signIn(credentials);      
          } else {
            console.log('userNameChange:signIn')
            this.userNameChange();
            this.signIn(credentials);
          }
        }
      }

    }
    
    signIn(credentials: any) {
      this.showAlert = false;
      this._authDavesaApiService.signIn(credentials).subscribe(
        {
          next: (res: any) => {
            // if(res) {
            //   this.setUser();
            // }
            if (res.data.user_role && res.data.user_role.name === 'Admin') {
              this.setUser();
            } else {
              this._router.navigate(['/']);
            }
          },
          error: (err) => {
            this.alert = {
              type: 'error',
              message: JSON.stringify(err.error.error),
            };
            console.log('error', this.alert)
            // Show the alert
            // this.showAlert = true;
          },
        }
      );
    }

    setUser() {
      this._authDavesaApiService.getUserById().subscribe(   
        {
          next: (res: any) => {
            if(res) {
              this._router.navigateByUrl("/");
            }
          },
          error: (err) => {
            this.alert = {
              type: 'error',
              message: JSON.stringify(err.error.error),
            };
            console.log('error', this.alert)
            // Show the alert
            // this.showAlert = true;
          },
        }
      );

    }
    orgSignIn(credentials: any) {
      this.showAlert = false;
      this._authDavesaApiService.orgSignIn(credentials).subscribe(
        {
          next: (res: any) => {
            if(res) {
              this._router.navigateByUrl("/");
            }
            if (res.data.user_role && res.data.user_role.name === 'Admin') {
              this._router.navigateByUrl("/");
            } else {
              this._router.navigate(['/dashboard']);
            }
          },
          error: (err) => {
            this.alert = {
              type: 'error',
              message: JSON.stringify(err.error.error),
            };
            console.log('error', this.alert)

            // Show the alert
            // this.showAlert = true;
          },
        }
      );
    }
      
    orgDomainChange() {
      this.showAlert = false;
      console.log('domain', this.domain.value)
      this._authDavesaApiService.getOrgDomain(this.domain.value).subscribe(
        {
          next: (res: any) => {
            // console.log('next', res)
            // if (res) {
            // }
        },
          error: (err) => {
            this.alert = {
              type: 'error',
              message: JSON.stringify(err.error.error),
            };
            console.log('error', this.alert)

            // Show the alert
            // this.showAlert = true;
          },
        }
      );
    }

    userNameChange() {
      this.showAlert = false;
      if (!this.domain.value?.includes(DomainEnum.APP)) {        
        this._authDavesaApiService.getUserDetails(this.signInForm.value.username).subscribe(
          {
            next: (res: GetOne<User>) => {
              console.log('getOrgDomain', res)
              if (res) {
                this.userRoleList = res.data.user_roles;
                if (res.data.user_roles && res.data.user_roles.length == 1) {
                  this.signInForm.controls["role_id"].setValue(
                    res.data.user_roles[0].role_id
                  );
                }
                if (res.data.user_roles.length > 1)
                  this.signInForm.controls["role_id"].setValidators([
                    Validators.required,
                  ]);
                }
          },
            error: (err) => {
              this.alert = {
                type: 'error',
                message: JSON.stringify(err.error.error),
              };
              console.log('error', this.alert)

              // Show the alert
              // this.showAlert = true;
            },
          }
        );
      }
    }
    
        
    getSubDomainName() {
      const { hostname } = new URL(window.location.href);
      if (hostname.includes(DomainEnum.LOCALHOST)) {
        this.isDomainControl = true;
        this.orgDomainChange();
      } else {
        this.domain.setValue(hostname);     
        this._authDavesaApiService.setOrgDomain(hostname)   
      }
    }
  

    doAuthorization(url: string) {
      let loopCount = this.loopCount;
      this.windowHandle = this.createOauthWindow(url, "OAuth login");
  
      /* Now start the timer for which the window will stay, and after time over window will be closed */
      this.intervalId = window.setInterval(() => {
        if (loopCount-- < 0) {
          window.clearInterval(this.intervalId);
          this.windowHandle.close();
        } else {
          let href: string; // For referencing window url
          try {
            href = this.windowHandle.location.href; // set window location to href string
          } catch (e) {
            // console.log('Error:', e); // Handle any errors here
          }
          if (href != null) {
            // Method for getting query parameters from query string
            const getQueryString = function (field: string, url: string) {
              const windowLocationUrl = url ? url : href;
              const reg = new RegExp("[?&]" + field + "=([^&#]*)", "i");
              const string = reg.exec(windowLocationUrl);
              return string ? string[1] : null;
            };
            if (href.match("code")) {
              window.clearInterval(this.intervalId);
              this.authorizationCode = getQueryString("code", href);
              this.windowHandle.close();
              console.log(
                "getQueryString('code', href)",
                decodeURIComponent(this.authorizationCode.replace(/\+/g, "%20"))
              );
              this._authDavesaApiService
                .getGoogleUserProfile({
                  code: decodeURIComponent(
                    this.authorizationCode.replace(/\+/g, "%20")
                  ),
                })
                .subscribe(
                  {
                    next: (res: GetOne<GoogleUserProfile>) => {
                      if (res) {
                        this.googleLogin(res.data);
                        console.log("res", res);
                      }
                  },
                    error: (err) => {
                      this.alert = {
                        type: 'error',
                        message: JSON.stringify(err.error.error),
                      };
                      console.log('error', this.alert)

                      // Show the alert
                      // this.showAlert = true;
                    },
                  });
                }
              }
            }
          }, this.intervalLength);
        }
      
      
    createOauthWindow(
      url: string,
      name = "Authorization",
      width = 500,
      height = 600,
      left = (screen.width - 500) / 2 ,
      top = (screen.height - 600) / 2,
    ) {
      if (url == null) {
        return null;
      }
      const options = `width=${width},height=${height},left=${left},top=${top}`;
      return window.open(url, name, options);
    }
    
    signInWithGoogle() {
      console.log("sign in ");
      this.googleAuth();
    }
    
    googleAuth() {
      this.showAlert = false;
      this._authDavesaApiService.googleAuthUrl().subscribe(
        {
          next: (res: GetOne<GoogleAuth>) =>{
            if (res) {
              this.doAuthorization(res.data.url);
            }
        },
          error: (err) => {
            this.alert = {
              type: 'error',
              message: JSON.stringify(err.error.error),
            };
            console.log('error', this.alert)

            // Show the alert
            // this.showAlert = true;
          },
        }
      );
    }
    
    googleLogin(user) {
      this.showAlert = false;

      if (this.domain.value.includes(DomainEnum.APP)) {
        const temp = {
          username: user.profile.emailAddress,
          googleToken: user.token.id_token,
          type: "google",
          token: user.token,
        };
        this.orgSignIn(temp);
      } else {
        this._authDavesaApiService.getUserDetails(user.profile.emailAddress).subscribe(                
          {
            next: (res: GetOne<User>) => {
              if (res) {
                if (res.data.user_roles.length > 1) {
                  const data = {
                    user_roles: res.data["user_roles"],
                    username: user.profile.emailAddress,
                    googleToken: user.token.id_token,
                    type: "google",
                    token: user.token,
                  };
                  this.ngZone.run(() => {
                    this._authDavesaApiService.setUserRole(data);
                    this._router.navigate(["/login/login-user-role"]);
                  });
                } else {
                  const role_id = res.data.user_roles[0].role_id;
                  const credentials = {
                    role_id: role_id,
                    username: user.profile.emailAddress,
                    googleToken: user.token.id_token,
                    type: "google",
                    token: user.token,
                  };
                  this.signIn(credentials);
                }
              }
            },
            error: (err) => {
              this.alert = {
                type: 'error',
                message: JSON.stringify(err.error.error),
              };
              console.log('error', this.alert)

              // Show the alert
              // this.showAlert = true;
            },
          });
       }
    }      
}