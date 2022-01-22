import { Component, Input, OnInit } from '@angular/core';
import { Users } from 'src/app/interfaces/users';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  @Input() userObj: Users | undefined

  i
  time: Date = new Date()
  id: string = ''
  
  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    console.log('Logging user 4: \n\n\n',this.usersService.getUserById('4'))
  }

  removeUser(): void {
    if (this.userObj) {
      this.usersService.removeUser(this.userObj.id)
      this.usersService.removeFriend(this.userObj.id)
    }
  }

  getUserById(): void {
    if (this.userObj) {
      this.usersService.getUserById(this.userObj.id)
    }
  }


}
