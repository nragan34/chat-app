import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  currentWeather: any | undefined;

  constructor(private weatherService: WeatherService) {
    this.weatherService.getWeather().subscribe(wxData => this.currentWeather = wxData)
  }

  ngOnInit(): void {
  }

}
