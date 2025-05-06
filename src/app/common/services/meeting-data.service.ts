import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MeetingDataService {
  meetingDetailsSource=new BehaviorSubject<any>("")
  meetingDetails$= this.meetingDetailsSource.asObservable()
  dateAndTimeSource=new BehaviorSubject<any>("")
  dateAndTime$= this.dateAndTimeSource.asObservable()
  meetingRoomSource=new BehaviorSubject<any>("")
  meetingRoom$= this.meetingRoomSource.asObservable()
  constructor() { }
  getMeetingDetailsData(data:any) {
    this.meetingDetailsSource.next(data)
  } 
  getDateAndTimeData(selectedDate:any, selectedStartTime:any, selectedEndTime:any) {
    let data={
      selectedDate:selectedDate, selectedStartTime:selectedStartTime, selectedEndTime:selectedEndTime
    }
    this.dateAndTimeSource.next(data)
  }
  getMeetingRoomData(data:any) {
    this.meetingRoomSource.next(data)
  }
}
