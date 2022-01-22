import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { News } from 'src/app/interfaces/news'
import { NewsTimelineService } from '../../services/news-timeline.service';
import { v4 as uuidv4 } from 'uuid';
import {Router} from "@angular/router";

@Component({
  selector: 'app-news-timeline',
  templateUrl: './news-timeline.component.html',
  styleUrls: ['./news-timeline.component.scss']
})
export class NewsTimelineComponent implements OnInit {
  myNews$: Subscription
  myNews: News[] | undefined

  @Input() newsObj: News | undefined

  @Input() title: string = ''
  @Input() article: string = ''

  newTitle: string = ''
  newArticle: string = ''


  constructor(private newsTimelineService: NewsTimelineService, private router: Router) { 
    this.myNews$ = this.newsTimelineService.myNews$.subscribe(myNews => {
      console.log(myNews);
      this.myNews = myNews
    })
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.myNews$.unsubscribe
  }

  // colon what you are returning for typescript
  trackById(index: number, news: News): string {
    return news.id;
  }

    onSubmit() {
    this.title = this.newTitle;
    this.article = this.newArticle;
    this.addNews();
  }

  addNews(): void {
    this.newTitle = this.title;
    this.newArticle = this.article;

    if (this.title) {
      this.newsTimelineService.addNews({
      id: uuidv4,
      title: this.newTitle,
      article: this.newArticle
      })
    }
  }

  
}
