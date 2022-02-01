import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Husq } from 'src/app/interfaces/husq';
import { HusqTimelineService } from 'src/app/services/husq-timeline.service';
import { UserActiveService } from 'src/app/services/user-active.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './husq-list.component.html',
  styleUrls: ['./husq-list.component.scss']
})
export class HusqListComponent implements OnInit, OnDestroy {
  husqs$: Subscription
  husqs: Husq[] | undefined
  userActiveId: string | undefined

  // initialize values 
  constructor(private husqTimelineService: HusqTimelineService, private userActive: UserActiveService) {
    this.husqs$ = this.husqTimelineService.husqs$.subscribe(husqs => {
      this.husqs = husqs
    }),
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
  trackById(index: number, husq: Husq): string {
    return husq.id;
  }
}
