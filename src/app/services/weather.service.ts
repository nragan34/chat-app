import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { 
    console.log(environment.weather.baseURL)
  }

  // get endpoint json
  getWeather(): Observable<any> {
    return this.http.get(environment.weather.baseURL)
  }

  getCORSPlease() {
    return this.http.get('/api')
  }

}
