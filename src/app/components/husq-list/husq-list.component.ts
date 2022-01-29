import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Husq } from 'src/app/interfaces/husq';
import { HusqTimelineService } from 'src/app/services/husq-timeline.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './husq-list.component.html',
  styleUrls: ['./husq-list.component.scss']
})
export class HusqListComponent implements OnInit, OnDestroy {
  husqs$: Subscription
  husqs: Husq[] | undefined

  // initialize values 
  constructor(private husqTimelineService: HusqTimelineService) {
    this.husqs$ = this.husqTimelineService.husqs$.subscribe(husqs => {
      this.husqs = husqs
    })
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
