import { Component, Input, OnInit } from '@angular/core';
import { users } from '../../seeds/users';
import { Users } from 'src/app/interfaces/users';
import { UsersService } from 'src/app/services/users.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { UserFriends } from 'src/app/interfaces/userFriends';
import { UserFriendsService } from 'src/app/services/user-friends.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.scss']
})
export class FriendsListComponent implements OnInit {

  users$: Subscription
  userFriends$: Subscription
  
  users: Users[] = users
  userFriends: UserFriends[] | undefined
  suggestedUsers: Users[] | undefined

  profile: Users | undefined
  friends: UserFriends | undefined
  
  constructor(private userService: UsersService, private activeRouter: ActivatedRoute, private usersService: UsersService, private userFriendsService: UserFriendsService) {
    this.users$ = this.userService.users$.subscribe
      (users => {
        this.users = users
      }),
      this.activeRouter.paramMap.subscribe((params) => {
        const id = params.get('userId')
        if (id) {
          this.profile = this.usersService.getUserById(id)
        }
      }),
      this.userFriends$ = this.userFriendsService.userFriends$.subscribe
      (userFriends => {
        this.userFriends = userFriends;
      })
   }


  ngOnInit(): void {
  }


  ngOnDestroy() {
    if (this.users$) {
      this.users$.unsubscribe()
    }
    if (this.userFriends$) {
      this.userFriends$.unsubscribe()
    }
  }

  
  // track by id
  trackById(index: number, friend: UserFriends): string {
    return friend.id;
  }
  trackByUserId(index: number, users: Users): string {
    return users.id;
  }
}
