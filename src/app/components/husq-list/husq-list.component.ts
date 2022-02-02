import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, Subscription } from 'rxjs';
import { Husq } from 'src/app/interfaces/husq';
import { Users } from 'src/app/interfaces/users';
import { HusqTimelineService } from 'src/app/services/husq-timeline.service';
import { UserActiveService } from 'src/app/services/user-active.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './husq-list.component.html',
  styleUrls: ['./husq-list.component.scss']
})
export class HusqListComponent implements OnInit, OnDestroy {
  husqs$: Subscription
  husqs: any[] | undefined
  userActiveId: string | undefined

  // initialize values 
  constructor(private husqTimelineService: HusqTimelineService, private userActive: UserActiveService, private userService: UsersService) {
    this.husqs$ = this.husqTimelineService.husqs$
      .pipe(
        map(husqs => {
          return husqs.map(husq => {
            const user = this.userService.getUserById(husq.id);
            return {...husq, name: user?.name}
          })
        })
      ).subscribe(husq => this.husqs = husq),

      this.userActive.activeUser$.subscribe(userId => this.userActiveId = userId)
  }

  // lifecycle: component goes through different lifecycles
  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.husqs$.unsubscribe()
  }

  confirmExit() {
    return confirm(`Are you sure you want to exit ?`)
  }

  // colon what you are returning for typescript
  trackById(index: number, husq: Husq & Users): string {
    return husq.id;
  }
}
