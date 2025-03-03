import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MembersService } from "app/api";
import { environment } from "environments/environment";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { FlatpickrOptions } from "ng2-flatpickr";
import { DatePipe } from "@angular/common";
import Stepper from 'bs-stepper';

@Component({
  selector: "app-member-form",
  templateUrl: "./member-form.component.html",
  styleUrls: ["./member-form.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class MemberFormComponent implements OnInit {
  public contentHeader: object;
  
  private unsubscribeAll: Subject<any>;
  
  private horizontalWizardStepper: Stepper;
  private bsStepper;

  @ViewChild("personalInfoForm") personalInfoForm: NgForm;
  constructor(
    private memberService: MembersService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private datePipe: DatePipe
  ) {
    this.unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    const data = this.activatedRoute.snapshot.data;
    console.log("Activated route", data);
    this.contentHeader = {
      headerTitle: data.title,
      actionButton: false,
      breadcrumb: {
        type: "",
        links: [
          {
            name: "Members",
            isLink: true,
            link: "/members/",
          },

          {
            name: data.breadcrumb,
            isLink: false,
          },
        ],
      },
    };
    

    this.horizontalWizardStepper = new Stepper(document.querySelector('#stepper1'), {});
    console.log("HS: ", this.horizontalWizardStepper);

    this.bsStepper = document.querySelectorAll('.bs-stepper');
  }

  goTo(stepNumber){
    this.horizontalWizardStepper.to(stepNumber);
  }

  
}
