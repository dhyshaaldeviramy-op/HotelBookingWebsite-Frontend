import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentDTO } from '../../../models/paymentdto';
import { PaymentService } from '../../../core/services/payment';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payment',
  imports: [FormsModule, CommonModule],
  templateUrl: './payment.html',
  styleUrl: './payment.css',
})
export class PaymentComponent implements OnInit {
  private route          = inject(ActivatedRoute);
  private router         = inject(Router);
  private paymentservice = inject(PaymentService);

  payment: PaymentDTO = { bookingId: 0, amount: 0, method: 'Online' };  // ← add method
  message = '';
  paid = false;

  ngOnInit(): void {
    const bookingId = Number(this.route.snapshot.queryParamMap.get('bookingId'));
    const amount    = Number(this.route.snapshot.queryParamMap.get('amount'));
    if (bookingId) this.payment.bookingId = bookingId;
    if (amount)    this.payment.amount    = amount;
  }

submitPayment() {
  this.paymentservice.sendPayment(this.payment).subscribe({
    next: () => {
      this.message = '✅ Payment Successful! Redirecting...';
      this.paid = true;
      setTimeout(() => this.router.navigate(['/my-bookings']), 3000);
    },
    error: (err) => {
      console.error('Payment error:', err);
      this.message = '❌ Payment Failed. Please try again.';
    }
  });
}
}