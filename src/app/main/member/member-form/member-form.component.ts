import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MembersService } from "app/api";
import { environment } from "environments/environment";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { FlatpickrOptions } from "ng2-flatpickr";
import { DatePipe } from "@angular/common";

@Component({
  selector: "app-member-form",
  templateUrl: "./member-form.component.html",
  styleUrls: ["./member-form.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class MemberFormComponent implements OnInit {
  public contentHeader: object;
  public personalInfo: any = {
    firstName: null,
    lastName: null,
    middleName: null,
    suffixName: null,
    region: null,
    age: null,
    street: null,
    zipCode: null,
    gender: null,
    province: null,
    barangay: null,
    city: null,
    birthDate: null,
    educationalAttainment: null,
    civilStatus: null,
    phoneNumber: null,
  };
  private unsubscribeAll: Subject<any>;
  public customDateOptions: FlatpickrOptions = {
    altFormat: "Y-m-d",
    altInput: true,
    maxDate: "today",
    // defaultDate: "2000-03-26"
  };
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
    this.customDateOptions.defaultDate = "2001-05-01";
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
    if (data.breadcrumb !== "New") {
      const memberId = this.activatedRoute.snapshot.params["id"];
      this.getMemberById();
      console.log("Member ID");
    }
  }

  addMembers() {
    const value = this.personalInfoForm.value;

    if (this.personalInfoForm.invalid) {
      console.log("Form is invalid.");
      return;
    }
    console.log("Value: ", value);
    this.memberService
      .apiVversionMembersCreateMemberPost(
        environment.apiVersion,
        this.personalInfoForm.value
      )
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((response) => {
        console.log("Response", response);
        // this.router.navigate(["/members"]);
      });
  }
  getMemberById() {
   const memberData=this.activatedRoute.snapshot.data
   ?this.activatedRoute.snapshot.data.MemberDetails.data
   :null
   this.personalInfo=memberData
   this.personalInfo.birthDate=this.personalInfo.birthDate.split('T')[0]
   this.customDateOptions.defaultDate=new Date(this.personalInfo.birthDate)
  //  console.log(this.activatedRoute.snapshot.data.MemberDetails.data)
  }
  calculateAge(birthDate: Date): number {
    const today = new Date();
    const birthDateParsed = new Date(birthDate);
    let age = today.getFullYear() - birthDateParsed.getFullYear();

    const monthDiff = today.getMonth() - birthDateParsed.getMonth();
    const dayDiff = today.getDate() - birthDateParsed.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }

    return age;
  }
  onChangeBirthDate(event) {
    this.personalInfo.birthDate =
      this.datePipe.transform(event.target.value, "yyyy-MM-dd") +
      "T00:00:00.000Z";
    this.personalInfo.birthDate = Array.isArray(this.personalInfo.birthDate)
      ? this.personalInfo.birthDate[0]
      : this.personalInfo.birthDate;
    this.personalInfo.age = this.calculateAge(event.target.value);
  }
}
