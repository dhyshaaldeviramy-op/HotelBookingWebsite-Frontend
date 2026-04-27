import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../app/Environment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private http: HttpClient) { }

  getRoomById(id: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/Room/${id}`);
  }

  getAllRooms(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/Room`);
  }

  getAvailableRooms(checkIn: string, checkOut: string): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/Room/available?checkIn=${checkIn}&checkOut=${checkOut}`);
  }
}