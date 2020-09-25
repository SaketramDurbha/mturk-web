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
    return this.http.get<URL[]>(`${environment.apiUrl}/profiles/${profileId}/urls/${type}`);
  }

  addURL(profileId: string, newURL: string, type: string): Observable<URL> {
    const data: URL = {
      id: '', // placeholder
      index: 0, // placeholder
      url: newURL,
      valid: true, // placeholder
      up_votes: 1,
      down_votes: 0,
      file: '' // placeholder
    };

    return this.http.post<URL>(`${environment.apiUrl}/profiles/${profileId}/urls/${type}`, data, this.httpOptions);
  }

  updateValid(profileId: string, id: string, type: string, valid: boolean): Observable<URL> {
    const url = `${environment.apiUrl}/profiles/${profileId}/urls/${type}/${id}/valid`;

    return this.http.patch<URL>(url, {valid});
  }

  updateUpvotes(profileId: string, id: string, type: string, votes: number): Observable<URL> {
    const url = `${environment.apiUrl}/profiles/${profileId}/urls/${type}/${id}/upvotes`;

    return this.http.patch<URL>(url, {votes});
  }

  updateDownvotes(profileId: string, id: string, type: string, votes: number): Observable<URL> {
    const url = `${environment.apiUrl}/profiles/${profileId}/urls/${type}/${id}/downvotes`;

    return this.http.patch<URL>(url, {votes});
  }

  checkUploaded(profileId: string, id: string, type: string): Observable<URL> {
    const url = `${environment.apiUrl}/profiles/${profileId}/urls/${type}/${id}/checkuploaded`;

    return this.http.get<URL>(url);
  }
}
