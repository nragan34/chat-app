import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserActiveService {
  private readonly _activeUserSource = new BehaviorSubject<string>('1');
  readonly activeUser$ = this._activeUserSource.asObservable()

  constructor() { }

}
