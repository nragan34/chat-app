import { Component, Input, OnInit } from '@angular/core';
import { Husq } from 'src/app/interfaces/husq';
import {HusqTimelineService} from "../../services/husq-timeline.service";

@Component({
  selector: 'app-husq',
  templateUrl: './husq.component.html',
  styleUrls: ['./husq.component.scss']
})
export class HusqComponent implements OnInit {
  @Input() husqObj: Husq | undefined

  time: Date = new Date()

  tempReply: string | undefined
  reply: Array<string | undefined> = [];

  constructor(private husqTimelineService: HusqTimelineService) { }

  ngOnInit(): void {
  }

  saveReply(): void {
    if (this.tempReply) {
      this.reply.push(this.tempReply);
      this.reply.push('----------')
      this.tempReply = undefined;
    }
  }

  removeHusq(): void {
    if (this.husqObj) {
      this.husqTimelineService.removeHusq(this.husqObj.id)
    }
  }

  
}
