import { Component, Input, OnInit } from '@angular/core';

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
  forecast?: Forecast;
  @Input()
  weekday?: Weekday;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
  }
}
