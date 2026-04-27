import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from '../../../core/services/booking-service';
import { Authservice } from '../../../core/services/authservice';
import { RoomService } from '../../../core/services/room-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-booking-page',
  imports: [FormsModule, CommonModule],
  templateUrl: './booking-page.html',
  styleUrl: './booking-page.css',
})
export class BookingPage implements OnInit {
  private route   = inject(ActivatedRoute);
  private router  = inject(Router);
  private booking = inject(BookingService);
  private auth    = inject(Authservice);
  private roomService = inject(RoomService);

  roomId!: number;
  room: any = null;
  checkIn!: string;
  checkOut!: string;
  promoCode: string = '';
  totalPrice: number = 0;
  message = '';

  ngOnInit(): void {
    this.roomId = Number(this.route.snapshot.queryParamMap.get('roomId'));
    this.loadRoomDetails();
  }

  loadRoomDetails() {
    this.roomService.getRoomById(this.roomId).subscribe({
      next: (res: any) => {
        this.room = res;
      },
      error: (err: any) => {
        console.error('Error loading room:', err);
        this.message = 'Error loading room details.';
      }
    });
  }

  calculatePrice() {
    if (this.checkIn && this.checkOut && this.room?.price) {
      const days = Math.ceil(
        (new Date(this.checkOut).getTime() - new Date(this.checkIn).getTime())
        / (1000 * 60 * 60 * 24)
      );
      this.totalPrice = days > 0 ? days * this.room.price : 0;
    }
  }

 bookNow() {
  if (!this.checkIn || !this.checkOut) return;

  const data = {
    roomId:   this.roomId,
    checkIn:  this.checkIn,
    checkOut: this.checkOut,
    promoCode: this.promoCode
  };

  this.booking.createBooking(data).subscribe({
      next: (bookingId: any) => {
        this.message = '✅ Booking Successful!';
        setTimeout(() => {
          this.router.navigate(['/payment'], {
            queryParams: {
              bookingId: bookingId,
              amount: this.totalPrice
            }
          });
        }, 1000);
      },
      error: (err: any) => {
        console.error('Booking failed:', err);
        this.message = `❌ Booking failed: ${err.error?.message || 'Please try again.'}`;
      }
    });
}
}