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
import { ComposeComponent } from './components/compose/compose.component';
import { UserAddComponent } from './components/user-add/user-add.component';
import { HuskEditComponent } from './components/husk-edit/husk-edit.component';
import { AuthComponent } from './components/auth/auth.component';
import { AuthGuard } from './guard/auth.guard';
import { NewsConfigComponent } from './components/config/news-config.component';
import { NewsManagerComponent } from './components/news-manager/news-manager.component';
import { HusqViewComponent } from './components/husq-view/husq-view.component';
import { UsernamePipe } from './pipes/username.pipe';

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
    ComposeComponent,
    UserAddComponent,
    HuskEditComponent,
    AuthComponent,
    NewsConfigComponent,
    NewsManagerComponent,
    HusqViewComponent,
    UsernamePipe
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
