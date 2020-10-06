import { Component, OnInit, ViewChild } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

import { Profile } from '../../models/profile';
import { ProfileService } from '../../services/profile/profile.service';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss']
})
export class ProfilesComponent implements OnInit {
  nonefoundColor = 'yellow';
  notNonefoundColor = 'none';

  profiles: MatTableDataSource<Profile> = new MatTableDataSource<Profile>();
  displayedColumns: string[] = ['id', 'num_gscholar', 'num_linkedin', 'num_researchgate', 'num_microsoft', 'num_website', 'num_cv', 'num_dissertation'];

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
    this.profiles.sort = this.sort;

    this.getProfiles();
  }

  getProfiles(): void {
    this.profileService.getProfiles().subscribe(profiles => this.profiles.data = profiles );
  }

}
