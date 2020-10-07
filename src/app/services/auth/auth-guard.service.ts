import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {HttpClient} from '@angular/common/http';

import {Observable, of} from 'rxjs';
import {User} from '../../models/user';
import {environment} from '../../../environments/environment';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private http: HttpClient, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.http.get<User>(`${environment.apiUrl}/auth/whoami`, {withCredentials: true}).pipe(map(user => {
      return true;
    })).pipe(catchError(err => {
      this.router.routeReuseStrategy.shouldReuseRoute = () => {
        return false;
      };

      return of(this.router.parseUrl('/login'));
    }));
  }
}
