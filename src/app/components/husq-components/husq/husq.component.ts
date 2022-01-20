import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-husq',
  templateUrl: './husq.component.html',
  styleUrls: ['./husq.component.scss']
})
export class HusqComponent implements OnInit {

  @Input() name: string = ''!
  @Input() message: string = ''!

  time: Date = new Date()

  tempReply: string = ''!
  reply: string = ''!
  tempReplyList: string[] = [];

  constructor() { }

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
