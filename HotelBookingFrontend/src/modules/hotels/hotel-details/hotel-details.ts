import { Component, OnInit, signal } from '@angular/core';
import { HotelService } from '../../../core/services/hotel-service';
import { RoomService } from '../../../core/services/room-service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hotel-details',
  imports: [CommonModule],
  templateUrl: './hotel-details.html',
  styleUrl: './hotel-details.css',
})
export class HotelDetails implements OnInit {

  hotelId!: number;
  hotel = signal<any>(null);
  rooms = signal<any[]>([]);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private hotelService: HotelService,
    private roomService: RoomService
  ) {}

  ngOnInit(): void {
    this.hotelId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadHotel();
    this.loadRooms();
  }

  loadHotel() {
    this.hotelService.getHotelById(this.hotelId).subscribe({
      next: (res: any) => this.hotel.set(res),
      error: (err) => console.error('hotel error:', err)
    });
  }

  loadRooms() {
    this.roomService.getRoomsByHotel(this.hotelId).subscribe({
      next: (res: any) => {
        this.rooms.set(res);
        console.log('rooms loaded:', res);
      },
      error: (err) => console.error('rooms error:', err)
    });
  }

  bookRoom(room: any) {
    this.router.navigate(['/booking'], {
      queryParams: { roomId: room.id },
      state: { category: room.category, price: room.price }
    });
  }
}