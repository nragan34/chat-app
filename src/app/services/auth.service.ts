import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, map, tap, shareReplay, Subscription } from 'rxjs';
import { Users } from '../interfaces/users';
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { UsersService } from './users.service';
import { users } from '../seeds/users';
import { ActivatedRoute } from '@angular/router';
import { UserActiveService } from './user-active.service';
import { LocalStorageService } from './local-storage.service';


const AUTH_DATA = "auth_data";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    
    AUTH_DATA = "AUTH_DATA"
    userLoggingIn: Users | undefined

    private readonly _activeUserSource = new BehaviorSubject<string | undefined>(undefined);
  readonly activeUser$ = this._activeUserSource.asObservable();


    constructor(private usersService: UsersService, private activeUser: UserActiveService, private localStorageService: LocalStorageService) {
        const userActive = this.localStorageService.getItem(AUTH_DATA);
        if(userActive) {
            this._setActiveUser
        }
    }

    private _setActiveUser(userId: string | undefined): void {
        this._activeUserSource.next(userId);
        this.localStorageService.setItem(AUTH_DATA, userId);
      }

      
    login(email: string, password: string): Users | undefined {
        this.userLoggingIn = this.usersService.getUserByEmail(email);

        if(this.userLoggingIn && this.userLoggingIn.password === password) {

            // set id of user in local storage
            this.localStorageService.setItem(this.AUTH_DATA, this.userLoggingIn.id);

            // set active user
            const activeUser = this.usersService.getUserById(this.userLoggingIn.id)
            this.activeUser.setActiveUser(this.userLoggingIn.id)
            
            return activeUser
        }
        console.log('User Not Found')
        return undefined
    }

}
