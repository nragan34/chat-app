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


  addUsersFriend(userFriend: Users, activeUser: Users): void {
    const addedFriend = {
      id: activeUser.id,
      friend: userFriend
    }
    const addingFriend = [...this.getUserFriends(), addedFriend]
    this._setUserFriends(addingFriend)
  }


  getUserFriends(): UserFriends[] {
    return this._userFriendsSource.getValue()
  }

  // find all friends from user
  getUserFriendById(): UserFriends[] {
    return this._userFriendsSource.getValue();
  }


  // need to search for Friends (friends.id)
  removeFriend(removedUserFriend: UserFriends, activeUser: Users): void {
    const removedFriend = [
      ...this.getUserFriends().filter(userFriend => 
        userFriend.friend.id !== removedUserFriend.friend.id
      )
    ]
   this._setUserFriends(removedFriend)
  }
}
