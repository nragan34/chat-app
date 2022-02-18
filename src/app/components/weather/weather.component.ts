import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  currentWeather: any | undefined;
  weatherCodeTransformed: string | undefined
  weatherImage: string | undefined

  constructor(private weatherService: WeatherService) {
    this.currentWeather = this.weatherService.getWeather()
      .subscribe(
        wxData => {
          this.currentWeather = wxData
          this.weatherCodeTransformed = this.weatherService.weatherCodes(wxData?.daily?.weathercode[0])
          this.weatherImage = this.weatherService.weatherImages(wxData?.daily?.weathercode[0])
        }
      )

  }

  ngOnInit(): void {

  }

}
