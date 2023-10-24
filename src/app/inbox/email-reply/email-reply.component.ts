import { Component, Input, OnChanges } from '@angular/core';
import { Email } from "../email-interface";
import { EmailService } from "../email.service";

@Component({
  selector: 'app-email-reply',
  templateUrl: './email-reply.component.html',
  styleUrls: ['./email-reply.component.css']
})
export class EmailReplyComponent implements OnChanges {
  @Input() email!: Email;
  showModal = false;

  constructor(private emailService: EmailService) {
  }

  ngOnChanges(): void {
    const text = this.email.text && this.email.text.replace(/>/ig, '').replace(/\n/ig, '\n> ');
    this.email = {
      ...this.email,
      from: this.email.to,
      to: this.email.from,
      subject: `Re: "${this.email.subject}"`,
      text: text && `\n\n\n======================== ${this.email.from} wrote:\n> ${text}`,
    }
  }

  onSubmit(email: Email) {
    this.emailService.sendEmail(email).subscribe(() => {
      this.showModal = false;
    });
  }
}
