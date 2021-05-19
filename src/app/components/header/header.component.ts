import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {
  }

  displayWeatherToday() {
    let weatherBox = document.getElementById('weatherBox');
    weatherBox!.innerHTML = 'Weather today is good.';
  }

  displayWeatherThisWeek() {
    let weatherBox = document.getElementById('weatherBox');
    weatherBox!.innerHTML = 'Weather this week is good.';
  }

  displayWeatherNextWeek() {
    let weatherBox = document.getElementById('weatherBox');
    weatherBox!.innerHTML = 'Weather next week is good.';
  }
}