import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Users } from 'src/app/interfaces/users';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
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
  userActive: Users | undefined
  logoutUrl = ''
  AUTH_DATA = 'AUTH_DATA'

  constructor(private activeRouter: ActivatedRoute, private usersService: UsersService, private router: Router, private authService: AuthService, private activeUserService: UserActiveService, private localStorageService: LocalStorageService) {
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
    this.userActive = this.authService.login(val.email, val.password)
    if (this.userActive) {
      this.router.navigate(['/']);
    }
  }

  logout() {
    const loggingOutUser = this.localStorageService.getItem(this.AUTH_DATA);
    if (loggingOutUser) {
      this.activeUserService.setActiveUser(undefined);
      this.router.navigate(['/'])
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
