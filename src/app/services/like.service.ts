import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Likes } from '../interfaces/likes';
import { initialLikes } from '../seeds/likes';
import { LocalStorageService } from './local-storage.service';
import { v4 as uuidv4 } from 'uuid';

const AUTH_DATA = 'likes'

@Injectable({
  providedIn: 'root'
})
export class LikeService {
  private readonly _likesSource = new BehaviorSubject<Likes[]>([]);
  readonly likes$ = this._likesSource.asObservable();

  constructor(private localStorageService: LocalStorageService) {
    const likes = this.localStorageService.getItem(AUTH_DATA);
    if (likes?.length) {
      this._setLikes(likes);
    } else {
      this._setLikes(initialLikes);
    }
  }

  private _setLikes(likes: Likes[]): void {
    this._likesSource.next(likes);
    this.localStorageService.setItem(AUTH_DATA, likes);
  }

  getLikes(): Likes[] {
    return this._likesSource.getValue();
  }

  addLike(husqId: string, userId: string): void {
    // Todo: Fix stringify to work with sets
    const like = this.getLikes().find((like) => like.husqId === husqId);
    console.log(like)
    if (like) {
      this._setLikes([
        ...this.getLikes().filter((like) => like.husqId !== husqId),
        { ...like, likes: like.likes.add(userId) }
      ]);
    } else {
      this._setLikes([
        ...this.getLikes(),
        {
          id: uuidv4(),
          husqId,
          likes: new Set<string>([userId])
        }
      ]);
    }
  }

}
