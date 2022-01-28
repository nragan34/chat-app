import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserFriends } from 'src/app/interfaces/userFriends';
import { Users } from 'src/app/interfaces/users';
import { users } from 'src/app/seeds/users';
import { UserFriendsService } from 'src/app/services/user-friends.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  users$: Subscription
  userFriends$: Subscription
  
  users: Users[] = users
  userFriends: UserFriends[] | undefined
  friends: UserFriends | undefined

  profile: Users | undefined

  username: string = ''
  password: string = ''
  
  constructor(private activeRouter: ActivatedRoute,  private userFriendsService: UserFriendsService, private usersService: UsersService, private router: Router) {
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
    })
  }

  ngOnInit(): void {
  }

  

}
