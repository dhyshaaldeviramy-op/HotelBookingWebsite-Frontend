import { Component, OnInit, inject } from '@angular/core';
import { BookingService } from '../../../core/services/booking-service';
import { Authservice } from '../../../core/services/authservice';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-bookings',
  imports: [CommonModule],
  templateUrl: './my-bookings.html',
  styleUrl: './my-bookings.css',
})
export class MyBookings implements OnInit {
  private bookingService = inject(BookingService);
  private auth           = inject(Authservice);
  private router         = inject(Router);

  bookings: any[] = [];

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings() {
    const raw = localStorage.getItem('user');
    const userId = raw ? JSON.parse(raw)?.userId : null;

    if (userId) {
      this.bookingService.getUserBookings(userId).subscribe({
        next: (res: any) => this.bookings = res,
        error: () => {}
      });
    }
  }

  cancelBooking(id: number) {
    if (confirm('Cancel this booking?')) {
      this.bookingService.cancelBooking(id).subscribe({
        next: () => {
          const b = this.bookings.find(x => x.id === id);
          if (b) b.status = 'Cancelled';
        },
        error: () => alert('Failed to cancel.')
      });
    }
  }

  rebook(booking: any) {
    // Navigate to booking page with same room ID
    this.router.navigate(['/booking'], {
      queryParams: { roomId: booking.roomId }
    });
  }
}