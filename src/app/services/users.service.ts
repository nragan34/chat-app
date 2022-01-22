import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Users } from '../interfaces/users';
import { users } from '../seeds/users';
import { Friends } from '../interfaces/friends';
import { friends } from '../seeds/friends'

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly _userSource = new 
  BehaviorSubject<Users[]>(users)
  readonly users$ = this._userSource.asObservable();

  private readonly _friendSource = new BehaviorSubject<Friends[]>(friends)
  readonly friends$ = this._friendSource.asObservable();

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



  ///////////////////////////
  // Adding friends
  ///////////////////////////

  private _setFriend(friend: Friends[]) {
    this._friendSource.next(friend)
  }

  getFriends(): Friends[] {
      return this._friendSource.getValue()
  }
  
  addFriend(friend: Friends): void {
    const friends = [...this.getFriends()]
    if (friends.find(x => x.id === friend.id)) {
      // filter out added friend
      console.log('same id')
    } else {
      const friends = [
        ...this.getFriends(), friend
      ]
      this._setFriend(friends)
    }
  }
  
  removeFriend(friendId: string): void {
    console.log('removing friend', friendId);
    const friends = [
      ...this.getFriends().filter(friends => friends.id !== friendId)
    ]
    this._setFriend(friends)
  }

  getUserById(id: string): Users | undefined {
    return this.getUsers().find(user => user.id === id)
  }

  getFriendById(id: string): Friends | undefined {
    console.log('logging id.... \n\n\n', id)
    return this.getFriends().find(friend => friend.id === id)
  }
}
