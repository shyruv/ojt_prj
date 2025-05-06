import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ColumnMode, SelectionType } from "@swimlane/ngx-datatable";

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

  public rows: any[] = [];
  public allData: any[] = [];
  public page: any = {
    size: 10,
    pageNumber: 0,
    totalCount: 0,
    status: "",
    fromDate: "",
    toDate: "",
    search: ""
  };

  constructor() {}

  ngOnInit(): void {
    this.contentHeader = {
      headerTitle: "Employee",
      actionButton: false,
      breadcrumb: {
        type: "",
        links: [{ name: "Meeting", isLink: false }],
      },
    };

    this.allData = [
      {
        id: 1,
        purpose: "Partnership Discussion",
        date: "04/20/2025",
        "start-time": "10:00 AM",
        "end-time": "11:00 AM",
        "room-m": "VIP Lounge",
        status: "approved",
      },
      {
        id: 2,
        purpose: "Executive Briefing",
        date: "04/21/2025",
        "start-time": "2:00 PM",
        "end-time": "3:00 PM",
        "room-m": "Executive Boardroom",
        status: "pending",
      },
      {
        id: 3,
        purpose: "Technical Skills Training",
        date: "04/22/2025",
        "start-time": "9:00 AM",
        "end-time": "10:30 AM",
        "room-m": "Training Room",
        status: "rejected",
      },
      {
        id: 4,
        purpose: "Competitive Analysis",
        date: "04/23/2025",
        "start-time": "4:00 PM",
        "end-time": "4:30 PM",
        "room-m": "Strategy Room",
        status: "approved",
      },
    ];

    this.setPage({ offset: 0 });
  }

  private formatToMMDDYYYY(dateStr: string): string {
    const date = new Date(dateStr);
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    const yyyy = date.getFullYear();
    return `${mm}/${dd}/${yyyy}`;
  }

  setPage(event: { offset: number }) {
    const pageNumber = event.offset;
    let filtered = [...this.allData];

    // Status filter
    if (this.page.status) {
      filtered = filtered.filter((m) => m.status === this.page.status);
    }

    // From Date filter
    if (this.page.fromDate) {
      const fromFormatted = this.formatToMMDDYYYY(this.page.fromDate);
      filtered = filtered.filter((m) => new Date(m.date) >= new Date(fromFormatted));
    }

    // To Date filter
    if (this.page.toDate) {
      const toFormatted = this.formatToMMDDYYYY(this.page.toDate);
      filtered = filtered.filter((m) => new Date(m.date) <= new Date(toFormatted));
    }

    // Search Purpose
    if (this.page.search) {
      const text = this.page.search.toLowerCase();
      filtered = filtered.filter((m) => m.purpose.toLowerCase().includes(text));
    }

  
    this.page.totalCount = filtered.length;
    const start = pageNumber * this.page.size;
    const end = start + this.page.size;
    this.rows = filtered.slice(start, end);
    this.page.pageNumber = pageNumber;
  }
}
