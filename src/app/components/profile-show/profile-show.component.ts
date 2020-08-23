import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Component, OnInit } from '@angular/core';
import {Observation} from '../../models/observation';
import {URL} from '../../models/url';
import {ObservationService} from '../../services/observation/observation.service';
import {UrlService} from '../../services/url/url.service';

@Component({
  selector: 'app-profile-show',
  templateUrl: './profile-show.component.html',
  styleUrls: ['./profile-show.component.scss']
})
export class ProfileShowComponent implements OnInit {

  observations: Observation[];
  displayedObservationColumns: string[] = ['id', 'first_name', 'last_name', 'affiliation', 'city', 'country', 'email'];

  gscholarURLs: URL[];

  displayedURLColumns: string[] = ['id', 'url', 'valid'];

  constructor(
    private route: ActivatedRoute,
    private observationService: ObservationService,
    private urlService: UrlService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getObservations();
    this.getURLs();
  }

  getObservations(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.observationService.getObservations(id).subscribe(observations => {
      this.observations = observations;
      console.log(observations);
    });
  }

  getURLs(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.urlService.getURLs(id, 'gscholar').subscribe(urls => {
      this.gscholarURLs = urls;
      console.log(urls);
    });
  }

}
