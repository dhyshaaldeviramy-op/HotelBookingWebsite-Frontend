import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingService } from '../../../core/services/booking-service';
import { AllHotelOwnersComponent } from '../all-hotel-owners/all-hotel-owners';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, AllHotelOwnersComponent],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css'
})
export class AdminDashboard implements OnInit {
  private bookingService = inject(BookingService);

  activeTab = signal<'owners' | 'bookings'>('owners');
  bookings = signal<any[]>([]);

  ngOnInit() {
    this.loadAllBookings();
  }

  setTab(tab: 'owners' | 'bookings') {
    this.activeTab.set(tab);
    if (tab === 'bookings') this.loadAllBookings();
  }

  loadAllBookings() {
    this.bookingService.getAllBookings().subscribe({
      next: (res: any) => this.bookings.set(res),
      error: (err) => console.error('Error loading bookings:', err)
    });
  }
}
