import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContentComponent } from './components/main-components/content/content.component';
import { HeaderComponent } from './components/main-components/header/header.component';
import { HusqComponent } from './components/husq-components/husq/husq.component';
import { FooterComponent } from './components/main-components/footer/footer.component';
import { NewsComponent } from './components/news-components/news/news.component';
import { FriendsComponent } from './components/friends-components/friends/friends.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PagenotfoundComponent } from './components/error-components/pagenotfound/pagenotfound.component';
import { TimelineComponent } from './components/husq-components/timeline/timeline.component';
import { FriendComponent } from './components/friends-components/friend/friend.component';
import { FormsModule } from '@angular/forms';
import { TimelineService } from './services/timeline.service';
import { NewsTimelineComponent } from './components/news-components/news-timeline/news-timeline.component';

@NgModule({
  declarations: [
    AppComponent,
    ContentComponent,
    HeaderComponent,
    HusqComponent,
    FooterComponent,
    NewsComponent,
    FriendsComponent,
    ProfileComponent,
    PagenotfoundComponent,
    TimelineComponent,
    FriendComponent,
    NewsTimelineComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    TimelineService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
