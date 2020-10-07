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
    return this.http.get<Profile[]>(this.profilesUrl, {withCredentials: true});
  }

  getProfile(id: string): Observable<Profile> {
    return this.http.get<Profile>(this.profilesUrl + `/${id}`, {withCredentials: true});
  }

  getPrevValids(id: string, type: string): Observable<Profile[]> {
    const params = new HttpParams().set('before', id).set('type', type).set('col', 'valid');
    return this.http.get<Profile[]>(this.paginateUrl, { params, withCredentials: true});
  }

  getNextValids(id: string, type: string): Observable<Profile[]> {
    const params = new HttpParams().set('after', id).set('type', type).set('col', 'valid');
    return this.http.get<Profile[]>(this.paginateUrl, { params, withCredentials: true });
  }

  getPrevNoneValids(id: string, type: string): Observable<Profile[]> {
    const params = new HttpParams().set('before', id).set('type', type).set('col', 'nonevalid');
    return this.http.get<Profile[]>(this.paginateUrl, { params, withCredentials: true });
  }

  getNextNoneValids(id: string, type: string): Observable<Profile[]> {
    const params = new HttpParams().set('after', id).set('type', type).set('col', 'nonevalid');
    return this.http.get<Profile[]>(this.paginateUrl, { params, withCredentials: true });
  }

  getPrevNonEmptys(id: string, type: string): Observable<Profile[]> {
    const params = new HttpParams().set('before', id).set('type', type).set('col', 'nonempty');
    return this.http.get<Profile[]>(this.paginateUrl, { params, withCredentials: true });
  }

  getNextNonEmptys(id: string, type: string): Observable<Profile[]> {
    const params = new HttpParams().set('after', id).set('type', type).set('col', 'nonempty');
    return this.http.get<Profile[]>(this.paginateUrl, { params, withCredentials: true });
  }

  updateNoneFoundUpvotes(profileId: string, id: string, type: string, votes: number): Observable<URL> {
    const url = `${environment.apiUrl}/profiles/${profileId}/urls/${type}/nonefound/upvotes`;

    return this.http.patch<URL>(url, {votes}, {withCredentials: true});
  }

  updateNoneFoundDownvotes(profileId: string, id: string, type: string, votes: number): Observable<URL> {
    const url = `${environment.apiUrl}/profiles/${profileId}/urls/${type}/nonefound/downvotes`;

    return this.http.patch<URL>(url, {votes}, {withCredentials: true});
  }
}
