import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CoreConfigService } from '@core/services/config.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { IdentityService } from 'app/api/sidc-services/identity';
//import { IdentityService } from 'app/api';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ForgotPasswordComponent implements OnInit {

  // Public
  public emailVar;
  public coreConfig: any;
  public forgotPasswordForm: FormGroup;
  public submitted = false;

  @BlockUI() blockUI: NgBlockUI;

  // Private
  private unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {CoreConfigService} coreConfigService
   * @param {FormBuilder} formBuilder
   *
   */
  constructor(
    private coreConfigService: CoreConfigService,
    private formBuilder: FormBuilder,
    // private identityService: IdentityService,
    private toastr: ToastrService,
    private router: Router
    ) {
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
        enableLocalStorage: true
      }
    };
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.forgotPasswordForm.controls;
  }

  /**
   * On Submit
   */
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.forgotPasswordForm.invalid) {
      return;
    }

    this.blockUI.start();

    const { username } = this.forgotPasswordForm.getRawValue();
    const isEmailAddress = username.indexOf("@") > 0 ? true: false;

    // this.identityService.apiIdentityForgotPasswordPost({username, isEmailAddress}).pipe(takeUntil(this.unsubscribeAll)).subscribe(response => {
      this.blockUI.stop();
    //   const device = isEmailAddress ? 'email' : 'phone';
    //   this.toastr.success('', "OTP was sent to your " + device + '.', {
    //     timeOut: 3000,
    //     positionClass: 'toast-bottom-center',
    //     toastClass: 'toast ngx-toastr',
    //   });
    //   this.router.navigate(['/auth/reset-password'], { queryParams: { username } });
    // }, (httpError: HttpErrorResponse) => {
    //   this.blockUI.stop();
    //   this.toastr.error('', httpError.error.Message, {
    //     timeOut: 3000,
    //     positionClass: 'toast-bottom-center',
    //     toastClass: 'toast ngx-toastr',
    //   });
    // });
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this.forgotPasswordForm = this.formBuilder.group({
      username: ['', [Validators.required]]
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
