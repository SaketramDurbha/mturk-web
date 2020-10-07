import {Component, NgZone, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {first} from 'rxjs/operators';
import {Router} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  googleAuth: gapi.auth2.GoogleAuth;
  gapiSetup = false;

  user: gapi.auth2.GoogleUser;
  error: any;

  constructor(private router: Router, public authService: AuthService, private location: Location, private ngZone: NgZone) { }

  ngOnInit(): void {

    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
  }

  initGoogleAuth(): void {
    this.googleAuth = gapi.auth2.init({
      client_id: '95747709212-jshr437m28nge5h5i0asung3nk46lld0.apps.googleusercontent.com'
    });
  }

  async authenticate(): Promise<gapi.auth2.GoogleUser> {
    // Initialize gapi if not done yet
    if (!this.gapiSetup) {
      await this.initGoogleAuth();
    }

    return new Promise(async () => {
      await this.googleAuth.signIn().then(
        user => {
          const idToken = user.getAuthResponse().id_token;

          this.authService.login(idToken).pipe(first()).subscribe(data => {
            this.ngZone.run(() => this.router.navigate([this.location.normalize(`/profiles`)]));
          }, error => {
            this.error = error;
            console.log(error);
          });
        },
        error => {
          this.error = error;
          console.log(error);
        });
    });
  }

}
