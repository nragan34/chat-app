import { Component, Input, OnInit } from '@angular/core';
import { NewsConfig } from 'src/app/interfaces/news-config';
import { NewsConfigService } from 'src/app/services/news-config/news-config.service';
import { UserActiveService } from 'src/app/services/user-active.service';

@Component({
  selector: 'app-news-manager',
  templateUrl: './news-manager.component.html',
  styleUrls: ['./news-manager.component.scss']
})
export class NewsManagerComponent implements OnInit {

  @Input() subscribedNews: NewsConfig | undefined
  @Input() discoverNews: boolean | undefined

  Object = Object // access news object list
  newsOptions: {} // empty object
  activeUserId: string | undefined

  constructor(private newsConfigService: NewsConfigService, private userActiveService: UserActiveService) { 
    this.activeUserId = this.userActiveService.getActiveUser();
    this.newsOptions = newsConfigService.newsOptions;
  }

  ngOnInit(): void {
  }

  trackById(index: number, news: any): number {
    return news.id;
  }

  // load specific news content
  subscribeToNewsOutlet(url: string, key: string) {
   const newsOutlet =  this.newsConfigService.getConfig(url, key)
      .subscribe(newsList => { this.subscribedNews = newsList })
  }

  // remove news from users subscribed list
  removeNews() {

  }

  // add news to users subscribed list
  addUserNews(): void {
    
  }


}
