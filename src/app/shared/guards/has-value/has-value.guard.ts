import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, combineLatest, map } from 'rxjs';
import { StoreService } from 'src/app/shared/store/store.service';

@Injectable({
  providedIn: 'root',
})
export class HasValueGuard implements CanActivate {
  private readonly store = inject(StoreService);
  private readonly router = inject(Router);
  private readonly value$ = this.store.value$;
  private readonly installments$ = this.store.installments$;
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
