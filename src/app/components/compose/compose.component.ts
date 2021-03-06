import { Component, OnInit } from '@angular/core';
import { HusqTimelineService } from "../../services/husq-timeline.service";
import { v4 as uuidv4 } from "uuid";
import {Router} from "@angular/router";
import { UserActiveService } from 'src/app/services/user-active.service';

@Component({
  selector: 'app-compose',
  templateUrl: './compose.component.html',
  styleUrls: ['./compose.component.scss']
})
export class ComposeComponent implements OnInit {
  message: string = ''
  userActive: string | undefined

  constructor(private husqTimelineService: HusqTimelineService, private router: Router, private activeUserService: UserActiveService) {
    this.userActive = this.activeUserService.getActiveUser();
   }

  ngOnInit(): void {
  }

  addHusq(): void {
    if (this.message && this.userActive) {
      this.husqTimelineService.addHusq({
        id: uuidv4(),
        userId: this.userActive,
        time: new Date(),
        message: this.message
      })
      this.router.navigate(['/'])
    }
  }
}
