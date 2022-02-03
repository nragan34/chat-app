import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserFriends } from '../interfaces/userFriends';
import { Users } from '../interfaces/users';
import { userFriends } from '../seeds/userFriends';
import { users } from '../seeds/users';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})

export class UserFriendsService {
  private readonly _userFriendsSource = new BehaviorSubject<UserFriends[]>([])
  readonly userFriends$ = this._userFriendsSource.asObservable();

  private readonly _userSource = new BehaviorSubject<Users[]>([])
  readonly users$ = this._userSource.asObservable();

  constructor(private localStorageService: LocalStorageService) { 
    const storedFriends: UserFriends[] = this.localStorageService.getItem('friends');
    if(storedFriends?.length) {
      this._setUserFriends(storedFriends);
    } else {
      this._setUserFriends(userFriends)
    }
  }

  private _setUserFriends(friend: UserFriends[]) {
    this._userFriendsSource.next(friend)
    this.localStorageService.setItem('friends', friend);
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
    return this.getUserFriends().find(friend => friend.friend.id === id);
  }

  // need to search for Friends (friends.id)
  removeFriend(removedUserFriend: UserFriends, activeUserId: string): void {
    const removedFriend = [
      ...this.getUserFriends().filter(userFriend => 
        userFriend.friend.id !== removedUserFriend.friend.id
      )
    ]
   this._setUserFriends(removedFriend);
  }
}
