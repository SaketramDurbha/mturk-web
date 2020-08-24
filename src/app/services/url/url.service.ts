import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

import { URL } from '../../models/url';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
  private httpOptions = {
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
      up_votes: 0,
      down_votes: 0
    };

    return this.http.post<URL>(`${environment.apiUrl}/profiles/${profileId}/${type}`, data, this.httpOptions);
  }

  updateValid(profileId: string, id: string, type: string, valid: boolean): Observable<URL> {
    const url = `${environment.apiUrl}/profiles/${profileId}/${type}/${id}/${valid}`;

    return this.http.put<URL>(url, null);
  }

  updateUpvotes(profileId: string, id: string, type: string, votes: number): Observable<URL> {
    const url = `${environment.apiUrl}/profiles/${profileId}/${type}/${id}/upvotes`;

    return this.http.patch<URL>(url, {votes});
  }

  updateDownvotes(profileId: string, id: string, type: string, votes: number): Observable<URL> {
    const url = `${environment.apiUrl}/profiles/${profileId}/${type}/${id}/downvotes`;

    return this.http.patch<URL>(url, {votes});
  }
}
