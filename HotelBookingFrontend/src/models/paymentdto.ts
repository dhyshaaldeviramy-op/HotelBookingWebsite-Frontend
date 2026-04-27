export interface PaymentDTO {
  bookingId: number;
  amount: number;
  method?: string;  // ← add optional method
}