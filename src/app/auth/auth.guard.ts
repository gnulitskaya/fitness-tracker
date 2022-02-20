import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromRoot from '../app.reducer';
import { take } from 'rxjs/operators';

@Injectable()

export class AuthGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService,
    private router: Router,
    private store: Store<fromRoot.State>) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | any {
    // if (this.authService.isAuth()) {
    //   return true;
    // } else {
    //   this.router.navigate(['/login']);
    // }
    return this.store.select(fromRoot.getIsAuth).pipe(take(1));
  }

  canLoad(route: Route): boolean | any {
    // if (this.authService.isAuth()) {
    //   return true;
    // } else {
    //   this.router.navigate(['/login']);
    // }
    return this.store.select(fromRoot.getIsAuth).pipe(take(1));
  }

}
