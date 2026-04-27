import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface User {
  userId: number;
  name: string;
  email: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class SuperAdminService {
  private apiUrl = 'https://localhost:7001/api/SuperAdmin'; // Adjust if your backend URL is different

  constructor(private http: HttpClient) { }

  getAllHotelOwners(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/all-owners`);
  }

  getPendingHotelOwners(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/pending-owners`);
  }

  approveHotelOwner(userId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/approve-owner/${userId}`, {});
  }

  rejectHotelOwner(userId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/reject-owner/${userId}`, {});
  }
}
