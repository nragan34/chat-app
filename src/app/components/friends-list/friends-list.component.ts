import { Component, Input, OnInit } from '@angular/core';
import { Users } from 'src/app/interfaces/users';
import { UsersService } from 'src/app/services/users.service';
import { map, Subscription } from 'rxjs';
import { UserActiveService } from 'src/app/services/user-active.service';
import { FriendsService } from 'src/app/services/friends.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.scss']
})
export class FriendsListComponent implements OnInit {

  friends$: Subscription;
  friends: (Users | undefined)[] | undefined;

  userActive: Users| undefined

  time: Date = new Date()
  
  constructor(
    private userService: UsersService,
    private activeUserService: UserActiveService,
    private friendsService: FriendsService,
  ) {
    const activeUserId = this.activeUserService.getActiveUser();
    this.friends$ = this.friendsService.friends$
      .pipe(
        map((friends) => {
          return friends.reduce<Users[]>((acc, cur) => {
            if (!acc.find((user) => cur.pair.includes(user.id))) {
              const friendId = cur.pair[0] === activeUserId ? cur.pair[1] : cur.pair[0];
              const user = this.userService.getUserById(friendId);
              if (user) {
                acc.push(user);
              }
            }
            return acc;
          }, []);
        })
      )
      .subscribe((friends) => (this.friends = friends));
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.friends$.unsubscribe();
  }

  // track by id
  trackById(index: number, friend: any): number {
    return friend.id;
  }
  
}
