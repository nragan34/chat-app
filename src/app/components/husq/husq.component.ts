import { Component, Input, OnInit } from '@angular/core';
import { Husq } from 'src/app/interfaces/husq';
import { Users } from 'src/app/interfaces/users';
import { UserActiveService } from 'src/app/services/user-active.service';
import {HusqTimelineService} from "../../services/husq-timeline.service";

@Component({
  selector: 'app-husq',
  templateUrl: './husq.component.html',
  styleUrls: ['./husq.component.scss']
})
export class HusqComponent implements OnInit {
  @Input() husqObj: Husq & Users | undefined

  userActiveId: string | undefined
  time: Date = new Date()
  tempReply: string | undefined
  reply: Array<string | undefined> = [];

  constructor(private husqTimelineService: HusqTimelineService, private userActive: UserActiveService) { 
    this.userActive.activeUser$.subscribe(userId => this.userActiveId = userId)
  }

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
