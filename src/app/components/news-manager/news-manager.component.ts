import { Component, Input, OnInit } from '@angular/core';
import { map, Subscription } from 'rxjs';
import { NewsSource } from 'src/app/interfaces/newsSource';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { NewsManagerService } from 'src/app/services/news-config/news-manager.service';
import { UserActiveService } from 'src/app/services/user-active.service';

@Component({
  selector: 'app-news-manager',
  templateUrl: './news-manager.component.html',
  styleUrls: ['./news-manager.component.scss']
})
export class NewsManagerComponent implements OnInit {

  // newsSource$: Subscription
  newsSourceObj: (NewsSource | undefined)[] | undefined
  discoverNews: (NewsSource | undefined)[] | undefined

  activeUserId: string | undefined

  constructor(
    private newsManagerService: NewsManagerService,
    private userActiveService: UserActiveService,
    private localStorageService: LocalStorageService
  ) {
    this.activeUserId = this.userActiveService.getActiveUser();

    // get news source from service and subscribe
    this.newsManagerService.newsSource$.subscribe(newsSource => this.newsSourceObj = newsSource)
  }

  ngOnInit(): void {
    this.newsManagerService.newsSource$.subscribe()
  }

  // load specific news content
  // subscribeToNews(key: string): void {
  //   if (key && this.activeUserId) {
  //     this.newsConfigService.addNews(key, this.activeUserId)
  //   }
  // }

  // remove news from users subscribed list
  removeNews() {
  }

  removeFriend() {

  }

  // add news to users subscribed list
  addUserNews(): void {
  }

  trackById(index: number, newsSource: any): number {
    return newsSource.id
  }

}
