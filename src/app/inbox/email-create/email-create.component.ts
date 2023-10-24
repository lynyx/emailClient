import { Component } from '@angular/core';

import { AuthService } from "../../auth/auth.service";
import { Email } from "../email-interface";
import { EmailService } from "../email.service";

@Component({
  selector: 'app-email-create',
  templateUrl: './email-create.component.html',
  styleUrls: ['./email-create.component.css']
})
export class EmailCreateComponent {
  email: Email;

  showModal = false;

  constructor(
    private authService: AuthService,
    private emailService: EmailService,
    ) {
    this.email = {
      from: `${authService.username}@angular-email.com`,
      html: '',
      id: '',
      subject: '',
      text: '',
      to: '',
    }
  }

  onSubmit(email: Email) {
    this.emailService.sendEmail(email).subscribe(() => {
      this.showModal = false;
    });
  }
}
