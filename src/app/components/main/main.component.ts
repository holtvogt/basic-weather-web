import { Component, OnInit } from '@angular/core';

import { GeocodingService } from '../../service/geocoding/geocoding.service';
import { WeatherService } from '../../service/weather/weather.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  location!: string;

  constructor(private geocodingService: GeocodingService, private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.showUserLocation();
    this.showWeatherToday();
  }

  private showUserLocation() {
    // Get current position
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => this.setLocation(position), error => this.showError(error));
      // Geolocation is not supported
    } else {
      document.getElementById('content-location')!.innerHTML = 'Geolocation is not supported by this browser.';
    }
  }

  private setLocation(position: GeolocationPosition) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    this.location = this.geocodingService.getLocationByCoordinates(latitude, longitude);
  }

  private showError(error: GeolocationPositionError) {
    let locationHeadline = document.getElementById('content-location');
    switch(error.code) {
      case error.PERMISSION_DENIED:
        locationHeadline!.innerHTML = "<strong><em>User denied the request for Geolocation.</em></strong>"
        break;
      case error.POSITION_UNAVAILABLE:
        locationHeadline!.innerHTML = "<strong><em>Location information is unavailable.</em></strong>"
        break;
      case error.TIMEOUT:
        locationHeadline!.innerHTML = "<strong><em>The request to get user location timed out.</em></strong>"
        break;
      default:
        locationHeadline!.innerHTML = "<strong><em>An unknown error occurred while accessing user location.</em></strong>"
        break;
    }
  }

  showWeatherToday() {
    this.weatherService.getForecastTodayByCoordinates(49, 8.6);
  }
}