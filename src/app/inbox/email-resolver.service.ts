import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { catchError } from "rxjs/operators";

import { EmailService } from './email.service';
import { Email } from "./email-interface";

@Injectable({
  providedIn: 'root'
})
// Deprecated class-based approach. Look at email-resolver.ts file in order to get ResolveFn implementation example.
export class EmailResolverService implements Resolve<Email> {
  constructor(
    private emailService: EmailService,
    private router: Router,
  ) {
  }

  resolve(route: ActivatedRouteSnapshot) {
    const { id } = route.params;
    return this.emailService.getEmail(id)
      .pipe(
        catchError(() => {
          this.router.navigateByUrl('/inbox/not-found');
          return EMPTY;
        })
      );
  }
}
