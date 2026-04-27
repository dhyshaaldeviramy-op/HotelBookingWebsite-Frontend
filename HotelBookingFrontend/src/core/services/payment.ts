import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../app/Environment/environment';
import { PaymentDTO } from '../../models/paymentdto';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {

  private http = inject(HttpClient);

  getPaymentById(id: number) {
    return this.http.get<PaymentDTO>(`${environment.apiUrl}/Payment/${id}`);
  }

 
 sendPayment(payment: PaymentDTO) {
  return this.http.post(
    `${environment.apiUrl}/Payment`, payment, { responseType: 'text' } );
}
}