import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { map, Subscription } from 'rxjs';
import { NewsConfig } from 'src/app/interfaces/news-config';
import { NewsConfigService } from 'src/app/services/config/news-config.service';
import { NewsOutletsComponent } from '../news-outlets/news-outlets.component';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  newsList: NewsConfig | undefined
  newsSubscription: Subscription | undefined

  constructor(private newsConfigService: NewsConfigService) {
    console.log('logging newsList', this.newsList)
  }


  title = 'Component Interaction';
  Counter = 5;
 
  countChangedHandler(count: number) {
    this.Counter = count;
    console.log(count);
  }

  
  ngOnInit() {
    
  }

}
