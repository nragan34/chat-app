import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';


/**
 * This component is to manage user subscriptions
 */
@Injectable({
  providedIn: 'root'
})
export class NewsManagerService {

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) {

   }

   
}
