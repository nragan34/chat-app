import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Subscription } from 'rxjs';
import { UserFriends } from 'src/app/interfaces/userFriends';
import { Users } from 'src/app/interfaces/users';
import { users } from 'src/app/seeds/users';
import { UserActiveService } from 'src/app/services/user-active.service';
import { UserFriendsService } from 'src/app/services/user-friends.service';
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
  friends: UserFriends[] | undefined
  userActive: Users | undefined

  constructor(private userFriendsService: UserFriendsService, private usersService: UsersService, private userActiveService: UserActiveService, private userFriendService: UserFriendsService) {
    this.users$ = this.usersService.users$.subscribe
    (users => {
      this.users = users
    }),
    this.userFriendService.userFriends$.subscribe
    (friends => {
      this.friends = friends;
    })
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
    if(this.userObj && this.userActive ) 
    {
      const isFriend = this.userFriendService.getUserFriendById(this.userObj?.id)
      if (!isFriend) {
        this.userFriendsService.addUsersFriend(this.userObj,this.userActive.id)
      }else {
        console.log('already friend... ')
      }
    }
  }


}
