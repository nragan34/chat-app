import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Likes } from '../interfaces/likes';
import { initialLikes } from '../seeds/likes';
import { LocalStorageService } from './local-storage.service';
import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = 'likes'

@Injectable({
  providedIn: 'root'
})
export class LikeService {
  private readonly _likesSource = new BehaviorSubject<Likes[]>([]);
  readonly likes$ = this._likesSource.asObservable();

  constructor(private localStorageService: LocalStorageService) {
    const likes = this.localStorageService.getItem(STORAGE_KEY);
    if (likes?.length) {
      this._setLikes(likes.map((like) => ({ ...like, likes: new Set(like.likes) })));
    } else {
      this._setLikes(initialLikes);
    }
  }


  private _setLikes(likes: Likes[]): void {
    this._likesSource.next(likes);
    this.localStorageService.setItem(STORAGE_KEY, likes);
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

  getLikeByHusqId(husqId: string): Likes | undefined {
    return this.getLikes().find((like) => like.husqId === husqId);
  }


}
