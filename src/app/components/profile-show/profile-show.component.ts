import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import {animate, state, style, transition, trigger} from '@angular/animations';

import {Observation} from '../../models/observation';
import {URL} from '../../models/url';
import {ObservationService} from '../../services/observation/observation.service';
import {UrlService} from '../../services/url/url.service';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-profile-show',
  templateUrl: './profile-show.component.html',
  styleUrls: ['./profile-show.component.scss'],
})
export class ProfileShowComponent implements OnInit {
  observations: Observation[];
  displayedObservationColumns: string[] = ['id', 'first_name', 'last_name', 'affiliation', 'city', 'country', 'email'];

  gscholarURLs: MatTableDataSource<URL> = new MatTableDataSource<URL>();
  newGScholarURL: string;

  displayedSearchURLColumns: string[] = ['google_search', 'gscholar_search'];

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

    this.observationService.getObservations(id).subscribe(observations => this.observations = observations);
  }

  getURLs(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.urlService.getURLs(id, 'gscholar').subscribe(urls => this.gscholarURLs.data = urls);
  }

  addGScholarURL(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.urlService.addURL(id, this.newGScholarURL, 'gscholar').subscribe(url => {
      this.gscholarURLs.data.push(url);
      this.gscholarURLs.data = this.gscholarURLs.data;
    });
  }

  updateValid(urlId: string, valid: boolean): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.urlService.updateValid(id, urlId, 'gscholar', valid).subscribe(obj => console.log(obj));
  }

  googleLink(observation: Observation): string {
    const q = [observation.first_name, observation.last_name, observation.affiliation].join(' ');

    return `https://google.com/search?q=${q}`;
  }

  gscholarLink(observation: Observation): string {
    const q = [observation.first_name, observation.last_name].join(' ');

    return `https://scholar.google.com/citations?view_op=search_authors&hl=en&mauthors=${q}`;
  }

}
