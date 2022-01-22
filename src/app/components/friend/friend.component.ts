import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Users } from 'src/app/interfaces/users';
import { UsersService } from 'src/app/services/users.service';
import { Friends } from "../../interfaces/friends";

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.scss'],

})
export class FriendComponent implements OnInit {
  @Input() friendObj: Friends | undefined
  profile: Users | undefined
  
  time: Date = new Date()

  constructor(private usersService: UsersService, private router: Router) { 
  }

  ngOnInit(): void {
  }

  removeFriend(): void {
    if (this.friendObj) {
      this.usersService.removeFriend(this.friendObj.id)
    }
  }

  routeToFriendProfile(): void {
    if (this.friendObj) {
      const id = this.usersService.getFriendById(this.friendObj.id)?.id
      this.router.navigate(['/profile',id])
    }
  }
}
