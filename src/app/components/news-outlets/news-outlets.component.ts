import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NewsConfig } from 'src/app/interfaces/news-config';
import { NewsConfigService } from 'src/app/services/config/news-config.service';

@Component({
  selector: 'app-news-outlets',
  templateUrl: './news-outlets.component.html',
  styleUrls: ['./news-outlets.component.scss']
})
export class NewsOutletsComponent implements OnInit {


  Object = Object
  newsOptions: {}

  @Input() newsList: NewsConfig | undefined
  newsSubscription: Subscription | undefined



  constructor(private newsConfigService: NewsConfigService, private router: Router) {
    this.newsOptions = newsConfigService.newsOptions;
  }



  @Input() count: number | undefined;
  @Output() countChanged: EventEmitter<number> = new EventEmitter();

  increment() {
    if (this.count) {
      this.count++;
      this.countChanged.emit(this.count);
    }
  }
  decrement() {
    if (this.count) {
      this.count--;
      this.countChanged.emit(this.count);
    }
  }

  subscribeToNewsOutlet(url: string) {
    this.newsSubscription = this.newsConfigService.getConfig()
      .subscribe(newsList => { this.newsList = newsList })
  }


  ngOnInit(): void {
    // this.newsSubscription = this.newsConfigService.getConfig()
    //   .subscribe(newsList => {this.newsList = newsList})
  }

}
