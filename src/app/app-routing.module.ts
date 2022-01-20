import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ContentComponent } from './components/main-components/content/content.component';
import { FriendsComponent } from './components/friends-components/friends/friends.component';
import { PagenotfoundComponent } from './components/error-components/pagenotfound/pagenotfound.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  {path: '', component: ContentComponent, pathMatch: 'full', }, 
  {path: 'friends', component: FriendsComponent, pathMatch: 'full'}, 
  {path: 'profile', component: ProfileComponent, pathMatch: 'full'},
  {path: '**', component: PagenotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
