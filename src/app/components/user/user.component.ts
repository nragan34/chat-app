import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Subscription } from 'rxjs';
import { UserFriends } from 'src/app/interfaces/userFriends';
import { Users } from 'src/app/interfaces/users';
import { users } from 'src/app/seeds/users';
import { FriendsService } from 'src/app/services/friends.service';
import { UserActiveService } from 'src/app/services/user-active.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  
  @Input() userObj: Users | undefined

  users$: Subscription

  users: Users[] = users
  userFriends: UserFriends[] | undefined
  friends: UserFriends | undefined
  userActive: string | undefined

  constructor(
    private usersService: UsersService, 
    private friendService: FriendsService,
    private userActiveService: UserActiveService, 
    private router: Router) {
    this.users$ = this.usersService.users$.subscribe
    (users => {
      this.users = users
    }),
    this.userActiveService.activeUser$.subscribe(userId => this.userActive = userId)
  }

  ngOnInit(): void {
  }

  // remove user 
  removeUser(): void {
    if (this.userObj) {
      this.usersService.removeUser(this.userObj.id)      
    }
  }

  getUserById(): void {
    if (this.userObj) {
      this.usersService.getUserById(this.userObj.id)
    }
  }

  // check to see if user friend exists
  addUsersFriend(): void {
    if (this.userObj && this.userActive) {
      this.friendService.addUserToFriendList(this.userObj.id, this.userActive)
    }
  }


}
