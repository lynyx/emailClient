import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable, of } from "rxjs";
import { map, catchError } from 'rxjs/operators';

import { AuthService } from '../auth.service';

@Injectable({ providedIn: 'root' })
export class UniqueUsername implements AsyncValidator  {

  constructor(private authService: AuthService) {}
  validate = (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    const { value } = control;

    return this.authService.usernameAvailable(value)
      .pipe(
        map(value => {
          if (value.available) {
            return null;
          }

          return value;
        }),
        catchError(err => {
          if (err.error.username) {
            return of({ nonUniqueUsername: true });
          } else {
            return of({ noConnection: true });
          }
        })
      );
  }
}
