import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';

import { Email } from './email-interface';

interface EmailsSummary {
  id: string;
  from: string;
  subject: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  rootURL = 'https://api.angular-email.com';

  constructor(private http: HttpClient) { }

  getEmails() {
    return this.http.get<EmailsSummary[]>(`${this.rootURL}/emails`);
  }

  getEmail(id: string) {
    return this.http.get<Email>(`${this.rootURL}/emails/${id}`);
  }

  sendEmail(email: Email) {
    return this.http.post(`${this.rootURL}/emails`, email);
  }
}
