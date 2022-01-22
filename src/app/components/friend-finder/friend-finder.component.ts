import { Component, Input, OnInit } from '@angular/core';
import { v4 as uuidv4 } from "uuid";
import { Users } from 'src/app/interfaces/users';
import { UsersService } from 'src/app/services/users.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-friend-finder',
  templateUrl: './friend-finder.component.html',
  styleUrls: ['./friend-finder.component.scss']
})
export class FriendFinderComponent implements OnInit {
  @Input() userObj: Users | undefined

  constructor(private usersService: UsersService, private router: Router) { }

  ngOnInit(): void {
  }


  addFriend(): void {
    if (this.userObj) {
      this.usersService.addFriend({
        id: this.userObj.id,
        name: this.userObj.name,
        message: this.userObj.message,
        location: this.userObj.location
      })
      console.log(this.userObj.id)
      console.log(typeof (this.userObj))
      this.router.navigate(['/friends'])
    }
  }

}
