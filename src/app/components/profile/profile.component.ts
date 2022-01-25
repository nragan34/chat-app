import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { Users } from '../../interfaces/users'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profile: Users | undefined

  constructor(private router: ActivatedRoute, private usersService: UsersService) {
    this.router.paramMap.subscribe((params) => {
      console.log(this.router.paramMap)
      const id = params.get('userId')
      if (id) {
        this.profile = this.usersService.getUserById(id)
        console.log(this.profile)
      }
    })
  }

  ngOnInit(): void {
  }

}
