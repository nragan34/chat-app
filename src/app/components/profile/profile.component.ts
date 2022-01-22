import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Friends } from 'src/app/interfaces/friends';
import { UsersService } from 'src/app/services/users.service';
import { Users } from '../../interfaces/users'
import { users } from '../../seeds/users'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  // profile: Users | undefined
  profile: Friends | undefined

  constructor(private router: ActivatedRoute, private usersService: UsersService) {
    this.router.paramMap.subscribe((params) => {
      const id = params.get('userId')
      if (id) {
        this.profile = this.usersService.getUserById(id)
        this.profile = this.usersService.getFriendById(id)
      }
    })
  }

  ngOnInit(): void {
  }

}
