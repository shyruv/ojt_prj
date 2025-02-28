import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ColumnMode, SelectionType } from "@swimlane/ngx-datatable";
import { MembersService } from "app/api";
import { environment } from "environments/environment";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "app-member",
  templateUrl: "./member.component.html",
  styleUrls: ["./member.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class MemberComponent implements OnInit {
  public ColumnMode = ColumnMode;
  public SelectionType = SelectionType;
  public contentHeader: object;
  public page: any = {
    totalPages: 0,
    totalCount: 0,
    size: 10,
    pageNumber: 0,
    search: null,
  };
  public rows: any[] = [];
  private unsubscribeAll: Subject<any>;

  constructor(private memberService: MembersService) {
    this.unsubscribeAll = new Subject();
  }
  setPage(event) {
    this.memberService
      .apiVversionMembersMembersListGet(
        environment.apiVersion,
        this.page.search,
        this.page.pageNumber,
        this.page.size
      )
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((response) => {
        console.log("Response", response);
        this.rows = response.data;
        this.page.totalPages = response.totalPages;
        this.page.totalCount = response.totalCount;
      });
  }

  ngOnInit(): void {
    this.contentHeader = {
      headerTitle: "Members",
      actionButton: false,
      breadcrumb: {
        type: "",
        links: [
          {
            name: "Members",
            isLink: false,
          },
        ],
      },
    };
    this.setPage({ offSet: 0 });
  }
}
