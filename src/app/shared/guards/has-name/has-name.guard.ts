import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, map } from 'rxjs';
import { AppService } from '../../../app.service';

@Injectable({
  providedIn: 'root',
})
export class HasNameGuard implements CanActivate {
  appService = inject(AppService);
  router = inject(Router);
  name$ = this.appService.name$;
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.name$.pipe(
      map((name) => {
        return name.length > 2 || this.router.createUrlTree(['/', 'home']);
      })
    );
  }
}
