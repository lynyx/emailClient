import { inject } from '@angular/core';
import { ResolveFn, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Email } from "./email-interface";
import { EmailService } from "./email.service";
import { catchError } from "rxjs/operators";
import { EMPTY } from "rxjs";

export const EmailResolver: ResolveFn<Email> = (route: ActivatedRouteSnapshot) => {
  const { id } = route.params;
  const router = inject(Router);

  return inject(EmailService).getEmail(id)
    .pipe(
      catchError(() => {
        router.navigateByUrl('/inbox/not-found');
        return EMPTY;
      })
    );
}
