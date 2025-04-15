import { Component, OnInit } from '@angular/core';
import { FlatpickrOptions } from 'ng2-flatpickr';

@Component({
  selector: 'app-date-time',
  templateUrl: './date-time.component.html',
  styleUrls: ['./date-time.component.scss']
})
export class DateTimeComponent implements OnInit {
  selectedDate: string = '';  
  selectedStartTime: string = '';
  selectedEndTime: string = '';
  validationErrors: any = {}; 

  dateOptions: FlatpickrOptions = {
    enableTime: false,
    dateFormat: "l, F j, Y",
    minDate: "today",
    disableMobile: true,
    disable: [
      function(date) {
        return (date.getDay() === 0 || date.getDay() === 6);
      }
    ]
  };

  timeOptions: FlatpickrOptions = {
    enableTime: true,
    noCalendar: true,
    dateFormat: "h:i K",
    time_24hr: false,
    minuteIncrement: 1,
    disableMobile: true
  };

  ngOnInit() {}

  validateFields(): boolean {
    this.validationErrors = {};
    let isValid = true;

    if (!this.selectedDate || this.selectedDate.trim() === '') {
      this.validationErrors.date = true;
      isValid = false;
    }
    if (!this.selectedStartTime || this.selectedStartTime.trim() === '') {
      this.validationErrors.startTime = true;
      isValid = false;
    }
    if (!this.selectedEndTime || this.selectedEndTime.trim() === '') {
      this.validationErrors.endTime = true;
      isValid = false;
    }

    return isValid;
  }
}