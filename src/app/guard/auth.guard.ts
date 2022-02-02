import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Users } from '../interfaces/users';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';

@Injectable({
  providedIn: 'root'
})

// you can write a constructor to inject services
//  you can use them to check certain things


export class AuthGuard implements CanActivate {

  activeUser: Users | undefined

  constructor(private authService: AuthService, private router: Router, private userService: UsersService) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const userId = localStorage.getItem('AUTH_DATA');
    
    if (userId) {
        console.log('Getting user from localstorage')
        this.activeUser = this.userService.getUserById(userId);
        return true;
      } else {
        console.log('You are not authorized.')
        this.router.navigate(['/auth/login'])
        return false;
      }
    }
  }
