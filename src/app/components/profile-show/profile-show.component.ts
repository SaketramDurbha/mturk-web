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
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ProfileShowComponent implements OnInit {
  observations: Observation[];
  expandedObservation: Observation | null;
  displayedObservationColumns: string[] = ['id', 'first_name', 'last_name', 'affiliation', 'city', 'country', 'email'];

  gscholarURLs: MatTableDataSource<URL> = new MatTableDataSource<URL>();

  displayedURLColumns: string[] = ['id', 'url'];
  newGScholarURL: string;

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
    return `https://google.com/search?q=${observation.first_name} ${observation.last_name} ${observation.affiliation}`;
  }

}
