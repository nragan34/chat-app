import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { Users } from '../interfaces/users';
import { users } from '../seeds/users';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  AUTH_DATA = "AUTH_DATA"

  private readonly _userSource = new BehaviorSubject<Users[]>([])
  readonly users$ = this._userSource.asObservable();

  constructor(private localStorageService: LocalStorageService) {
    const user: Users[] = this.localStorageService.getItem('users');
    if (user?.length) {
      this._setUser(user);
    } else {
      this._setUser(users);
    }
  }

  ///////////////////////////
  // Adding Users
  ///////////////////////////
  private _setUser(user: Users[]) {
    this._userSource.next(user)
    this.localStorageService.setItem('users', user);
  }

  setUser(user: Users[]) {
    this._userSource.next(user)
    this.localStorageService.setItem('users', user);
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

  getUserByEmail(email: string): Users | undefined {
    return this.getUsers().find(user => user.email === email)
  }

  getUserById(id: string): Users | undefined {
    return this.getUsers().find(user => user.id === id)
  }

  editUser(updatedUser: Users): void {
    const users = [...this.getUsers().filter(user => user.id !== updatedUser.id), updatedUser]
    this._setUser(users)
  }

  ///////////////////////////
  // Adding friends
  ///////////////////////////

  // need to get friends that match the active users id
  getFriendById(id: string): Users | undefined {
    return this.getUsers().find(friend => friend.id === id)
  }


}
