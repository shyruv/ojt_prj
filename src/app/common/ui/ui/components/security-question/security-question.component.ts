import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminService, SecurityQuestionCommand } from 'app/api';
import { environment } from 'environments/environment';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-security-question',
  templateUrl: './security-question.component.html',
  styleUrls: ['./security-question.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SecurityQuestionComponent implements OnInit {

  @Input() data: {codeNumber: null};
  @BlockUI() blockUI: NgBlockUI;
  public submitted = false;
  private unsubscribeAll: Subject<any>;
  public securityQuestions: any[] = [];
  
  constructor(
    public activeModal: NgbActiveModal,
    private toastr: ToastrService,
    private adminService: AdminService
  ) { 
    this.unsubscribeAll = new Subject(); 
  }

  ngOnInit(): void {
    this.adminService.apiVversionMembershipAdminSecurityQuestionGet(environment.apiVersion, this.data.codeNumber).pipe(takeUntil(this.unsubscribeAll)).subscribe(response => {
      this.securityQuestions = response.data.map(d => {
        const questionId = d.id;
        d.questionAnswer = "";
        d.passwordType = true;
        return {...d, questionId}
      });

    
   if(this.securityQuestions.length == 0)   
        this.onSubmit();
      // this.securityQuestions = response.data.filter(d => d.key !== "SpouseName").map(r => {
      //   r.questionId = r.id;
      //   r.questionAnswer = null;
      //   return r;
      // });
    }, (httpError: HttpErrorResponse) => {
      this.blockUI.stop();
      this.toastr.error('', httpError.error.Message, {
        timeOut: 3000,
        positionClass: 'toast-bottom-center',
        toastClass: 'toast ngx-toastr',
      });
     
    })

  }

  togglePasswordTextType(row) {
    this.securityQuestions.find(q => q.questionId === row.questionId).passwordType = !row.passwordType;
  }

  closeModal() {
    this.activeModal.dismiss({success: false});
  }

  /**
   * On Submit
   */
   onSubmit() {
     const answer: SecurityQuestionCommand = {
      question: this.securityQuestions,
      codeNumber: this.data.codeNumber
    };

    this.adminService.apiVversionMembershipAdminSecurityQuestionPost(environment.apiVersion, answer).pipe(takeUntil(this.unsubscribeAll)).subscribe(response => {
    
      this.activeModal.close({success: true});
    }, (httpError: HttpErrorResponse) => {
      this.blockUI.stop();
      // this.activeModal.dismiss({success: false});
      this.toastr.error('', httpError.error.Message, {
        timeOut: 3000,
        positionClass: 'toast-bottom-center',
        toastClass: 'toast ngx-toastr',
      });
     
    })
   }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

}
