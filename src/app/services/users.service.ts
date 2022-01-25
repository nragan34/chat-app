import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { UserFriends } from '../interfaces/userFriends';
import { Users } from '../interfaces/users';
import { userFriends } from '../seeds/userFriends';
import { users } from '../seeds/users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly _userSource = new BehaviorSubject<Users[]>(users)
  readonly users$ = this._userSource.asObservable();

  private readonly _userFriendsSource = new BehaviorSubject<UserFriends[]>(userFriends)
  readonly userFriends$ = this._userFriendsSource.asObservable();
  
  constructor() { }

  ///////////////////////////
  // Adding Users
  ///////////////////////////

  private _setUser(user: Users[]) {
    this._userSource.next(user)
  }

  getUsers(): Users[] {
    return this._userSource.getValue()
  }

  addUser(user: Users): void {
    const users = [...this.getUsers(), user]
    this._setUser(users)
  }

  removeUser(userId: string): void {
    const users = [
      ...this.getUsers().filter(users => users.id !== userId)
    ]
    this._setUser(users)
  }

  getUserById(id: string): Users | undefined {
    return this.getUsers().find(user => user.id === id)
  }

  ///////////////////////////
  // Adding friends
  ///////////////////////////

  private _setFriend(friend: Users[]) {
    this._userSource.next(friend)
  }

  // getFriends(): Users[] {
  //   return this._userSource.getValue()
  // }

  // addFriend(): void {

  // }

  getFriendById(id: string): Users | undefined {
    return this.getUsers().find(friend => friend.id === id)
  }

}
