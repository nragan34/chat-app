import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Husq, HusqWithName } from 'src/app/interfaces/husq';
import { HusqTimelineService } from 'src/app/services/husq-timeline.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-husq-view',
  templateUrl: './husq-view.component.html',
  styleUrls: ['./husq-view.component.scss']
})
export class HusqViewComponent implements OnInit {

  husq: HusqWithName | undefined;
  husqReplies: Husq | undefined

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private timelineService: HusqTimelineService,
    private userService: UsersService
  ) {

    this.activeRoute.paramMap.subscribe((params) => {
      // get url param
      const husqId = params.get('husqId');
      if (husqId) {
        // get individual husq by id
        const husq = this.timelineService.getHusqById(husqId);
        if (husq) {
          // get user by husq.userId
          const user = this.userService.getUserById(husq.userId);
          // create husq object, spreading husq properties, setting husq.name property
          this.husq = {
            ...husq,
            name: user?.name
          };
        } else {
          this.router.navigate(['']);
        }
      }
    });

  }

  ngOnInit(): void {
    console.log('logging husq', this.husq)
  }

  // recursion through replies
  getReplies(id: string | undefined): HusqWithName[] {

    // this.recursiveGetReplies();
    if (!id || !this.husq) return [];

    if (this.husq) {
      const rawReplies = this.timelineService.getHusqReplies(id);
      console.log('this is rawReplies... ', rawReplies)
      return rawReplies.map((reply) => ({
        ...reply,
        name: this.userService.getUserById(reply.userId)?.name
      }));
    }

    return [];
  }

  // recursiveGetReplies() {
  //   const husq = []
  //   const replies = []

  //   console.log('clicked... ')
  // }

  getRepliesRecurse() {

  }

  trackById(index: number, husq: HusqWithName): string {
    return husq.id;
  }
  

}
