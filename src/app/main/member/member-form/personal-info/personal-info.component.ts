import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MembersService } from 'app/api';
import { environment } from 'environments/environment';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PersonalInfoComponent implements OnInit {
  public personalInfo: any = {
    manager: '',
    employeeName: '',
    employeeNamesList: [],
    department: '',
    purpose: null,
    localNumber: null,
    attendees: null
  };

  public showEmployeeList: boolean = false;
  public validationErrors: any = {};

  private unsubscribeAll: Subject<any>;

  @ViewChild("personalInfoForm") personalInfoForm: NgForm;

  constructor(
    private memberService: MembersService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.data.breadcrumb !== "New") {
      this.getMemberById();
    }
  }

  addEmployeeName() {
    if (this.personalInfo.employeeName.trim() !== '') {
      this.personalInfo.employeeNamesList.push(this.personalInfo.employeeName);
      this.personalInfo.employeeName = '';
    }
  }

  removeEmployeeName(index: number) {
    this.personalInfo.employeeNamesList.splice(index, 1);
  }

  toggleEmployeeList() {
    this.showEmployeeList = !this.showEmployeeList;
  }

  validateFields(): boolean {
    this.validationErrors = {};
    let isValid = true;

    // Check required fields
    ["manager", "department", "purpose", "localNumber", "attendees"].forEach(field => {
      if (!this.personalInfo[field]) {
        this.validationErrors[field] = true;
        isValid = false;
      }
    });

    return isValid;
  }

  addMembers() {
    if (this.personalInfoForm.invalid) {
      console.log("Form is invalid.");
      return;
    }

    console.log("Submitted Data:", this.personalInfoForm.value);

    // this.memberService
    //   .apiVversionMembersCreateMemberPost(environment.apiVersion, this.personalInfoForm.value)
    //   .pipe(takeUntil(this.unsubscribeAll))
    //   .subscribe((response) => {
    //     console.log("Response", response);
    //   });
  }

  getMemberById() {
    const memberData = this.activatedRoute.snapshot.data?.MemberDetails?.data || null;
    if (memberData) {
      this.personalInfo = memberData;
    }
  }
}
