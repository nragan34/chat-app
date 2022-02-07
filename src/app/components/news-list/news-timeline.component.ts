import { Component, Input, OnInit } from '@angular/core';
import { map, Subscription } from 'rxjs';
import { NewsConfig } from 'src/app/interfaces/news-config';
import { NewsConfigService } from 'src/app/services/config/news-config.service';

@Component({
  selector: 'app-news-timeline',
  templateUrl: './news-timeline.component.html',
  styleUrls: ['./news-timeline.component.scss']
})
export class NewsTimelineComponent implements OnInit {

  
  newsConfig$: Subscription
  newsList: NewsConfig | undefined

  constructor(
    private newsConfigService: NewsConfigService
  ) { 
    this.newsConfig$ = this.newsConfigService.getConfig()
    .subscribe(newsList => {this.newsList = newsList})
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
  }

    onSubmit() {
  }

}
