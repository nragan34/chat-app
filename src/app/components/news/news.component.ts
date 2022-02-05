import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { News } from 'src/app/interfaces/news';
import { NewsTimelineService } from 'src/app/services/news-timeline.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  myNews$: Subscription
  myNews: News[] | undefined

  @Input() newsObj: News | undefined

  @Input() title: string = ''
  @Input() article: string = ''

  newTitle: string = ''
  newArticle: string = ''


  constructor(private newsTimelineService: NewsTimelineService, private router: Router) { 
    this.myNews$ = this.newsTimelineService.myNews$.subscribe(myNews => {
      this.myNews = myNews
    })
  }

  ngOnInit(): void {
  }

  saveReply(): void {

  }

  onSubmit(): void {
    
  }

}
