import { Component, OnInit } from '@angular/core';
import { HusqTimelineService } from "../../services/husq-timeline.service";
import { v4 as uuidv4 } from "uuid";
import {Router} from "@angular/router";
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-compose',
  templateUrl: './compose.component.html',
  styleUrls: ['./compose.component.scss']
})
export class ComposeComponent implements OnInit {
  message: string = ''

  constructor(private husqTimelineService: HusqTimelineService, private usersService: UsersService, private router: Router) { }

  ngOnInit(): void {
  }

  addHusq(): void {
    if (this.message) {
      this.husqTimelineService.addHusq({
        id: uuidv4(),
        name: "Nick Ragan",
        time: new Date(),
        message: this.message
      })
      this.router.navigate(['/'])
    }
  }
}
