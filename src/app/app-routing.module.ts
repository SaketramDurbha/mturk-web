import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfilesComponent } from './components/profiles/profiles.component';
import { ProfileShowComponent } from './components/profile-show/profile-show.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuardService } from './services/auth/auth-guard.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'profiles', component: ProfilesComponent, canActivate: [AuthGuardService] },
  { path: 'profiles/:id', component: ProfileShowComponent },
  { path: '**', redirectTo: '/login'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
