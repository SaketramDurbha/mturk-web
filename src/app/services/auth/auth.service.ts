import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../../models/user';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(idtoken: string): Observable<User> {
    const body = new HttpParams().set('idtoken', idtoken);
    const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded' });

    return this.http.post<User>(`${environment.apiUrl}/auth/login`, body, {headers, withCredentials: true}).pipe(map(user => {
      console.log(user);

      this.currentUserSubject.next(user);
      return user;
    }));
  }
}
