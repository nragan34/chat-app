import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Users } from 'src/app/interfaces/users';
import { AuthService } from 'src/app/services/auth.service';
import { UserActiveService } from 'src/app/services/user-active.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  loginForm: FormGroup | undefined

  profile: Users | undefined
  activeUser: Users | undefined

  logoutUrl = '';

  constructor(private activeRouter: ActivatedRoute, private usersService: UsersService, private router: Router, private authService: AuthService, private activeUserService: UserActiveService) {
    this.activeRouter.paramMap.subscribe((params) => {
      const id = params.get('userId')
      if (id) {
        this.profile = this.usersService.getUserById(id)
      }
    })
  }

  ngOnInit(): void {
    this.urlChecker()
    this.loginForm = new FormGroup({
      email: new FormControl(this.profile?.email, [Validators.required]),
      password: new FormControl(this.profile?.password, [Validators.required])
    })
  }

  get email() {
    return this.loginForm?.get("email");
  }

  get password() {
    return this.loginForm?.get("password");
  }

  login() {
    const val = this.loginForm?.value;
    this.activeUser = this.authService.login(val.email, val.password)
    if (this.activeUser) {
      this.router.navigate(['/'])
    }
  }

  logout() {
    const loggingOutUser = localStorage.getItem('AUTH_DATA');
    if (loggingOutUser) {
      console.log('logging out user: \n', this.usersService.getUserById(loggingOutUser), '\n\n ...removing from local storage')
      localStorage.removeItem('AUTH_DATA')
      this.activeUserService._setActiveUser(undefined);
      console.log('done')
    } else {
      console.log('ERROR removing logging out user: \n', loggingOutUser);
    }
  }

  urlChecker() {
    this.logoutUrl = this.router.url;
    if (this.logoutUrl === '/auth/logout') {
      console.log('... logging out...')
      this.logout();
    }
  }

  mgOnDestroy() {
  }

}
