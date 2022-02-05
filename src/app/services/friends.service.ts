import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Friend } from '../interfaces/friend';
import { Users } from '../interfaces/users';
import { initialFriends } from '../seeds/friends';
import { LocalStorageService } from './local-storage.service';
import { v4 as uuidv4 } from "uuid";
import { FormGroupDirective } from '@angular/forms';

const AUTH_DATA = 'friends'


@Injectable({
  providedIn: 'root'
})
export class FriendsService {
  private readonly _friendsSource = new BehaviorSubject<Friend[]>([]);
  readonly friends$ = this._friendsSource.asObservable();

  constructor(private localStorageService: LocalStorageService) {
    const friends = this.localStorageService.getItem(AUTH_DATA);
    if (friends?.length) {
      this._setFriends(friends);
    } else {
      this._setFriends(initialFriends);
    }
  }

  private _setFriends(friends: Friend[]): void {
    this._friendsSource.next(friends);
    this.localStorageService.setItem(AUTH_DATA, friends);
  }

  _setFriendsPublic(friends: Friend[]): void {
    this._friendsSource.next(friends);
    this.localStorageService.setItem(AUTH_DATA, friends);
  }

  getFriends(): Friend[] {
    return this._friendsSource.getValue();
  }

  getFriendsIdsByActiveUserId(userId: string | undefined): string[] {
    return userId
      ? this.getFriends().reduce<string[]>((acc, cur) => {
          let friendId;
          if (cur.pair[0] === userId) friendId = cur.pair[1];
          if (cur.pair[1] === userId) friendId = cur.pair[0];
          if (friendId) acc.push(friendId);
          return acc;
        }, [])
      : [];
  }

  removeFriend(userId: string, friendId: string): void {
    const targetFriend = this.getFriends().find(
      (friend) => friend.pair.includes(userId) && friend.pair.includes(friendId)
    );
    this._setFriends(
      targetFriend ? this.getFriends().filter((friend) => friend.id !== targetFriend.id) : this.getFriends()
    );
  }


  // reduce
  // map
  // filter
  // forEach
  // some
  // every
  // includes
  // map
  // reduce
  // sort
  // proxy

  addUserToFriendList(userId: string, activeUserId: string) {
    if(!this.getFriendsIdsByActiveUserId(userId).includes(activeUserId)) {
      this._setFriends([
        ...this.getFriends(),
        {
          id: uuidv4(),
          pair: [userId, activeUserId]
        }
      ])
    }
  }

  addFriend(userId: string, friendId: string): void {
    if (!this.getFriendsIdsByActiveUserId(userId).includes(friendId)) {
      this._setFriends([
        ...this.getFriends(),
        {
          id: uuidv4(),
          pair: [userId, friendId]
        }
      ]);
    }
  }
  
}
