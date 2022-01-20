import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { News } from 'src/app/interfaces/news'
import { NewsTimelineService } from '../../../services/news-timeline.service';

@Component({
  selector: 'app-news-timeline',
  templateUrl: './news-timeline.component.html',
  styleUrls: ['./news-timeline.component.scss']
})
export class NewsTimelineComponent implements OnInit {
  myNews$: Subscription
  myNews: News[] | undefined

  @Input() title: string = ''!
  @Input() article: string = ''!

  id = 0;
  newTitle: string =''!
  newArticle: string = ''!


  constructor(private newsTimelineService: NewsTimelineService) { 
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
  trackById(index: number, news: News): number {
    return news.id;
  }


  onSubmit() {
    this.title = this.newTitle;
    this.article = this.newArticle;
    console.log("this.title => " + this.title);
    console.log("this.article => " + this.article);
    this.addNews();
  }

  addNews() {
    this.newsTimelineService.addNews({
      id: null!,
      title: this.newTitle,
      article: this.newArticle
    })
  }

  
}
