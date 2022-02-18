import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) {
  }

  // get endpoint json
  getWeather(): Observable<any> {
    return this.http.get(environment.weather.baseURL)
  }

  getCORSPlease() {
    return this.http.get('/api')
  }

  weatherCodes(weatherCode: number): string {
    // 95 & 99 only available in central Europe
    const codes = {
      0: "Clear Sky",
      1: "Mainly clear, partly cloudy, and overcast",
      2: "Mainly clear, partly cloudy, and overcast",
      3: "Mainly clear, partly cloudy, and overcast",
      45: "Fog and depositing rime fog",
      48: "Fog and depositing rime fog",
      51: "Drizzle: Light, moderate, and dense intensity",
      53: "Drizzle: Light, moderate, and dense intensity",
      54: "Drizzle: Light, moderate, and dense intensity",
      56: "Freezing Drizzle: Light and dense intensity",
      57: "Freezing Drizzle: Light and dense intensity",
      61: "Rain: Slight, moderate and heavy intensity",
      63: "Rain: Slight, moderate and heavy intensity",
      65: "Rain: Slight, moderate and heavy intensity",
      66: "Freezing Rain: Light and heavy intensity",
      67: "Freezing Rain: Light and heavy intensity",
      71: "Snow fall: Slight, moderate, and heavy intensity",
      73: "Snow fall: Slight, moderate, and heavy intensity",
      75: "Snow fall: Slight, moderate, and heavy intensity",
      77: "Snow grains",
      80: "Rain showers: Slight, moderate, and violent",
      81: "Rain showers: Slight, moderate, and violent",
      82: "Rain showers: Slight, moderate, and violent",
      85: "Snow showers slight and heavy",
      86: "Snow showers slight and heavy",
      95: "Thunderstorm: Slight or moderate",
      96: "Thunderstorm with slight and heavy hail",
      98: "Thunderstorm with slight and heavy hail",

    }
    return codes[weatherCode];
  }

  weatherImages(weatherCode: number): string {

    const codes = {
      0: "wi-day-sunny",
      1: "wi-day-cloudy",
      2: "wi-day-cloudy",
      3: "wi-day-cloudy",
      45: "wi-day-fog",
      48: "wi-day-fog",
      51: "wi-day-sprinkle",
      53: "wi-day-sprinkle",
      54: "wi-day-sprinkle",
      56: "wi-day-sleet",
      57: "wi-day-sleet",
      61: "wi-day-rain",
      63: "wi-day-rain",
      65: "wi-day-rain",
      66: "wi-day-rain-mix",
      67: "wi-day-rain-mix",
      71: "wi-day-snow-wind",
      73: "wi-day-snow-wind",
      75: "wi-day-snow-wind",
      77: "wi-day-sleet",
      80: "wi-day-rain",
      81: "wi-day-rain",
      82: "wi-day-rain",
      85: "Snow showers slight and heavy",
      86: "Snow showers slight and heavy",
      95: "wi-day-snow-thunderstorm",
      96: "Thunderstorm with slight and heavy hail",
      98: "Thunderstorm with slight and heavy hail",
    }

    return codes[weatherCode];
  }
}
