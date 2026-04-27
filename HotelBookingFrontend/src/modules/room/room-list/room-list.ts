import { Component, Input } from '@angular/core';
import { RoomService } from '../../../core/services/room-service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-room-list',
  imports: [FormsModule,CommonModule],
  templateUrl: './room-list.html',
  styleUrl: './room-list.css',
})
export class RoomList {
  @Input() hotelId!: number;   // receive from parent (hotel details)
  rooms: any[] = [];

  constructor(
    private roomService: RoomService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.hotelId) {
      this.loadRooms();
    }
  }

  loadRooms() {
    this.roomService.getRoomsByHotel(this.hotelId)
      .subscribe((res: any) => {
        this.rooms = res;
      });
  }

  bookRoom(roomId: number) {
    this.router.navigate(['/booking'], {
      queryParams: { roomId: roomId }
    });
  }
}
