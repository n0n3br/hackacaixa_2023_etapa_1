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
  private readonly appService = inject(AppService);
  private readonly router = inject(Router);
  private readonly value$ = this.appService.value$;
  private readonly installments$ = this.appService.installments$;
  private readonly simulationValues$ = combineLatest([
    this.value$,
    this.installments$,
  ]);
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
