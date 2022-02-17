import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { News } from 'src/app/interfaces/news';
import { NewsConfigService } from 'src/app/services/news/news-config.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  @Input() newsList: News | undefined

  Object = Object // access news object list
  // newsOptions: {} // empty object
  url: string | undefined
  
  constructor(private newsConfigService: NewsConfigService) {
    // get news object
    // this.newsOptions = newsConfigService.newsOptions;
  }
  
  ngOnInit() {
  }

  // load specific news content
  // readNewsOutlet(url: string, key: string) {
  //   this.newsConfigService.getConfig(url, key)
  //     .subscribe(newsList => { this.newsList = newsList })
  // }

  trackById(index: number, newsSource: any): number {
    return newsSource.id
  }
  
}
