import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Users } from 'src/app/interfaces/users';
import { users } from 'src/app/seeds/users';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users$: Subscription
  users: Users[] = users;
  id: string = ''

  constructor(private usersService: UsersService) {
    this.users$ = this.usersService.users$.subscribe
      (users => {
        this.users = users
      })
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    if (this.users$) {
      this.users$.unsubscribe()
    }
  }

  // colon what you are returning for typescript
  trackById(index: number, user: Users): string {
    return user.id;
  }



}
