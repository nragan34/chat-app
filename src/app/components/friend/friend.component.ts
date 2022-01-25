import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserFriends } from 'src/app/interfaces/userFriends';
import { Users } from 'src/app/interfaces/users';
import { UserFriendsService } from 'src/app/services/user-friends.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.scss'],

})

// need list of user Ids the user is friends with
//
export class FriendComponent implements OnInit {
  @Input() userFriendsObj: UserFriends | undefined;

  profile: Users | undefined
  
  time: Date = new Date()

  constructor(private usersService: UsersService, private userFriendsService: UserFriendsService, private router: Router, private activeRouter: ActivatedRoute) { 
    this.activeRouter.paramMap.subscribe((params) => {
      const id = params.get('userId')
      if(id) {
        this.profile = this.usersService.getUserById(id)
      }
    })
  }

  ngOnInit(): void {
  }

  // remove friend from friends list and add back to users list
  removeFriend(): void {
    if (this.userFriendsObj && this.profile) {
      this.usersService.addUser(this.userFriendsObj.friend)
      this.userFriendsService.removeFriend(this.userFriendsObj, this.profile)
    }
  }

  routeToUsersProfile(): void {
    if (this.userFriendsObj) {
      const id = this.usersService.getFriendById(this.userFriendsObj.id)?.id
      this.router.navigate(['/profile',id])
    }
  }

  
}
