import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
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
  userFriends$: Subscription
  users: Users[] = users
  userActiveId: string | undefined
  profile: Users | undefined
  
  userFriends: UserFriends[] | undefined
  friends: UserFriends | undefined

  message: string = ''
  time: Date = new Date()
  name: string = ''
  location: string = ''
  id: string = ''

  constructor(private activeRouter: ActivatedRoute,  private userFriendsService: UserFriendsService, private usersService: UsersService, private router: Router, private userActive: UserActiveService) {
    this.users$ = this.usersService.users$.subscribe
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
    }),
    this.userActive.activeUser$.subscribe(userId => this.userActiveId = userId)
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

  addUsersFriend(): void {
    if(this.userObj && this.profile) {
      this.userFriendsService.addUsersFriend(this.userObj,this.profile)
      this.usersService.removeUser(this.userObj.id)
    }
  }


}
