import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observation } from '../../models/observation';
import { ObservationService } from '../../services/observation/observation.service';

@Component({
  selector: 'app-profile-show',
  templateUrl: './profile-show.component.html',
  styleUrls: ['./profile-show.component.scss'],
})
export class ProfileShowComponent implements OnInit {
  id = this.route.snapshot.paramMap.get('id');

  observations: Observation[];
  displayedObservationColumns: string[] = ['id', 'first_name', 'last_name', 'affiliation', 'city', 'country', 'email'];

  displayedSearchURLColumns: string[] = ['google_search', 'gscholar_search', 'linkedin_search'];

  constructor(
    private route: ActivatedRoute,
    private observationService: ObservationService
  ) { }

  ngOnInit(): void {
    this.getObservations();
  }

  getObservations(): void {
    this.observationService.getObservations(this.id).subscribe(observations => this.observations = observations);
  }

  googleLink(observation: Observation): string {
    const q = [observation.first_name, observation.last_name, observation.affiliation].join(' ');
    return `https://google.com/search?q=${q}`;
  }

  gscholarLink(observation: Observation): string {
    const q = [observation.first_name, observation.last_name].join(' ');
    return `https://scholar.google.com/citations?view_op=search_authors&hl=en&mauthors=${q}`;
  }

  linkedinLink(observation: Observation): string {
    const q = [observation.first_name, observation.last_name].join(' ');
    return `https://www.linkedin.com/search/results/all/?keywords=${q}`;
  }

}
