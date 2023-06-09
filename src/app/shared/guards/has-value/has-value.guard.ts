import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, combineLatest, map } from 'rxjs';
import { AppService } from 'src/app/app.service';

@Injectable({
  providedIn: 'root',
})
export class HasValueGuard implements CanActivate {
  appService = inject(AppService);
  router = inject(Router);
  value$ = this.appService.value$;
  installments$ = this.appService.installments$;
  simulationValues$ = combineLatest([this.value$, this.installments$]);
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.simulationValues$.pipe(
      map(
        ([value, installments]) =>
          (value > 0 && installments > 0) ||
          this.router.createUrlTree(['/', 'home'])
      )
    );
  }
}
