import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  userActive: string | undefined
  time: Date = new Date()
  tempReply: string | undefined
  reply: Array<string | undefined> = [];

  theRoute: string;
  replyCount: number | undefined;


  constructor(private husqTimelineService: HusqTimelineService, private userActiveService: UserActiveService, private router: Router) { 
    this.userActive = this.userActiveService.getActiveUser();
    this.theRoute = router.url;
    // console.log('router url, ', this.theRoute);
  }

  ngOnInit(): void {
    this.husqTimelineService.husqs$.subscribe(() => {
      if (this.husqObj) {
        this.replyCount = this.husqTimelineService.getHusqReplies(this.husqObj.id).length;

        // console.log('logging husqObj length.... ',this.replyCount)
      }
    });
  }

  removeHusq(): void {
    if (this.husqObj) {
      // console.log('removing husq.... ')
      this.husqTimelineService.removeHusq(this.husqObj.id)
    }
  }

  viewHusq() {
    // get husq by id
    const husqObjId = this.husqTimelineService.getHusqById(this.husqObj?.id);
    // console.log(husqObjId);
  }

  viewHusqComment() {
    if (this.husqObj) {
      this.router.navigate(['/husq', this.husqObj.id]);
    }
  }

  replyToHusq() {
    if (this.husqObj) {
      this.router.navigate(['/husq', this.husqObj.id]);
    }
  }

  saveReply(): void {
    if (this.tempReply) {
      this.reply.push(this.tempReply);
      this.reply.push('----------')
      this.tempReply = undefined;
    }
  }

  
}
