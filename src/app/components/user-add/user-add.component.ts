import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Users } from 'src/app/interfaces/users';
import { users } from 'src/app/seeds/users';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';
import * as uuid from 'uuid';

@Component({
  selector: 'app-add-user',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {

  users$: Subscription
  users: Users[] = users
  
  registerForm: FormGroup | undefined

  profile: Users | undefined
  
  constructor(private usersService: UsersService, private router: Router, private authService: AuthService) { 
    this.users$ = this.usersService.users$.subscribe
    (users => {
      this.users = users
    })
  }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      name: new FormControl(this.profile?.name, [Validators.required]),
      message: new FormControl(this.profile?.message, [Validators.required]),
      location: new FormControl(this.profile?.location, [Validators.required]),
      email: new FormControl(this.profile?.email, [Validators.required]),
      password: new FormControl(this.profile?.password, [Validators.required]),
    })
  }

  get email() {
    return this.registerForm?.get("email");
  }
  get password() {
    return this.registerForm?.get("password")
  }
  get name() {
    return this.registerForm?.get("name");
  }
  get message() {
    return this.registerForm?.get("message");
  }
  get location() {
    return this.registerForm?.get("location");
  }

  addUser(): void {
    const val = this.registerForm?.value;
    const generateId = uuid.v4();
    if (val) {
      this.usersService.addUser({
        id: generateId,
        name: val.name,
        message: val.message,
        location: val.location,
        email: val.email,
        password: val.password
      })
      this.authService.login(val.email, val.password)
      this.router.navigate(['/user-list/', generateId])
    }
  }

}
