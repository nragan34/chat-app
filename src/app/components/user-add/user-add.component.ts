import { Component, OnInit } from '@angular/core';
import { v4 as uuidv4 } from "uuid";
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {
  message: string = ''
  name: string = ''
  location: string = ''
  id: string = ''

  constructor(private usersService: UsersService, private router: Router) { }

  ngOnInit(): void {
  }

  addUser(): void {
    if (this.message) {
      this.usersService.addUser({
        id: uuidv4(),
        name: this.name,
        message: this.message,
        location: this.location
      })
      this.router.navigate(['/friends'])
    }
  }

}
