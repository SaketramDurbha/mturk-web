import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

import { Profile } from '../../models/profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private profilesUrl = environment.apiUrl + '/profiles';

  constructor(private http: HttpClient) { }

  getProfiles(): Observable<Profile[]> {
    return this.http.get<Profile[]>(this.profilesUrl);
  }
}
