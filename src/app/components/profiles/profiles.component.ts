import { Component, OnInit, ViewChild } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

import { Profile } from '../../models/profile';
import { ProfileService } from '../../services/profile/profile.service';
import {AuthService} from '../../services/auth/auth.service';
import {User} from '../../models/user';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss']
})
export class ProfilesComponent implements OnInit {
  currentUser: User;

  nonefoundColor = 'yellow';
  notNonefoundColor = 'none';

  profiles: MatTableDataSource<Profile> = new MatTableDataSource<Profile>();
  displayedColumns: string[] = ['id', 'num_gscholar', 'num_linkedin', 'num_researchgate', 'num_microsoft', 'num_website', 'num_cv', 'num_dissertation'];

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private profileService: ProfileService, private authService: AuthService) {}

  ngOnInit(): void {
    this.profiles.sort = this.sort;
    this.getProfiles();

    this.authService.currentUser.subscribe(user => this.currentUser = user);
  }

  getProfiles(): void {
    this.profileService.getProfiles().subscribe(profiles => this.profiles.data = profiles );
  }

}
