import { Component } from '@angular/core';
import { MeetingDataService } from 'app/common/services/meeting-data.service';
// import { MeetingService } from '../services/meeting.services';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent {
  
  manager: string = "";
  department: string = "";
  purpose: string = "";
  localNumber: string = "";

  date: string = "";
  startTime: string = "";
  endTime: string = "";

  list: string = "";
  buildingFloor: string = "";
  address: string = "";

  attendees: string[] = [];
  constructor(private meetingDataService: MeetingDataService,
  ){
    this.meetingDataService.meetingDetails$.subscribe((data) => {
      console.log("data: ",data)
      this.setMeetingDetails(data)
    })
    this.meetingDataService.dateAndTime$.subscribe((data) => {
      console.log("data: ",data)
      this.setDateAndTimeDetails(data)
    })

    this.meetingDataService.meetingRoom$.subscribe((data) => {
      console.log("data: ",data)
      this.setMeetingRoomDetails(data)
    })
  }
  setMeetingDetails(data:any){
    this.manager=data.manager
    this.department=data.department
    this.purpose=data.purpose
    this.localNumber=data.localNumber
    this.attendees=data.employeeNamesList

  }
  setDateAndTimeDetails(data:any){
    this.date=data.selectedDate
    this.startTime=data.selectedStartTime
    this.endTime=data.selectedEndTime
  }
  setMeetingRoomDetails(data:any){
    this.list=data.list
    this.buildingFloor=data.buildingFloor
    this.address=data.address
  }

}
