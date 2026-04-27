import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../app/Environment/environment';
import { EmailDTO } from '../../models/emaildto';

@Injectable({ providedIn: 'root' })
export class EmailService {

  private http = inject(HttpClient);

  sendEmail(dto: EmailDTO): Observable<string> {
    return this.http.post(
      `${environment.apiUrl}/Email/send`,
      dto,
      { responseType: 'text' }
    );
  }
}