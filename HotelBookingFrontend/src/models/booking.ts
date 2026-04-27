export interface Booking {
  id?: number;
  userId?: number;
  roomId: number;
  checkIn: Date;
  checkOut: Date;
  totalPrice?: number;
}