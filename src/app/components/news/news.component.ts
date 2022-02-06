import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, Subscription } from 'rxjs';
import { Config } from 'src/app/interfaces/config';
import { News } from 'src/app/interfaces/news';
import { ConfigService } from 'src/app/services/config/config.service';
import { NewsTimelineService } from 'src/app/services/news-timeline.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  newsList: Config | undefined

  constructor(private newsConfigService: ConfigService) {
    
  }

  ngOnInit() {
    this.getNews();
  }

  getNews(): void {
    this.newsConfigService.getConfig()
      .subscribe(newsList => {this.newsList = newsList})
  }

}
