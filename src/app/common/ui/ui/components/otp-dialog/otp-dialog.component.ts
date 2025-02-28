import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApplicantService } from 'app/api';
import { environment } from 'environments/environment';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
import { Subject, Subscription, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-otp-dialog',
  templateUrl: './otp-dialog.component.html',
  styleUrls: ['./otp-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OtpDialogComponent implements OnInit {

  @Input() data: {contactNumber: "", emailAddress: ""};
  @Input() otpSend = true;
  @BlockUI() blockUI: NgBlockUI;
  public otpForm: FormGroup;
  public submitted = false;
  public destination = {isEmailAddress: false, owner: '',secondaryOwner:'', masked: ''};
  public otpResendCountdown = 0;
  public otpResendCountdownSubs: Subscription;

  // Private
  private _unsubscribeAll: Subject<any>;
  
  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private applicantService: ApplicantService
  ) { 
    this._unsubscribeAll = new Subject();
  }

  closeModal() {
    this.activeModal.dismiss({otpVerified: false})
  }

  /**
   * On Submit
   */
   onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.otpForm.invalid) {
      return;
    }
    
    const otpForm = this.otpForm.getRawValue();
    const code = `${otpForm.otp1}${otpForm.otp2}${otpForm.otp3}${otpForm.otp4}${otpForm.otp5}${otpForm.otp6}`;
    const owner = this.destination.owner;

    this.blockUI.start();
    this.applicantService.apiVversionMembershipApplicantVerifyOtpPost(environment.apiVersion, {code, owner}).pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
      this.activeModal.close({otpVerified: true});
      this.blockUI.stop();
    }, (httpError: HttpErrorResponse) => {
      this.blockUI.stop();
      this.toastr.error('', httpError.error.Message, {
        timeOut: 3000,
        positionClass: 'toast-bottom-center',
        toastClass: 'toast ngx-toastr',
      });
    });
    
  }

  get f() {
    return this.otpForm.controls;
  }


  /**
   * On init
   */
   ngOnInit(): void {

    if (this.data) {
      if (this.data.contactNumber !== "" && this.data.contactNumber !== null && this.data.emailAddress !== "" && this.data.emailAddress !== null) {
        this.destination['isEmailAddress'] = false;
        this.destination['owner'] = this.data.contactNumber;
        this.destination['secondaryOwner'] = this.data.emailAddress;
        const email = this.destination['secondaryOwner'].split("@");
        this.destination['masked'] = `${email[0].slice(0,3)}******@${email[1]}` + " or *****" + this.destination['owner'].slice(this.destination['owner'].length - 4);
      }
      else if (this.data.contactNumber !== "" && this.data.contactNumber !== null) {
        this.destination['isEmailAddress'] = false;
        this.destination['owner'] = this.data.contactNumber;
        this.destination['masked'] = "*****" + this.destination['owner'].slice(this.destination['owner'].length - 4);
        this.destination['secondaryOwner'] = null;
      }
       else if (this.data.emailAddress !== "" && this.data.emailAddress !== null) {
        this.destination['isEmailAddress'] = true;;
        this.destination['owner'] = this.data.emailAddress
        const email = this.destination['owner'].split("@");
        this.destination['masked'] = `${email[0].slice(0,3)}******@${email[1]}`;
        this.destination['secondaryOwner'] = null;
      } else {
        this.destination['isEmailAddress'] = null;
        this.destination['owner'] = null;
        this.destination['masked'] = null;
        this.destination['secondaryOwner'] = null;
      }

      if (this.otpSend) this.sendOtp();
    }

    this.otpForm = this.formBuilder.group({
      otp1: [null, Validators.required],
      otp2: [null, Validators.required],
      otp3: [null, Validators.required],
      otp4: [null, Validators.required],
      otp5: [null, Validators.required],
      otp6: [null, Validators.required]
    });
  }

  setTimer() {
    this.otpResendCountdownSubs = timer(0, 1000).subscribe(() => {
      --this.otpResendCountdown;
      if (this.otpResendCountdown === 0) {
        this.otpResendCountdownSubs.unsubscribe();
      }
    });
  }

  sendOtp() {
    console.log("sendOtp...");
    this.blockUI.start();
    this.otpResendCountdown = 120; // 2 minutes interval before resending otp
    this.applicantService.apiVversionMembershipApplicantGenerateOtpPost(environment.apiVersion, this.destination).pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
      this.blockUI.stop();
      this.setTimer();
    }, (httpError: HttpErrorResponse) => {
      this.blockUI.stop();
          this.toastr.error('', httpError.error.Message, {
            timeOut: 3000,
            positionClass: 'toast-bottom-center',
            toastClass: 'toast ngx-toastr',
          });
    });
  }  

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  onDigitInput(event){

    let element;
    if (isFinite(event.key))
         element = event.srcElement.nextElementSibling;
 
     if (event.code === 'Backspace')
         element = event.srcElement.previousElementSibling;
 
     if(element == null)
         return;
     else
         element.focus();
 }

}
