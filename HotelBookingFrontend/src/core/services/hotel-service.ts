import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../app/Environment/environment';

@Injectable({
  providedIn: 'root',
})
export class HotelService {

  constructor(private http: HttpClient) {}

  getHotels(location?: string, minPrice?: number, maxPrice?: number) {
    let url = `${environment.apiUrl}/Hotel?`;
    if (location) url += `location=${location}&`;
    if (minPrice) url += `minPrice=${minPrice}&`;
    if (maxPrice) url += `maxPrice=${maxPrice}&`;
    return this.http.get(url);
  }

  getHotelById(id: number) {
    return this.http.get(`${environment.apiUrl}/Hotel/${id}`);
  }

  addHotel(data: any) {
    return this.http.post(`${environment.apiUrl}/Hotel`, data, { responseType: 'text' }); // ← FIXED
  }
}