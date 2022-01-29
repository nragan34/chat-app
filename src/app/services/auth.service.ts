import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, map, tap, shareReplay, Subscription } from 'rxjs';
import { Users } from '../interfaces/users';
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { UsersService } from './users.service';
import { users } from '../seeds/users';
import { ActivatedRoute } from '@angular/router';


const AUTH_DATA = "auth_data";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    
    AUTH_DATA = "AUTH_DATA"
    activeUser: Users | undefined

    constructor(private usersService: UsersService) {

    }

    login(email: string, password: string): Users | undefined {
        this.activeUser = this.usersService.getUserByEmail(email);
        if(this.activeUser && this.activeUser.password === password) {
            console.log('setting active user in local storage ===> \n', this.activeUser)
            localStorage.setItem(this.AUTH_DATA, this.activeUser.id)
            return this.activeUser
        }
        console.log('User Not Found')
        return undefined
    }

}
