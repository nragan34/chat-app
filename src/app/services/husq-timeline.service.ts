import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Husq } from '../interfaces/husq';
import { initialHusqs } from '../seeds/husqs'
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class HusqTimelineService {
  private readonly _husqSource = new BehaviorSubject<Husq[]>([])
  readonly husqs$ = this._husqSource.asObservable();

  constructor(private localStorageService: LocalStorageService) {
    const husq: Husq[] = this.localStorageService.getItem('husqs');
    if(husq?.length) {
      this._setHusqs(husq);
    } else {
      this._setHusqs(initialHusqs)
    }
  }

  private _setHusqs(husqs: Husq[]) {
    this._husqSource.next(husqs)
    this.localStorageService.setItem('husqs', husqs);
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
