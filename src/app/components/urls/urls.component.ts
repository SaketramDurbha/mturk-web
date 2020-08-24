import { Component, OnInit, Input } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';

import { URL } from '../../models/url';
import { UrlService } from '../../services/url/url.service';

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

  constructor(private urlService: UrlService) { }

  ngOnInit(): void {
    this.getURLs();
  }

  getURLs(): void {
    this.urlService.getURLs(this.profileId, this.type.toLowerCase()).subscribe(urls => this.urls.data = urls);
  }

  addURL(): void {
    this.urlService.addURL(this.profileId, this.newURL, this.type.toLowerCase()).subscribe(url => {
      this.urls.data.push(url);
      this.urls.data = this.urls.data;
    });
  }

  updateValid(id: string, valid: boolean): void {
    this.urlService.updateValid(this.profileId, id, this.type.toLowerCase(), valid).subscribe(obj => console.log(obj));
  }


}
