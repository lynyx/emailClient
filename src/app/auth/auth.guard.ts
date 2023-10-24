import { inject } from '@angular/core';
import { CanMatchFn, Router, UrlTree } from '@angular/router';
import { Observable } from "rxjs";
import { map, skipWhile, take, tap } from 'rxjs/operators';

import { AuthService } from "./auth.service";

export const authGuard: CanMatchFn = (route, segments): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
  const router = inject(Router);
  return (inject(AuthService).signedin$
    .pipe(
      skipWhile(val => val === null),
      map(val => val!),  // The exclamation mark (non-null assertion) operator removes null and
                                            // undefined from the type of an expression.
                                            // It is used when we know that a variable that TypeScript thinks could be
                                            // null or undefined actually isn't.

      // map(val => !!val),    // Or we can just filter null values
      take(1),
      tap(async (authenticated) => {
        if (!authenticated) {
          console.log('Navigated by Guard!!!', authenticated);
          await router.navigateByUrl('/');
        }
      }),
    ));
};
