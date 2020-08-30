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
  @Input() profileId: string;
  @Input() type: string;

  urls: MatTableDataSource<URL> = new MatTableDataSource<URL>();
  newURL: string;

  prev: Profile;
  next: Profile;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private location: Location,
              private urlService: UrlService,
              private profileService: ProfileService) { }

  ngOnInit(): void {
    this.getURLs();
    this.getPrev();
    this.getNext();

    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
  }

  getURLs(): void {
    this.urlService.getURLs(this.profileId, this.type.toLowerCase()).subscribe(urls => this.urls.data = urls);
  }

  getPrev(): void {
    this.profileService.getPrevs(this.profileId, this.type.toLowerCase()).subscribe(prevs => {
      if (prevs.length !== 0) {
        this.prev = prevs[0];
      }
    });
  }

  getNext(): void {
    this.profileService.getNexts(this.profileId, this.type.toLowerCase()).subscribe(nexts => {
      if (nexts.length !== 0) {
        this.next = nexts[0];
      }
    });
  }

  goPrev(): void {
    this.router.navigate([this.location.normalize(`/profiles/${this.prev.id}`)]);
  }

  goNext(): void {
    this.router.navigate([this.location.normalize(`/profiles/${this.next.id}`)]);
  }

  addURL(): void {
    this.urlService.addURL(this.profileId, this.newURL, this.type.toLowerCase()).subscribe(url => {
      this.urls.data.push(url);
      this.urls.data = this.urls.data;
    });
  }

  updateValid(url: URL): void {
    this.urlService.updateValid(this.profileId, url.id, this.type.toLowerCase(), url.valid).subscribe(u => url.valid = u.valid);
  }

  upvote(url: URL): void {
    this.urlService.updateUpvotes(this.profileId, url.id, this.type.toLowerCase(), url.up_votes + 1)
      .subscribe(u => url.up_votes = u.up_votes);
  }

  downvote(url: URL): void {
    this.urlService.updateDownvotes(this.profileId, url.id, this.type.toLowerCase(), url.down_votes + 1)
      .subscribe(u => url.down_votes = u.down_votes);
  }


}
