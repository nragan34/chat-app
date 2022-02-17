import { Component, Input, OnInit } from '@angular/core';
import { NewsSource } from 'src/app/interfaces/newsSource';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { NewsManagerService } from 'src/app/services/news/news-manager.service';
import { UserActiveService } from 'src/app/services/user-active.service';

@Component({
  selector: 'app-news-source',
  templateUrl: './news-source.component.html',
  styleUrls: ['./news-source.component.scss']
})
export class NewsSourceComponent implements OnInit {

  @Input() newsSourceObj: NewsSource | undefined
  @Input() discoverNews: boolean | undefined

  activeUserId: string | undefined

  constructor(
    private newsManagerService: NewsManagerService,
    private userActiveService: UserActiveService,
    private localStorageService: LocalStorageService
  ) { 
    // active user
    this.activeUserId = this.userActiveService.getActiveUser();
  }

  ngOnInit(): void {
  }

  trackById(index: number, newsSource: any): number {
    return newsSource.id;
  }


  
  addNewsToSubscription() {
    if (this.newsSourceObj && this.activeUserId) {
      this.newsManagerService.addUserNews(this.newsSourceObj.id, this.activeUserId)
    }
  }

  removeNewsFromSubscription(newsSourceId: string) {
    if(this.activeUserId) {
      this.newsManagerService.removeNews(this.activeUserId, newsSourceId);
    }
  }

}
