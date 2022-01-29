import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContentComponent } from './components/content/content.component';
import { HeaderComponent } from './components/header/header.component';
import { HusqComponent } from './components/husq/husq.component';
import { FooterComponent } from './components/footer/footer.component';
import { NewsComponent } from './components/news/news.component';
import { FriendsListComponent } from './components/friends-list/friends-list.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { HusqListComponent } from './components/husq-list/husq-list.component';
import { FriendComponent } from './components/friend/friend.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HusqTimelineService } from './services/husq-timeline.service';
import { NewsTimelineComponent } from './components/news-list/news-timeline.component';
import { ComposeComponent } from './components/compose/compose.component';
import { NewsTimelineService } from './services/news-timeline.service';
import { UsersService } from './services/users.service';
import { UserAddComponent } from './components/user-add/user-add.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserComponent } from './components/user/user.component';
import { HuskEditComponent } from './components/husk-edit/husk-edit.component';
import { AuthComponent } from './components/auth/auth.component';
import { AuthGuard } from './guard/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    ContentComponent,
    HeaderComponent,
    HusqComponent,
    FooterComponent,
    NewsComponent,
    FriendsListComponent,
    ProfileComponent,
    PagenotfoundComponent,
    HusqListComponent,
    FriendComponent,
    NewsTimelineComponent,
    ComposeComponent,
    UserAddComponent,
    UserListComponent,
    UserComponent,
    HuskEditComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
