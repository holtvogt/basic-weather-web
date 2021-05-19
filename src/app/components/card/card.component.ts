import { Component, Input, OnInit } from '@angular/core';
import { Weather } from 'src/app/forecast/weather';

import { WeatherService } from 'src/app/service/weather/weather.service';
import { Forecast } from '../../forecast/forecast';
import { Weekday } from '../../forecast/weekday';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input()
  forecast!: Forecast;
  @Input()
  weekday!: Weekday;
  weather!: Weather;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    switch (this.forecast) {
      /**
       * Today.
       */
      case Forecast.TODAY:
        this.weatherService.getForecastTodayByCoordinates(49.006889, 8.403653).then(weather => this.weather = weather);
        break;

      /**
       * This week.
       */
      case Forecast.THIS_WEEK:
        switch (this.weekday) {
          case Weekday.FIRST:
            this.weatherService.getForecastThisWeekByCoordinates(49.006889, 8.403653).then(weather => this.weather = weather[0]);
            break;
          case Weekday.SECOND:
            this.weatherService.getForecastThisWeekByCoordinates(49.006889, 8.403653).then(weather => this.weather = weather[1]);
            break;
          case Weekday.THIRD:
            this.weatherService.getForecastThisWeekByCoordinates(49.006889, 8.403653).then(weather => this.weather = weather[2]);
            break;
          case Weekday.FOURTH:
            this.weatherService.getForecastThisWeekByCoordinates(49.006889, 8.403653).then(weather => this.weather = weather[3]);
            break;
          case Weekday.FIFTH:
            this.weatherService.getForecastThisWeekByCoordinates(49.006889, 8.403653).then(weather => this.weather = weather[4]);
            break;
          case Weekday.SIXTH:
            this.weatherService.getForecastThisWeekByCoordinates(49.006889, 8.403653).then(weather => this.weather = weather[5]);
            break;
          case Weekday.SEVENTH:
            this.weatherService.getForecastThisWeekByCoordinates(49.006889, 8.403653).then(weather => this.weather = weather[6]);
            break; 
          default:
            break;
        }
        break;

      /**
       * Next week.
       */
      case Forecast.NEXT_WEEK:
        switch (this.weekday) {
          case Weekday.FIRST:
            this.weatherService.getForecastThisWeekByCoordinates(49.006889, 8.403653).then(weather => this.weather = weather[7]);
            break;
          case Weekday.SECOND:
            this.weatherService.getForecastThisWeekByCoordinates(49.006889, 8.403653).then(weather => this.weather = weather[8]);
            break;
          case Weekday.THIRD:
            this.weatherService.getForecastThisWeekByCoordinates(49.006889, 8.403653).then(weather => this.weather = weather[9]);
            break;
          case Weekday.FOURTH:
            this.weatherService.getForecastThisWeekByCoordinates(49.006889, 8.403653).then(weather => this.weather = weather[10]);
            break;
          case Weekday.FIFTH:
            this.weatherService.getForecastThisWeekByCoordinates(49.006889, 8.403653).then(weather => this.weather = weather[11]);
            break;
          case Weekday.SIXTH:
            this.weatherService.getForecastThisWeekByCoordinates(49.006889, 8.403653).then(weather => this.weather = weather[12]);
            break;
          case Weekday.SEVENTH:
            this.weatherService.getForecastThisWeekByCoordinates(49.006889, 8.403653).then(weather => this.weather = weather[13]);
            break; 
          default:
            break;
        }
        break;
      default:
        break;
    }
  }
}
