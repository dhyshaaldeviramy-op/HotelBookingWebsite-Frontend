
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthResponse } from '../../models/authresponsedto';
import { environment } from '../../app/Environment/environment';
import { RegisterDto } from '../../models/registerdto';
import { LoginDto } from '../../models/logindto';

@Injectable({
  providedIn: 'root',
})
export class Authservice {
  private http   = inject(HttpClient);
  private router = inject(Router);

  private loggedIn = signal<boolean>(false);

  checksession(): void {
    if (localStorage.getItem('token')) {
      this.loggedIn.set(true);
    }
  }

  register(dto: RegisterDto): Observable<AuthResponse> {        
    return this.http.post<AuthResponse>(
      `${environment.apiUrl}/auth/register`, dto);
  }

  login(dto: LoginDto): Observable<AuthResponse> {          
    return this.http.post<AuthResponse>(
      `${environment.apiUrl}/auth/login`, dto);
  }

  savesession(token: AuthResponse): void {
    localStorage.setItem('token', token.token);
    localStorage.setItem('user', JSON.stringify(token));
    this.loggedIn.set(true);
  }

  logout(): void {
    localStorage.clear();
    this.loggedIn.set(false);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.loggedIn();
  }

  getUser(): AuthResponse | null {
    const data = localStorage.getItem('user');
    return data ? JSON.parse(data) : null;
  }

  isAdmin(): boolean {
    return this.getUser()?.role === 'Admin';
  }

  isSuperAdmin(): boolean {
    return this.getUser()?.role === 'SuperAdmin';
  }

  isOwner(): boolean {
    return this.getUser()?.role === 'Owner';
  }

  isCustomer(): boolean {
    return this.getUser()?.role === 'Customer';

  }
}