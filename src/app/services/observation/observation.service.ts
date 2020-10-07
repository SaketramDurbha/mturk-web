import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

import { Observation } from '../../models/observation';

@Injectable({
  providedIn: 'root'
})
export class ObservationService {

  constructor(private http: HttpClient) { }

  getObservations(profileId: string): Observable<Observation[]> {
    return this.http.get<Observation[]>(`${environment.apiUrl}/profiles/${profileId}/observations`, {withCredentials: true});
  }
}
