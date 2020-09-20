import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

import { Profile } from '../../models/profile';
import {URL} from '../../models/url';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private profilesUrl = environment.apiUrl + '/profiles';
  private paginateUrl = this.profilesUrl + '/paginate';

  constructor(private http: HttpClient) { }

  getProfiles(): Observable<Profile[]> {
    return this.http.get<Profile[]>(this.profilesUrl);
  }

  getProfile(id: string): Observable<Profile> {
    return this.http.get<Profile>(this.profilesUrl + `/${id}`);
  }

  getPrevNotNoneFounds(id: string, type: string): Observable<Profile[]> {
    const params = new HttpParams().set('before', id).set('type', type).set('col', 'notnonefound');
    return this.http.get<Profile[]>(this.paginateUrl, { params });
  }

  getNextNotNoneFounds(id: string, type: string): Observable<Profile[]> {
    const params = new HttpParams().set('after', id).set('type', type).set('col', 'notnonefound');
    return this.http.get<Profile[]>(this.paginateUrl, { params });
  }

  getPrevNoneFounds(id: string, type: string): Observable<Profile[]> {
    const params = new HttpParams().set('before', id).set('type', type).set('col', 'nonefound');
    return this.http.get<Profile[]>(this.paginateUrl, { params });
  }

  getNextsNoneFounds(id: string, type: string): Observable<Profile[]> {
    const params = new HttpParams().set('after', id).set('type', type).set('col', 'nonefound');
    return this.http.get<Profile[]>(this.paginateUrl, { params });
  }

  updateNoneFoundUpvotes(profileId: string, id: string, type: string, votes: number): Observable<URL> {
    const url = `${environment.apiUrl}/profiles/${profileId}/urls/${type}/nonefound/upvotes`;

    return this.http.patch<URL>(url, {votes});
  }

  updateNoneFoundDownvotes(profileId: string, id: string, type: string, votes: number): Observable<URL> {
    const url = `${environment.apiUrl}/profiles/${profileId}/urls/${type}/nonefound/downvotes`;

    return this.http.patch<URL>(url, {votes});
  }
}
