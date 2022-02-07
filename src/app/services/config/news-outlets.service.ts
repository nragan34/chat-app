import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsOutletsService {

  private readonly _newsOutletsSource = new BehaviorSubject<[]>([]);
  readonly newsOutlets$ =  this._newsOutletsSource.asObservable();

  // keep track of user subscriptions and observables
  constructor() { }
}
