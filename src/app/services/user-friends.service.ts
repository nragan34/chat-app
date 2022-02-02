import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserFriends } from '../interfaces/userFriends';
import { Users } from '../interfaces/users';
import { userFriends } from '../seeds/userFriends';
import { users } from '../seeds/users';

@Injectable({
  providedIn: 'root'
})

export class UserFriendsService {
  private readonly _userFriendsSource = new BehaviorSubject<UserFriends[]>(userFriends)
  readonly userFriends$ = this._userFriendsSource.asObservable();

  private readonly _userSource = new BehaviorSubject<Users[]>(users)
  readonly users$ = this._userSource.asObservable();

  constructor() { }

  private _setUserFriends(setFriend: UserFriends[]) {
    this._userFriendsSource.next(setFriend)
  }

  addUsersFriend(userFriend: Users, activeUser: string): void {
    const addedFriend = {
      id: activeUser,
      friend: userFriend
    }
    const addingFriend = [...this.getUserFriends(), addedFriend]
    console.log('logging addedFriend... ', addedFriend);
    this._setUserFriends(addingFriend)
  }

  getUserFriends(): UserFriends[] {
    return this._userFriendsSource.getValue()
  }

  // find all friends from user
  getUserFriendById(id: string): UserFriends | undefined {
    console.log('logging friend.... ', this.getUserFriends().find(friend => friend.friend.id === id))
    return this.getUserFriends().find(friend => friend.friend.id === id);
  }

  // need to search for Friends (friends.id)
  removeFriend(removedUserFriend: UserFriends, activeUserId: string): void {
    const removedFriend = [
      ...this.getUserFriends().filter(userFriend => 
        userFriend.friend.id !== removedUserFriend.friend.id
      )
    ]
   this._setUserFriends(removedFriend)
  }
}
