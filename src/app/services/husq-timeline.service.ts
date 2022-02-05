import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Husq } from '../interfaces/husq';
import { initialHusqs } from '../seeds/husqs'
import { LocalStorageService } from './local-storage.service';

const AUTH_DATA= 'husqs';

@Injectable({
  providedIn: 'root',
})
export class HusqTimelineService {
  private readonly _husqSource = new BehaviorSubject<Husq[]>([])
  readonly husqs$ = this._husqSource.asObservable();

  constructor(private localStorageService: LocalStorageService) {
    const husqs = this.localStorageService.getItem(AUTH_DATA);
    if (husqs?.length) {
      this._setHusqs(husqs);
    } else {
      this._setHusqs(initialHusqs);
    }
  }

  private _setHusqs(husqs: Husq[]) {
    this._husqSource.next(husqs);
    this.localStorageService.setItem(AUTH_DATA, husqs);
  }

  getHusq(): Husq[] {
    return this._husqSource.getValue();
  }

  addHusq(husq: Husq): void {
    const husqs = [...this.getHusq(), husq];
    this._setHusqs(husqs);
  }

  removeHusq(husqId: string): void {
    const husqs = [...this.getHusq().filter((husq) => husq.id !== husqId)];
    this._setHusqs(husqs);
  }

  getHusqById(id: string): Husq | undefined {
    return this.getHusq().find((husq) => husq.id === id);
  }

  getHusqsByUserId(userId: string): Husq[] {
    return this.getHusq().filter((husq) => husq.userId === userId);
  }


}
