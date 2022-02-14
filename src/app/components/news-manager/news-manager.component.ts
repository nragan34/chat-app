import { Component, Input, OnInit } from '@angular/core';
import { map, Subscription } from 'rxjs';
import { News } from 'src/app/interfaces/news';
import { NewsConfigService } from 'src/app/services/news-config/news-config.service';
import { UserActiveService } from 'src/app/services/user-active.service';

@Component({
  selector: 'app-news-manager',
  templateUrl: './news-manager.component.html',
  styleUrls: ['./news-manager.component.scss']
})
export class NewsManagerComponent implements OnInit {

  news$: Subscription
  @Input() newsObj: (News | undefined)[] | undefined
  @Input() discoverNews: (News | undefined)[] | undefined

  news: (News | undefined)[] | undefined

  Object = Object // access news object list
  newsOptions: {} // empty object
  activeUserId: string | undefined

  constructor(private newsConfigService: NewsConfigService, private userActiveService: UserActiveService, private activeUserService: UserActiveService) {
    this.activeUserId = this.userActiveService.getActiveUser();
    this.newsOptions = newsConfigService.newsOptions;

    this.news$ = this.newsConfigService.news$
    .pipe (


    )
    .subscribe()

  }

  ngOnInit(): void {
  }

  // load specific news content
  subscribeToNews(key: string): void {
    if (key && this.activeUserId) {
      this.newsConfigService.addNews(key, this.activeUserId)
    }
  }

  // remove news from users subscribed list
  removeNews() {
  }

  removeFriend() {

  }

  // add news to users subscribed list
  addUserNews(): void {
  }

  trackById(index: number, news: any): number {
    return news.id;
  }

}
