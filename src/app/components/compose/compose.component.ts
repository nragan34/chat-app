import { Component, OnInit } from '@angular/core';
import { HusqTimelineService } from "../../services/husq-timeline.service";
import { v4 as uuidv4 } from "uuid";
import {Router} from "@angular/router";
import { UsersService } from 'src/app/services/users.service';
import { UserActiveService } from 'src/app/services/user-active.service';

@Component({
  selector: 'app-compose',
  templateUrl: './compose.component.html',
  styleUrls: ['./compose.component.scss']
})
export class ComposeComponent implements OnInit {
  message: string = ''
  activeUserId: string | undefined

  constructor(private husqTimelineService: HusqTimelineService, private router: Router, private activeUserService: UserActiveService) {
    this.activeUserId = this.activeUserService.getActiveUser();
   }

  ngOnInit(): void {
  }

  addHusq(): void {
    if (this.message && this.activeUserId) {
      this.husqTimelineService.addHusq({
        id: uuidv4(),
        userId: this.activeUserId,
        time: new Date(),
        message: this.message
      })
      this.router.navigate(['/'])
    }
  }
}
