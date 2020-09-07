import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';

import { MatTableDataSource } from '@angular/material/table';

import { URL } from '../../models/url';
import { UrlService } from '../../services/url/url.service';

import { Profile } from '../../models/profile';
import { ProfileService } from '../../services/profile/profile.service';

@Component({
  selector: 'app-urls',
  templateUrl: './urls.component.html',
  styleUrls: ['./urls.component.scss']
})
export class UrlsComponent implements OnInit {
  @Input() profile: Profile;
  @Input() profileId: string;
  @Input() type: string;

  urls: MatTableDataSource<URL> = new MatTableDataSource<URL>();
  newURL: string;

  prev: Profile;
  next: Profile;

  prevNoneFound: Profile;
  nextNoneFound: Profile;

  noneFound: boolean;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private location: Location,
              private urlService: UrlService,
              private profileService: ProfileService) { }

  ngOnInit(): void {
    this.noneFound = (this.profile[`nonefound_${this.type.toLowerCase()}` as keyof Profile] as boolean);

    this.getURLs();
    this.getPaginates();

    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
  }

  getURLs(): void {
    this.urlService.getURLs(this.profile.id, this.type.toLowerCase()).subscribe(urls => this.urls.data = urls);
  }

  getPaginates(): void {
    this.profileService.getPrevs(this.profile.id, this.type.toLowerCase()).subscribe(prevs => {
      if (prevs.length !== 0) {
        this.prev = prevs[0];
      }
    });

    this.profileService.getNexts(this.profile.id, this.type.toLowerCase()).subscribe(nexts => {
      if (nexts.length !== 0) {
        this.next = nexts[0];
      }
    });

    this.profileService.getPrevNoneFounds(this.profile.id, this.type.toLowerCase()).subscribe(prevs => {
      if (prevs.length !== 0) {
        this.prevNoneFound = prevs[0];
      }
    });

    this.profileService.getNextNoneFounds(this.profile.id, this.type.toLowerCase()).subscribe(nexts => {
      if (nexts.length !== 0) {
        this.nextNoneFound = nexts[0];
      }
    });
  }

  go(profile: Profile): void {
    this.router.navigate([this.location.normalize(`/profiles/${profile.id}`)]);
  }

  addURL(): void {
    this.urlService.addURL(this.profile.id, this.newURL, this.type.toLowerCase()).subscribe(url => {
      this.urls.data.push(url);
      this.urls.data = this.urls.data;
    });
  }

  updateNoneFound(): void {
    this.urlService.updateNoneFound(this.profile.id, this.type.toLowerCase(), this.noneFound)
      .subscribe(noneFound => this.noneFound = noneFound);
  }

  updateValid(url: URL): void {
    this.urlService.updateValid(this.profile.id, url.id, this.type.toLowerCase(), url.valid).subscribe(u => url.valid = u.valid);
  }

  upvote(url: URL): void {
    this.urlService.updateUpvotes(this.profile.id, url.id, this.type.toLowerCase(), url.up_votes + 1)
      .subscribe(u => url.up_votes = u.up_votes);
  }

  downvote(url: URL): void {
    this.urlService.updateDownvotes(this.profile.id, url.id, this.type.toLowerCase(), url.down_votes + 1)
      .subscribe(u => url.down_votes = u.down_votes);
  }


}
