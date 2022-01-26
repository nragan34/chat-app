import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Users } from 'src/app/interfaces/users';
import { users } from 'src/app/seeds/users';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {
  users$: Subscription
  users: Users[] = users
  
  message: string = ''
  name: string = ''
  location: string = ''
  id: string = ''

  profile: Users | undefined
  
  constructor(private usersService: UsersService, private activeRouter: ActivatedRoute, private router: Router) { 
    this.users$ = this.usersService.users$.subscribe
    (users => {
      this.users = users
    }),
    this.activeRouter.paramMap.subscribe((params) => {
      const id = params.get('userId')
      if (id) {
        this.profile = this.usersService.getUserById(id)
      }
    })
  }

  ngOnInit(): void {
  }

  addUser(): void {
    if (this.message) {
      this.usersService.addUser({
        id: this.id,
        name: this.name,
        message: this.message,
        location: this.location
      })
      this.router.navigate(['/friends', this.profile?.id])
    }
  }

}
