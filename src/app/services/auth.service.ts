import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, map, tap, shareReplay, Subscription } from 'rxjs';
import { Users } from '../interfaces/users';
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { UsersService } from './users.service';
import { users } from '../seeds/users';
import { ActivatedRoute } from '@angular/router';
import { UserActiveService } from './user-active.service';


const AUTH_DATA = "auth_data";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    
    AUTH_DATA = "AUTH_DATA"
    userLoggingIn: Users | undefined

    constructor(private usersService: UsersService, private activeUser: UserActiveService) {

    }

    login(email: string, password: string): Users | undefined {
        this.userLoggingIn = this.usersService.getUserByEmail(email);

        if(this.userLoggingIn && this.userLoggingIn.password === password) {

            // set id of user in local storage
            localStorage.setItem(this.AUTH_DATA, this.userLoggingIn.id)

            // set active user
            const activeUser = this.usersService.getUserById(this.userLoggingIn.id)
            this.activeUser._setActiveUser(this.userLoggingIn)
            
            return activeUser
        }
        console.log('User Not Found')
        return undefined
    }

}
