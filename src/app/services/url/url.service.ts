import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import {Observable} from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import {URL} from '../../models/url';


@Injectable({
  providedIn: 'root'
})
export class UrlService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getURLs(profileId: string, type: string): Observable<URL[]> {
    return this.http.get<URL[]>(`${environment.apiUrl}/profiles/${profileId}/${type}`);
  }

  addURL(profileId: string, newURL: string, type: string): Observable<URL> {
    const data: URL = {
      id: '', // placeholder
      url: newURL,
      valid: false, // placeholder
    };

    return this.http.post<URL>(`${environment.apiUrl}/profiles/${profileId}/${type}`, data, this.httpOptions);
  }

  updateValid(profileId: string, id: string, type: string, valid: boolean): Observable<Object> {
    const url = `${environment.apiUrl}/profiles/${profileId}/${type}/${id}/${valid}`;

    return this.http.put(url, null);
  }
}
