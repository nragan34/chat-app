import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, Subscription } from 'rxjs';
import { Husq, HusqWithName } from 'src/app/interfaces/husq';
import { Users } from 'src/app/interfaces/users';
import { FriendsService } from 'src/app/services/friends.service';
import { HusqTimelineService } from 'src/app/services/husq-timeline.service';
import { UserActiveService } from 'src/app/services/user-active.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './husq-list.component.html',
  styleUrls: ['./husq-list.component.scss']
})
export class HusqListComponent implements OnInit, OnDestroy {
  husqs$: Subscription;
  husqs: HusqWithName[] | undefined;

  // initialize values 
  constructor(
    private husqTimelineService: HusqTimelineService, 
    private userActiveService: UserActiveService, 
    private userService: UsersService,
    private friendService: FriendsService
    ) {
    const activeUserId = this.userActiveService.getActiveUser();
    this.husqs$ = this.husqTimelineService.husqs$
    .pipe(
      map((husqs) => {
        const friends = this.friendService.getFriendsIdsByActiveUserId(activeUserId);
        return husqs.filter((husq) => !husq.repliesTo && (friends.includes(husq.userId) || husq.userId === activeUserId))
      })
      // map((husqs) => {
      //   return husqs.map((husq) => {
      //     const user = this.userService.getUserById(husq.userId);
      //     return { ...husq, name: user?.name };
      //   });
      // })
    )
      .subscribe(husq => this.husqs = husq)
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

  trackById(index: number, husq: HusqWithName): string {
    return husq.id;
  }

}
