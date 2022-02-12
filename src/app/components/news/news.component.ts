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

  @Input() newsList: NewsConfig | undefined

  Object = Object // access news object list
  newsOptions: {} // empty object
  url: string | undefined
  
  constructor(private newsConfigService: NewsConfigService) {
    // get news object
    this.newsOptions = newsConfigService.newsOptions;
  }
  
  ngOnInit() {
  }

  // load specific news content
  subscribeToNewsOutlet(url: string, key: string) {
    this.newsConfigService.getConfig(url, key)
      .subscribe(newsList => { this.newsList = newsList })
  }

}
