import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { map, Subscription } from 'rxjs';
import { NewsConfig } from 'src/app/interfaces/news-config';
import { NewsConfigService } from 'src/app/services/news-config/news-config.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  // news$: Subscription
  @Input() newsList: NewsConfig | undefined

  Object = Object
  newsOptions: {}
  url: string | undefined
  
  constructor(private newsConfigService: NewsConfigService) {
    this.newsOptions = newsConfigService.newsOptions;

    // load all news
  }
  
  ngOnInit() {
  }

  // load specific news content
  subscribeToNewsOutlet(url: string, key: string) {
    console.log('this is the key.... ',key)

    this.newsConfigService.getConfig(url, key)
      .subscribe(newsList => { this.newsList = newsList })

  }

}
