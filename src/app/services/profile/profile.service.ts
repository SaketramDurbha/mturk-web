import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

import { Profile } from '../../models/profile';

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
}
