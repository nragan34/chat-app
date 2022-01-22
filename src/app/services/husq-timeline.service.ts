import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Husq } from '../interfaces/husq';
import { initialHusqs } from '../seeds/husqs'

@Injectable({
  providedIn: 'root',
})
export class HusqTimelineService {
  private readonly _husqSource = new BehaviorSubject<Husq[]>(initialHusqs)
  readonly husqs$ = this._husqSource.asObservable();

  constructor() { }

  private _setHusqs(husqs: Husq[]) {
    this._husqSource.next(husqs)
  }

  getHusq(): Husq[] {
    return this._husqSource.getValue()
  }

  addHusq(husq: Husq): void {
    const husqs = [...this.getHusq(), husq]
    this._setHusqs(husqs)
  }

  removeHusq(husqId: string): void {
    const husqs = [
      ...this.getHusq().filter(husq => husq.id !== husqId)
    ]
    this._setHusqs(husqs)
  }

  getHusqById(id: string): Husq| undefined{
    return this.getHusq().find(husqs => husqs.id === id)
  }


}
