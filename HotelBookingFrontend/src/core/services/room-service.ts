import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../app/Environment/environment';

@Injectable({
  providedIn: 'root',
})
export class RoomService {

  constructor(private http: HttpClient) {}

  getRoomsByHotel(hotelId: number) {
    return this.http.get(`${environment.apiUrl}/Room/by-hotel/${hotelId}`); // ← removed /rooms
  }

  getRoomById(id: number) {
    return this.http.get(`${environment.apiUrl}/Room/${id}`);
  }

  addRoom(data: any) {
    return this.http.post(`${environment.apiUrl}/Room`, data, { responseType: 'text' }); // ← added responseType
  }
}