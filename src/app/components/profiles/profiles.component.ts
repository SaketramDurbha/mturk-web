import { Component, OnInit } from '@angular/core';
import {ProfileService} from '../../services/profile/profile.service';
import {Profile} from '../../models/profile';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss']
})
export class ProfilesComponent implements OnInit {

  profiles: Profile[];
  displayedColumns: string[] = ['id'];

  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
    this.getProfiles();
  }

  getProfiles(): void {
    this.profileService.getProfiles().subscribe(profiles => {
      this.profiles = profiles;
    });
  }

}
