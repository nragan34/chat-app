import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Husq } from '../interfaces/husq';
import { initialHusqs } from '../seeds/husqs'

@Injectable({
  providedIn: 'root',
})
export class TimelineService {
  // husqs: Husq[] = initialHusqs
  private readonly _husqSource = new BehaviorSubject<Husq[]>(initialHusqs)
  readonly husqs$ = this._husqSource.asObservable();

  constructor() { }


    // add husq
    private _setHusq(husqs: Husq[]) {
      this._husqSource.next(husqs)
    }

    getHusq() {
      return this._husqSource.getValue();
    }

    addHusq(husq: Husq) {
      const husqs = [...this.getHusq(), husq]
      this._setHusq(husqs)
    }


}
