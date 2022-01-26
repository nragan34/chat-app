import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { Users } from '../../interfaces/users'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profile: Users | undefined
  time: Date = new Date()

  constructor(private activeRouter: ActivatedRoute, private router: Router, private usersService: UsersService) {
    this.activeRouter.paramMap.subscribe((params) => {
      console.log(this.activeRouter.paramMap)
      const id = params.get('userId')
      if (id) {
        this.profile = this.usersService.getUserById(id)
        console.log(this.profile)
      }
    })
  }

  ngOnInit(): void {
  }

  editProfile(): void {
    this.router.navigate(['/edit', this.profile?.id])
  }

}
