import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  
  @Input() title: string = ''!
  @Input() article: string = ''!

  constructor() { }

  time: Date = new Date()
  
  tempReply: string = ''!
  reply: string = ''!
  tempReplyList: string[] = [];

  ngOnInit(): void {
  }

  saveReply(): void {
    this.reply = this.tempReply;
    this.tempReplyList.push(this.reply);
    this.tempReplyList.push(this.time.toLocaleString());
    this.tempReplyList.push("-------------");
    this.tempReply = '';
  }

}
