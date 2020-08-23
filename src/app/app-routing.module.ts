import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfilesComponent } from './components/profiles/profiles.component';
import { ProfileShowComponent } from './components/profile-show/profile-show.component';

const routes: Routes = [
  { path: 'profiles', component: ProfilesComponent },
  { path: 'profiles/:id', component: ProfileShowComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
