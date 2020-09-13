import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Profile } from '../../models/profile';
import { ProfileService } from '../../services/profile/profile.service';

import { Observation } from '../../models/observation';
import { ObservationService } from '../../services/observation/observation.service';

@Component({
  selector: 'app-profile-show',
  templateUrl: './profile-show.component.html',
  styleUrls: ['./profile-show.component.scss'],
})
export class ProfileShowComponent implements OnInit {
  id = this.route.snapshot.paramMap.get('id');
  profile: Profile;

  observations: Observation[];
  displayedObservationColumns: string[] = ['id', 'first_name', 'last_name', 'affiliation', 'city', 'country', 'email'];

  constructor(
    private route: ActivatedRoute,
    private profilesService: ProfileService,
    private observationService: ObservationService
  ) { }

  ngOnInit(): void {
    this.getProfile();
    this.getObservations();
  }

  getProfile(): void {
    this.profilesService.getProfile(this.id).subscribe(profile => this.profile = profile);
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
    const q = [observation.first_name, observation.last_name, observation.affiliation].join(' ');
    return `https://www.linkedin.com/search/results/all/?keywords=${q}`;
  }

  researchgateLink(observation: Observation): string {
    const q = [observation.first_name, observation.last_name].join(' ');
    return `https://www.researchgate.net/search/researcher?q=${q}`;
  }

}
