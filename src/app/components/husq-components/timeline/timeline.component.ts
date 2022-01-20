import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { Husq } from 'src/app/interfaces/husq';
import { TimelineService } from 'src/app/services/timeline.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit, OnDestroy {
  husqs$: Subscription
  husqs: Husq[] | undefined

  // initialize values 
  constructor(private timelineService: TimelineService) {
    // this.husqs = this.timelineService.husqs
    this.husqs$ = this.timelineService.husqs$.subscribe(husqs => {
      console.log(husqs);
      this.husqs = husqs
    });
  }

  // lifecycle: component goes through different lifecycles
  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.husqs$.unsubscribe
  }

  // colon what you are returning for typescript
  trackById(index: number, husq: Husq): number {
    return husq.id;
  }


  addHusq() {
    this.timelineService.addHusq( {
      id: 6,
      name: 'Add husq button',
      message: 'see if it works'
    })
  }

  
}
