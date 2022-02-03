import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserFriends } from 'src/app/interfaces/userFriends';
import { Users } from 'src/app/interfaces/users';
import { UserActiveService } from 'src/app/services/user-active.service';
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

  userActive: Users| undefined

  time: Date = new Date()

  constructor(private usersService: UsersService, private userFriendsService: UserFriendsService, private router: Router, private userActiveService: UserActiveService) {
    this.userActiveService.activeUser$.subscribe(userId => this.userActive = userId)
  }

  ngOnInit(): void {
  }

  removeFriend(): void {
    if (this.userFriendsObj && this.userActive) {
      this.userFriendsService.removeFriend(this.userFriendsObj, this.userActive.id)

      // cant user this becuase it messes profile up
      // this.usersService.addUser(this.userFriendsObj.friend);
    }
  }

  routeToUsersProfile(): void {
    if (this.userFriendsObj) {
      console.log('logging userfriendObj.friend.id....', this.userFriendsObj.friend.id)
      this.router.navigate(['/profile', this.userFriendsObj.friend.id])
    }
  }


}
