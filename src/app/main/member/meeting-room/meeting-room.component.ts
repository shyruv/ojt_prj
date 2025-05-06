import { Component } from '@angular/core';

@Component({
  selector: 'app-meeting-room',
  templateUrl: './meeting-room.component.html',
  styleUrls: ['./meeting-room.component.scss']
})
export class MeetingRoomComponent {
  meetingRoom = { list: '' };
  validationErrors: any = {}; // Holds error states

  roomDetails: { [key: string]: { address: string; building: string; floor: string } } = {
    conference_alpha: { address: '123 Main St', building: 'Building A', floor: '1st Floor' },
    boardroom_executive: { address: '456 Corporate Blvd', building: 'Stark Tower', floor: '5th Floor' },
    training_room: { address: '789 Training Ln', building: 'Education Center', floor: '3rd Floor' },
    client_lounge: { address: '101 Business Ave', building: 'Client Hub', floor: '2nd Floor' },
    innovation_lab: { address: '202 Innovation St', building: 'Tech Park', floor: '4th Floor' },
    green_room: { address: '303 Creative Dr', building: 'Studio Complex', floor: 'Ground Floor' },
    project_collab_room: { address: '404 Project Way', building: 'Collaboration Center', floor: '2nd Floor' },
    vip_lounge: { address: '505 Prestige Rd', building: 'Executive Wing', floor: 'Top Floor' },
    strategy_room: { address: '606 Vision Blvd', building: 'Strategic HQ', floor: '6th Floor' }
  };
  

  selectedRoom: { address: string; building: string; floor: string } | null = null;

  updateRoomDetails() {
    this.selectedRoom = this.roomDetails[this.meetingRoom.list] || null;
  }

  validateFields(): boolean {
    this.validationErrors = {};
    let isValid = true;

    if (!this.meetingRoom.list) {
      this.validationErrors.list = true;
      isValid = false;
    }

    return isValid;
  }
}