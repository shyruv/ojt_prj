import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { CoreConfigService } from '@core/services/config.service';
//import { IdentityService } from 'app/api';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { AuthService } from 'app/common/services/auth.service';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
// import { IdentityService } from 'app/api/sidc-services/identity';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  //  Public
  public coreConfig: any;
  public loginForm: FormGroup;
  public submitted = false;
  public passwordTextType: boolean;
  public loginFailed = false; // New variable to track failed login attempts

  // Hardcoded credentials (no backend)
  private readonly validUsers = [
    { username: 'member', password: 'Password123', role: 'member' },
    { username: 'admin', password: 'AdminPass123', role: 'admin' } // Hardcoded Admin Account
  ];

  // Private
  private unsubscribeAll: Subject<any>;

  @BlockUI() blockUI: NgBlockUI;

  /**
   * Constructor
   *
   * @param {CoreConfigService} coreConfigService
   * @param {FormBuilder} formBuilder
   */
  constructor(
    private coreConfigService: CoreConfigService,
    private formBuilder: FormBuilder,
    // private identityService: IdentityService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService) {
    this.unsubscribeAll = new Subject();

    // Configure the layout
    this.coreConfigService.config = {
      layout: {
        navbar: {
          hidden: true
        },
        menu: {
          hidden: true
        },
        footer: {
          hidden: true
        },
        customizer: false,
        enableLocalStorage: false
      }
    };
  }

  // Convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  /**
   * Toggle password visibility
   */
  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }

  /**
   * On Submit
   */
  onSubmit() {
    this.submitted = true;

    // If the form is invalid, stop execution
    if (this.loginForm.invalid) {
      return;
    }

    this.blockUI.start(); // Start UI blocking

    // Get entered values
    const enteredUsername = this.loginForm.value.username;
    const enteredPassword = this.loginForm.value.password;

    // Hardcoded authentication logic (no backend)
    const user = this.validUsers.find(u => u.username === enteredUsername && u.password === enteredPassword);

    if (user) {
      this.blockUI.stop();
      this.loginFailed = false;

      // Redirect based on user role
      if (user.role === 'admin') {
        this.router.navigate(["/members"]); // Admin Route
      } else {
        this.router.navigate(["/members"]); // Member Route
      }
    } else {
      this.blockUI.stop();
      this.loginFailed = true;

      this.toastr.error('', 'Invalid username or password', {
        timeOut: 3000,
        positionClass: 'toast-bottom-center',
        toastClass: 'toast ngx-toastr',
      });
    }

    /*
    // Uncomment this when using backend authentication
    this.identityService.apiIdentityTokenPost(this.loginForm.getRawValue()).pipe(takeUntil(this.unsubscribeAll)).subscribe(response => {
      this.blockUI.stop();
      const helper = new JwtHelperService();
      const tokenDetails = helper.decodeToken(response.data.jwToken);
      const fullName = tokenDetails.full_name;
      const firstName = tokenDetails.first_name;
      const lastName = tokenDetails.last_name;
      this.authService.user = {...response.data, fullName, firstName, lastName};
      localStorage.setItem("currentUser", JSON.stringify(this.authService.currentUserValue));
      localStorage.setItem("token", this.authService.currentUserValue.jwToken);
      
      if (this.authService.isAdmin) {
        this.router.navigate(["/admin/"]);
      } else {
        this.authService.redirectMember();
      }

      this.router.navigate(["/members"]);
    }, (httpError: HttpErrorResponse) => {
      this.blockUI.stop();
      this.toastr.error('', httpError.error.Message, {
        timeOut: 3000,
        positionClass: 'toast-bottom-center',
        toastClass: 'toast ngx-toastr',
      });
    });
    */
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        // You can access the previous URL here if needed
        const previousUrl = this.router.url;
        sessionStorage.setItem("previousUrl", previousUrl);
        console.log("previousUrl", previousUrl);
      }

      if (event instanceof NavigationEnd) {
        // Access the current URL after navigation is complete
        const currentUrl = this.router.url;
        sessionStorage.setItem("currentUrl", currentUrl);
        console.log("currentUrl", currentUrl);
      }
    });

    // Subscribe to config changes
    this.coreConfigService.config.pipe(takeUntil(this.unsubscribeAll)).subscribe(config => {
      this.coreConfig = config;
    });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
}
