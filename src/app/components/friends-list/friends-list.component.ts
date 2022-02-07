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
  potentialFriends: (Users | undefined)[] | undefined;

  userActive: Users | undefined

  time: Date = new Date()

  constructor(
    private userService: UsersService,
    private activeUserService: UserActiveService,
    private friendsService: FriendsService,
  ) {
    // Active User
    const activeUserId = this.activeUserService.getActiveUser();
    // loop through friends subscription
    this.friends$ = this.friendsService.friends$
      .pipe(
        map(() => {
          // get userFriendId
          const userFriendsId = this.friendsService.getFriendsIdsByActiveUserId(activeUserId);
          // getUserById
          const friends = userFriendsId.map((friendId) => this.userService.getUserById(friendId));
          // getAllUsers and filter
          // if activeUserId !== userId and userFriendId is not any
          // of the usrs id
          const potentialFriends = this.userService.getUsers().filter((user) => activeUserId !== user.id && !userFriendsId.includes(user.id));
          // return values of 
          // friends and potentialFriends
          return {
            friends,
            potentialFriends
          };
        })
      )
      // subscribe friends and potentialFriends
      // this passes through all values for both
      .subscribe((users) => {
        this.friends = users.friends;
        this.potentialFriends = users.potentialFriends;
      })
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
