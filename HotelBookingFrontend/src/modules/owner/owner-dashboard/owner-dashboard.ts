import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HotelService } from '../../../core/services/hotel-service';
import { RoomService } from '../../../core/services/room-service';

@Component({
  selector: 'app-owner-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './owner-dashboard.html',
  styleUrl: './owner-dashboard.css'
})
export class OwnerDashboard implements OnInit {
  private hotelService = inject(HotelService);
  private roomService  = inject(RoomService);
  private fb           = inject(FormBuilder);

  activeTab = signal<'hotels' | 'rooms'>('hotels');

  hotels = signal<any[]>([]);
  rooms  = signal<any[]>([]);

  hotelMsg    = signal('');
  hotelErrMsg = signal('');
  roomMsg     = signal('');
  roomErrMsg  = signal('');

  hotelForm: FormGroup = this.fb.group({
    name:        ['', Validators.required],
    location:    ['', Validators.required],
    description: ['']
  });

  roomForm: FormGroup = this.fb.group({
    hotelId:      ['', Validators.required],
    category:     ['', Validators.required],
    price:        ['', [Validators.required, Validators.min(1)]],
    availability: ['', [Validators.required, Validators.min(1)]]
  });

  ngOnInit() {
    this.loadHotels();
  }

  setTab(tab: 'hotels' | 'rooms') {
    this.activeTab.set(tab);
    if (tab === 'hotels') this.loadHotels();
  }

  loadHotels() {
    this.hotelService.getHotels().subscribe({
      next: (res: any) => this.hotels.set(res),
      error: () => {}
    });
  }

  loadRooms() {
    const hotelId = this.roomForm.get('hotelId')?.value;
    if (!hotelId) return;
    this.roomService.getRoomsByHotel(hotelId).subscribe({
      next: (res: any) => this.rooms.set(res),
      error: () => {}
    });
  }

  addHotel() {
    if (this.hotelForm.invalid) { this.hotelForm.markAllAsTouched(); return; }
    this.hotelMsg.set('');
    this.hotelErrMsg.set('');
    this.hotelService.addHotel(this.hotelForm.value).subscribe({
      next: () => {
        this.hotelMsg.set('✅ Hotel added successfully!');
        this.hotelForm.reset();
        this.loadHotels();
      },
      error: (err) => {
        this.hotelErrMsg.set('❌ Failed to add hotel: ' + (err?.error?.message || err.status));
      }
    });
  }

  addRoom() {
    if (this.roomForm.invalid) { this.roomForm.markAllAsTouched(); return; }
    this.roomMsg.set('');
    this.roomErrMsg.set('');
    this.roomService.addRoom(this.roomForm.value).subscribe({
      next: () => {
        this.roomMsg.set('✅ Room added successfully!');
        this.loadRooms();
      },
      error: (err) => {
        this.roomErrMsg.set('❌ Failed to add room: ' + (err?.error?.message || err.status));
      }
    });
  }
}
