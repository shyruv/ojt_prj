import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CoreConfigService } from '@core/services/config.service';
// import { IdentityService } from 'app/api/sidc-services/identity';
import { MustMatchValidator } from 'app/common/ui/ui/validators/mustmatch.validator';
import { PasswordValidator } from 'app/common/ui/ui/validators/password.validator';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ResetPasswordComponent implements OnInit {

  // Public
  public coreConfig: any;
  public passwordTextType: boolean;
  public passwordConfirmTextType: boolean;
  public resetPasswordForm: FormGroup;
  public submitted = false;

  @BlockUI() blockUI: NgBlockUI;

  // Private
  private unsubscribeAll: Subject<any>;
  private username;

  constructor(
    private coreConfigService: CoreConfigService, 
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    // private identityService: IdentityService
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
        enableLocalStorage: false
      }
    };
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.resetPasswordForm.controls;
  }

  /**
   * Toggle password
   */
  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }

  toggleConfirmPasswordTextType() {
    this.passwordConfirmTextType = !this.passwordConfirmTextType;
  }

  /**
   * On Submit
   */
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.resetPasswordForm.invalid) {
      return;
    }

    this.blockUI.start();

    // // this.identityService.apiIdentityResetPasswordPost({username: this.username, ...this.resetPasswordForm.getRawValue()}).pipe(takeUntil(this.unsubscribeAll)).subscribe(response => {
      this.blockUI.stop();
    //   this.toastr.success('', 'Password has been changed.', {
    //     timeOut: 3000,
    //     positionClass: 'toast-bottom-center',
    //     toastClass: 'toast ngx-toastr',
    //   });
    //   this.router.navigate(["/"]);
    // }, (httpError: HttpErrorResponse) => {

    //   this.blockUI.stop();
    //   this.toastr.error('', httpError.error.Message, {
    //     timeOut: 3000,
    //     positionClass: 'toast-bottom-center',
    //     toastClass: 'toast ngx-toastr',
    //   });
     
    // });
    
  }

  /**
   * On init
   */
   ngOnInit(): void {
    this.activatedRoute.queryParamMap
      .subscribe((params) => {
        this.username = params['params'].username
      }
    );
   
    this.resetPasswordForm = this.formBuilder.group({
      code: [null, Validators.required],
      password: [
        '',
        [
          Validators.required,
          PasswordValidator.strong
        ]
      ],
      confirmPassword: [null, Validators.required],
    }, {
      validator: [MustMatchValidator('password', 'confirmPassword')]
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
