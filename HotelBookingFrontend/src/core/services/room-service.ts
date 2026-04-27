import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../app/Environment/environment';

@Injectable({
  providedIn: 'root',
})
export class RoomService {

  constructor(private http: HttpClient) {}

  getRoomsByHotel(hotelId: number): Observable<any> {
    return this.http.get<any>(
      `${environment.apiUrl}/Room/by-hotel/${hotelId}`
    );
  }

  getRoomById(id: number): Observable<any> {
    return this.http.get<any>(
      `${environment.apiUrl}/Room/${id}`
    );
  }

  addRoom(data: any): Observable<string> {
    return this.http.post(
      `${environment.apiUrl}/Room`,
      data,
      { responseType: 'text' }
    );
  }
}
