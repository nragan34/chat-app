import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Users } from '../interfaces/users';
import { UserActiveService } from '../services/user-active.service';

@Injectable({
  providedIn: 'root'
})

// you can write a constructor to inject services
//  you can use them to check certain things


export class AuthGuard implements CanActivate {

  activeUser: Users | undefined

  constructor(private router: Router, private userActiveService: UserActiveService) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.userActiveService.getActiveUser() ? true : this.router.navigate(['/auth/login']);
  }
}

