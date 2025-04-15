import { Component } from '@angular/core';
// import { MeetingService } from '../services/meeting.services';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent {
  manager: string = "John Wick";
  department: string = "IT Department";
  purpose: string = "Project Planning Meeting";
  localNumber: string = "179";

  date: string = "April 30, 2025";
  startTime: string = "10:00 AM";
  endTime: string = "11:30 AM";

  list: string = "Executive Boardroom";
  buildingFloor: string = "Stark Tower - 5th Floor";
  address: string = "456 Corporate Blvd";

  attendees: string[] = ["Heihachi Mishima", "Jin Kazama", "Kazuya Mishima"];
}
