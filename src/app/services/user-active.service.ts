import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Users } from '../interfaces/users';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class UserActiveService {

  
  auth_data = 'AUTH_DATA'
  activeUser: string | undefined

  private readonly _activeUserSource = new BehaviorSubject<string | undefined>(undefined);
  readonly activeUser$ = this._activeUserSource.asObservable()

  constructor() {}

   _setActiveUser(user: Users | undefined) {
    this.activeUser = user?.id
    this._activeUserSource.next(this.activeUser)
  }
}

