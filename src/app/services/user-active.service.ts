import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Users } from '../interfaces/users';
import { LocalStorageService } from './local-storage.service';
import { UsersService } from './users.service';


const AUTH_DATA = 'AUTH_DATA'

@Injectable({
  providedIn: 'root'
})
export class UserActiveService {


  activeUser: Users | undefined

  private readonly _activeUserSource = new BehaviorSubject<string | undefined>(undefined);
  readonly activeUser$ = this._activeUserSource.asObservable()

  constructor(private localStorageService: LocalStorageService) {
    const activeUser = this.localStorageService.getItem(AUTH_DATA);
    if (activeUser) {
      this._setActiveUser(activeUser);
    }
  }

  private _setActiveUser(userId: string | undefined): void {
    this._activeUserSource.next(userId);
    this.localStorageService.setItem(AUTH_DATA, userId);
  }

  setActiveUser(userId: string | undefined): void {
    this._setActiveUser(userId);
  }

  getActiveUser(): string| undefined {
    return this._activeUserSource.getValue();
  }

  logoutUser(): void {
    this._setActiveUser(undefined);
  }


}

