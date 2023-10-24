import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { Email } from "../email-interface";

@Component({
  selector: 'app-email-show',
  templateUrl: './email-show.component.html',
  styleUrls: ['./email-show.component.css']
})
export class EmailShowComponent implements OnInit {
  email!: Email;

  constructor(private route: ActivatedRoute) {
    this.email = this.route.snapshot.data['email'];

    this.route.data.subscribe(({ email }) => {
      this.email = email;
    })
  }
  ngOnInit() {
    // this.route.params.subscribe(({ id }) => {
    //   this.emailService.getEmail(id).subscribe(email => {
    //     console.log(email);
    //   });
    // })


    // Good solution, but better to use resolver in order to avoid email === undefined at initial rendering.
    // this.route.params
    //   .pipe(
    //     switchMap(({ id }) => {
    //       return this.emailService.getEmail(id);
    //     })
    //   )
    //   .subscribe(email => {
    //     this.email = email;
    //   })
  }

}
