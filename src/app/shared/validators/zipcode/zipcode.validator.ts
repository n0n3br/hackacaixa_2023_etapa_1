import { Injectable, inject } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { ZipcodeCheckService } from '../../services/zipcode-check/zipcode-check.service';
import { Observable, catchError, map, of } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class ZipcodeValidator implements AsyncValidator {
  zipcodeCheckService = inject(ZipcodeCheckService);
  constructor() {}

  validate(
    ctrl: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    const { value } = ctrl;
    if (!value) {
      return of(null);
    }
    return this.zipcodeCheckService.get(ctrl.value).pipe(
      map((response) => (response.erro ? { zipcodeInvalide: true } : null)),
      catchError(() => of(null))
    );
  }
}
