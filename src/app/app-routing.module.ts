import { NgModule } from '@angular/core';
import { PreloadingStrategy, RouterModule, Routes, UrlSerializer } from '@angular/router';
import { FriendsListComponent } from './components/friends-list/friends-list.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ComposeComponent } from './components/compose/compose.component';
import { HusqListComponent } from './components/husq-list/husq-list.component';
import { UserAddComponent } from './components/user-add/user-add.component';
import { HuskEditComponent } from './components/husk-edit/husk-edit.component';
import { AuthComponent } from './components/auth/auth.component';
import { AuthGuard } from './guard/auth.guard';
import { NewsComponent } from './components/news/news.component';
import { NewsTimelineComponent } from './components/news-list/news-timeline.component';


const routes: Routes = [
  { path: '', component: HusqListComponent, pathMatch: 'full', canActivate: [AuthGuard]},
  { path: 'edit/:userId', component: HuskEditComponent, pathMatch: 'full', canActivate: [AuthGuard]},
  { path: 'friends/:userId', component: FriendsListComponent, pathMatch: 'full', canActivate: [AuthGuard]},
  { path: 'profile/:userId', component: ProfileComponent, pathMatch: 'full'},
  // { path: 'compose', component: ComposeComponent, pathMatch: 'full', canActivate: [AuthGuard]},
  { path: 'sign-up', component: UserAddComponent, pathMatch: 'full'},
  { path: 'news', component: NewsTimelineComponent, pathMatch: 'full'},
  { path: 'auth/logout', component: AuthComponent, pathMatch: 'full', canActivate: [AuthGuard]},
  { path: 'auth/login', component: AuthComponent, pathMatch: 'full' },
  
  { path: '**', component: PagenotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes, {
    scrollPositionRestoration: 'enabled',
    paramsInheritanceStrategy: 'always',
    relativeLinkResolution: 'corrected',
    malformedUriErrorHandler:
                  (error: URIError, urlSerializer: UrlSerializer, url:string) =>
                    urlSerializer.parse("/pagenotfound")
  })
  ],
  exports: [RouterModule],
  providers: [
  ]
})
export class AppRoutingModule { }
