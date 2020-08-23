import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Component, OnInit } from '@angular/core';
import {Observation} from '../../models/observation';
import {ObservationService} from '../../services/observation/observation.service';

@Component({
  selector: 'app-profile-show',
  templateUrl: './profile-show.component.html',
  styleUrls: ['./profile-show.component.scss']
})
export class ProfileShowComponent implements OnInit {

  observations: Observation[];
  displayedColumns: string[] = ['id', 'first_name', 'last_name', 'affiliation', 'city', 'country', 'email'];

  constructor(
    private route: ActivatedRoute,
    private observationService: ObservationService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getObservations();
  }

  getObservations(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.observationService.getObservations(id).subscribe(observations => {
      this.observations = observations;
      console.log(observations);
    });
  }

}
