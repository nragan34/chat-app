import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';


const STORAGE_KEY = 'news-subscriptions'

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
