import { Component, OnInit, signal } from '@angular/core';
import { HotelService } from '../../../core/services/hotel-service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-hotel-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './hotel-list.html',
  styleUrl: './hotel-list.css',
})
export class HotelList implements OnInit {
  hotels = signal<any[]>([]);   // ← changed to signal
  location: string = '';
  minPrice?: number;
  maxPrice?: number;

  constructor(
    private hotelService: HotelService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadHotels();
  }

  loadHotels() {
    this.hotelService.getHotels(this.location, this.minPrice, this.maxPrice).subscribe({
      next: (res: any) => {
        this.hotels.set(res);   // ← use .set()
        console.log('hotels:', res);
      },
      error: (err) => console.error('Error:', err)
    });
  }

  onSearch() {
    this.loadHotels();
  }

  viewDetails(id: number) {
    this.router.navigate(['/hotels', id]);
  }
}