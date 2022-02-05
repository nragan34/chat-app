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
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.scss'],

})
export class FriendComponent implements OnInit {

  @Input() friendObj: Users | undefined;
  @Input() isPotential: boolean | undefined;

  activeUserId: string | undefined

  constructor(private friendService: FriendsService, private userActiveService: UserActiveService, private router: Router, private usersService: UsersService) {
    this.activeUserId = this.userActiveService.getActiveUser();
  }

  ngOnInit(): void {
  }


  trackById(index: number, friend: any): number {
    return friend.id;
  }

  removeFriend(friendId: string): void {
    const activeUserId = this.userActiveService.getActiveUser();
    if (activeUserId) {
      this.friendService.removeFriend(activeUserId, friendId);
    }
  }

  // check to see if user friend exists
  addUsersFriend(): void {
    if (this.friendObj && this.activeUserId) {
      this.friendService.addUserToFriendList(this.friendObj.id, this.activeUserId)
    }
  }
  
  navigateToUser() {
    const id = this.friendObj && this.friendObj.id;
    if (id) {
      this.router.navigate(['/profile', id]);
    }
  }


}
