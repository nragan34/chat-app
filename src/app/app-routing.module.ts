import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FriendsListComponent } from './components/friends-list/friends-list.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ComposeComponent } from './components/compose/compose.component';
import { HusqListComponent } from './components/husq-list/husq-list.component';
import { UserAddComponent } from './components/user-add/user-add.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { HuskEditComponent } from './components/husk-edit/husk-edit.component';
import { AuthComponent } from './components/auth/auth.component';

const routes: Routes = [
  {path: '', component: HusqListComponent, pathMatch: 'full', }, 
  {path: 'auth', component: AuthComponent, pathMatch: 'full'},
  {path: 'edit/:userId', component: HuskEditComponent, pathMatch: 'full', }, 
  {path: 'timeline', component: HusqListComponent, pathMatch: 'full'},
  {path: 'friends/:userId', component: FriendsListComponent}, 
  {path: 'profile/:userId', component: ProfileComponent},
  {path: 'compose', component: ComposeComponent, pathMatch: 'full'},
  {path: 'add-user/:userId', component: UserAddComponent},
  {path: 'user-list/:userId', component: UserListComponent},
  {path: '**', component: PagenotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
