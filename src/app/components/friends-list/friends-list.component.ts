import { Component, Input, OnInit } from '@angular/core';
import { Friends } from 'src/app/interfaces/friends';
import { friends } from '../../seeds/friends';
import { users } from '../../seeds/users';
import { Users } from 'src/app/interfaces/users';
import { UsersService } from 'src/app/services/users.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-friends',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.scss']
})
export class FriendsListComponent implements OnInit {
  friends$: Subscription
  users$: Subscription
  friends: Friends[] = friends;
  users: Users[] = users;

  constructor(private userService: UsersService) {
    this.friends$ = this.userService.friends$.subscribe
      (friends => {
        this.friends = friends
      })
      this.users$ = this.userService.users$.subscribe
      (users => {
        this.users = users
      })
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    if (this.friends$) {
      this.friends$.unsubscribe()
    }
    if (this.users$) {
      this.users$.unsubscribe()
    }
  }

  // colon what you are returning for typescript
  trackById(index: number, friend: Friends): string {
    return friend.id;
  }

}
