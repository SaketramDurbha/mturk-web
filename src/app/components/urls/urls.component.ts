import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';

import { MatTableDataSource } from '@angular/material/table';

import { URL } from '../../models/url';
import { UrlService } from '../../services/url/url.service';

import { Profile } from '../../models/profile';
import { ProfileService } from '../../services/profile/profile.service';
import {User} from '../../models/user';
import {AuthService} from '../../services/auth/auth.service';

@Component({
  selector: 'app-urls',
  templateUrl: './urls.component.html',
  styleUrls: ['./urls.component.scss']
})
export class UrlsComponent implements OnInit {
  @Input() profile: Profile;
  @Input() type: string;

  currentUser: User;

  urls: MatTableDataSource<URL> = new MatTableDataSource<URL>();
  newURL = '';

  prevValid: Profile;
  nextValid: Profile;

  prevNoneValid: Profile;
  nextNoneValid: Profile;

  prevNonEmpty: Profile;
  nextNonEmpty: Profile;

  noneFound: boolean;
  noneFoundComments: string;
  noneFoundUp: number;
  noneFoundDown: number;

  tableDisplayCols: string[];
  addedSet: Set<string>;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private location: Location,
              private urlService: UrlService,
              private profileService: ProfileService,
              private authService: AuthService) {
    this.addedSet = new Set<string>();
  }

  ngOnInit(): void {
    this.tableDisplayCols = ['index', 'url', 'votes', 'valid', 'comments'];

    if (this.type === 'Microsoft') {
      this.tableDisplayCols.push('author-id');
    }

    this.tableDisplayCols.push('file');
    this.tableDisplayCols.push('uploaded');

    this.noneFound = (this.profile[`nonefound_${this.type.toLowerCase()}` as keyof Profile] as boolean);
    this.noneFoundComments = (this.profile[`nonefound_${this.type.toLowerCase()}_comments` as keyof Profile] as string);
    this.noneFoundUp = (this.profile[`nonefound_${this.type.toLowerCase()}_up` as keyof Profile] as number) || 0;
    this.noneFoundDown = (this.profile[`nonefound_${this.type.toLowerCase()}_down` as keyof Profile] as number) || 0;

    this.getURLs();
    this.getPaginates();

    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };

    this.authService.currentUser.subscribe(user => this.currentUser = user);
  }

  getURLs(): void {
    const first: URL = {
      id: '',
      index: -1,
      url: 'None Found',
      valid: this.noneFound,
      up_votes: this.noneFoundUp,
      down_votes: this.noneFoundDown,
      file: '',
      comments: this.noneFoundComments,
    };

    this.urlService.getURLs(this.profile.id, this.type.toLowerCase()).subscribe(urls => this.urls.data =  [first].concat(urls));
  }

  onCommentsFocus(url: URL): void {
    if (this.addedSet.has(`${url.url}_${this.type}`)) {
      return;
    }

    this.addedSet.add(`${url.url}_${this.type}`);

    if (url.comments === '') {
      url.comments = `[${this.currentUser.email}]: `;
      return;
    }

    url.comments = url.comments + `\n[${this.currentUser.email}]: `;
  }

  getPaginates(): void {
    this.profileService.getPrevValids(this.profile.id, this.type.toLowerCase()).subscribe(prevs => {
      if (prevs.length !== 0) {
        this.prevValid = prevs[0];
      }
    });

    this.profileService.getNextValids(this.profile.id, this.type.toLowerCase()).subscribe(nexts => {
      if (nexts.length !== 0) {
        this.nextValid = nexts[0];
      }
    });

    this.profileService.getPrevNoneValids(this.profile.id, this.type.toLowerCase()).subscribe(prevs => {
      if (prevs.length !== 0) {
        this.prevNoneValid = prevs[0];
      }
    });

    this.profileService.getNextNoneValids(this.profile.id, this.type.toLowerCase()).subscribe(nexts => {
      if (nexts.length !== 0) {
        this.nextNoneValid = nexts[0];
      }
    });

    this.profileService.getPrevNonEmptys(this.profile.id, this.type.toLowerCase()).subscribe(prevs => {
      if (prevs.length !== 0) {
        this.prevNonEmpty = prevs[0];
      }
    });

    this.profileService.getNextNonEmptys(this.profile.id, this.type.toLowerCase()).subscribe(nexts => {
      if (nexts.length !== 0) {
        this.nextNonEmpty = nexts[0];
      }
    });
  }

  go(profile: Profile): void {
    this.router.navigate([this.location.normalize(`/profiles/${profile.id}`)]);
  }

  addURL(): void {
    console.log(this.newURL);

    this.urlService.addURL(this.profile.id, this.newURL, this.type.toLowerCase()).subscribe(url => {
      this.urls.data.push(url);
      this.urls.data = this.urls.data;
    }, response => {
        if (response.status === 422) {
          alert('error occurred: ' + response.error.message);
        } else {
          alert('error occurred');
        }
    });
  }

  updateValid(url: URL): void {
    if (url.index !== -1) {
      this.urlService.updateValid(this.profile.id, url.id, this.type.toLowerCase(), url.valid).subscribe(u => url.valid = u.valid);
      return;
    }

    this.urlService.updateNoneFound(this.profile.id, this.type.toLowerCase(), url.valid)
      .subscribe(noneFound => url.valid = noneFound);
  }

  updateComments(url: URL): void {
    if (url.index !== -1) {
      console.log(url);
      console.log(this.type);

      this.urlService.updateComments(this.profile.id, url.id, this.type.toLowerCase(), url.comments).subscribe();
      return;
    }

    this.urlService.updateNoneFoundComments(this.profile.id, this.type.toLowerCase(), url.comments).subscribe();
  }

  upvote(url: URL): void {
    if (url.index !== -1) {
      this.urlService.updateUpvotes(this.profile.id, url.id, this.type.toLowerCase(), url.up_votes + 1)
        .subscribe(u => url.up_votes = u.up_votes);

      return;
    }

    this.profileService.updateNoneFoundUpvotes(this.profile.id, url.id, this.type.toLowerCase(), url.up_votes + 1)
      .subscribe(u => url.up_votes = u.up_votes);
  }

  downvote(url: URL): void {
    if (url.index !== -1) {
      this.urlService.updateDownvotes(this.profile.id, url.id, this.type.toLowerCase(), url.down_votes + 1)
        .subscribe(u => url.down_votes = u.down_votes);
      return;
    }

    this.profileService.updateNoneFoundDownvotes(this.profile.id, url.id, this.type.toLowerCase(), url.down_votes + 1)
      .subscribe(u => url.down_votes = u.down_votes);
  }

  getFileURL(url: URL): string {
    if (url.index === -1) {
      return '';
    }

    if (url.file === '') {
      return 'not uploaded';
    }

    return `<a href="${url.file}" target="_blank">${url.file}</a>`;
  }

  getMicrosoftAuthorId(url: URL): string {
    const regexp: RegExp = /academic.microsoft.com\/author\/(\d+)\//;

    if (url.index === -1 || !regexp.test(url.url)) {
      return '';
    }

    return regexp.exec(url.url)[1];
  }

  getFileName(url: URL): string {
    if (url.index === -1) {
      return '';
    }

    return `${this.profile.id}_${this.type.toLowerCase()}_${url.index}`;
  }

  checkUploaded(url: URL): void {
    this.urlService.checkUploaded(this.profile.id, url.id, this.type.toLowerCase())
      .subscribe(u => {
        url.file = u.file;
      }, response => {
        if (response.status === 422) {
          alert('error occurred: ' + response.error.message);
        } else {
          alert('error occurred');
        }
      });
  }
}
