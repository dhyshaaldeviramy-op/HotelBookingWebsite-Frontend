import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../app/Environment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Authservice {

  constructor(private http: HttpClient) { }

  login(credentials: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/Auth/login`, credentials);
  }

  register(user: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/Auth/register`, user);
  }

  logout(): void {
    localStorage.removeItem('user');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }

  getCurrentUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
}