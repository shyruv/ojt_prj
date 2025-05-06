import { Component, OnInit, ViewChild, AfterViewInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subject } from "rxjs";
import { DatePipe } from "@angular/common";
import { ChangeDetectorRef } from "@angular/core";
import Stepper from "bs-stepper";
import { ToastrService } from "ngx-toastr"; 
import { PersonalInfoComponent } from "./personal-info/personal-info.component";
import { DateTimeComponent } from "../date-time/date-time.component";
import { MeetingRoomComponent } from "../meeting-room/meeting-room.component";
import { ReviewComponent } from "../review/review.component";

@Component({
  selector: "app-member-form",
  templateUrl: "./member-form.component.html",
  styleUrls: ["./member-form.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class MemberFormComponent implements OnInit, AfterViewInit {
  public contentHeader: object;
  private unsubscribeAll: Subject<any>;
  private horizontalWizardStepper: Stepper;
  public activeStep: number = 1;

  @ViewChild("personalInfo") personalInfoComponent!: PersonalInfoComponent;
  @ViewChild("dateTime") dateTimeComponent!: DateTimeComponent;
  @ViewChild("meetingRoom") meetingRoomComponent!: MeetingRoomComponent;
  @ViewChild("review") ReviewComponentomponent!: ReviewComponent;
  
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private datePipe: DatePipe,
    private cdRef: ChangeDetectorRef,
    private toastr: ToastrService  // Inject Toastr service
  ) {
    this.unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    const data = this.activatedRoute.snapshot.data;
    this.contentHeader = {
      headerTitle: data.title,
      actionButton: false,
      breadcrumb: {
        type: "",
        links: [
          {
            name: "Meeting",
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

    this.horizontalWizardStepper = new Stepper(document.querySelector("#stepper1"), {
      linear: false,
      animation: true,
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.cdRef.detectChanges();
    });
  }

  nextStep() {
    this.horizontalWizardStepper.next();
    this.activeStep++;
  }

  prevStep() {
    this.horizontalWizardStepper.previous();
    this.activeStep--;
  }

  // goTo(stepNumber: nr) {
  //   this.horizontalWizardStepper.to(stepNumber);
  //   this.activeStep = stepNumber; 
  //    goTo(stepNumber: nr) {}
  // }


  validateAndNext() {
    setTimeout(() => {
      this.cdRef.detectChanges();

      if (this.activeStep === 1 && this.personalInfoComponent.validateFields()) {
        this.personalInfoComponent.getMeetingData()
        this.nextStep();
      } else if (this.activeStep === 2 && this.dateTimeComponent.validateFields()) {
        this.dateTimeComponent.getDateAndTimeData()
        this.nextStep();
      
      } else if (this.activeStep === 3 && this.meetingRoomComponent.validateFields()) {
        this.meetingRoomComponent.getMeetingRoomData()
        this.nextStep();    
      }
    }, 0);
  }

  onSubmit() {
    
    this.toastr.success("Request submitted successfully!", "Success", {
      timeOut: 2000,
      positionClass: "toast-bottom-center",
      toastClass: "toast ngx-toastr",
    });

    
    setTimeout(() => {
      this.router.navigate(["/members"]);
    }, 3000);
  }
}