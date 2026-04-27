import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HotelService } from '../../../core/services/hotel-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-hotel',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-hotel.html',
  styleUrl: './add-hotel.css'
})
export class AddHotel {
  private hotelService = inject(HotelService);
  private fb = inject(FormBuilder);

  hotelForm: FormGroup = this.fb.group({
    name:        ['', Validators.required],
    location:    ['', Validators.required],
    description: ['']
  });

  hotelMsg    = signal('');
  hotelErrMsg = signal('');

  addHotel(): void {
    if (this.hotelForm.invalid) {
      this.hotelForm.markAllAsTouched();
      return;
    }
    this.hotelMsg.set('');
    this.hotelErrMsg.set('');
    this.hotelService.addHotel(this.hotelForm.value).subscribe({
      next: () => {
        this.hotelMsg.set('✅ Hotel added successfully!');
        this.hotelForm.reset();
      },
      error: (err) => {
        this.hotelErrMsg.set('❌ Failed to add hotel: ' + (err?.error?.message || err.status));
      }
    });
  }
}
