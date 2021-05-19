import {
  Component,
  OnInit,
  ComponentRef,
  ComponentFactoryResolver,
  ViewContainerRef,
  ViewChild
} from '@angular/core';

import { Forecast } from 'src/app/forecast/forecast';
import { Weekday } from 'src/app/forecast/weekday';

import { CardComponent } from '../card/card.component';
import { GeocodingService } from '../../service/geocoding/geocoding.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  @ViewChild("first", { read: ViewContainerRef })
  viewContainerReferenceFirst!: ViewContainerRef;
  @ViewChild("rest", { read: ViewContainerRef })
  viewContainerReferenceRest!: ViewContainerRef;

  weatherCards!: Array<ComponentRef<CardComponent>>;
  location!: string;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private geocodingService: GeocodingService) {}

  ngOnInit(): void {
    this.showUserLocation();
  }

  ngAfterViewInit() {
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
    this.geocodingService.getLocationByCoordinates(latitude, longitude).then(location => this.location = location);
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
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory<CardComponent>(CardComponent);
    let weatherCardReference = this.viewContainerReferenceFirst.createComponent<CardComponent>(componentFactory);
    // Instantiate weather card component
    let weatherCard = weatherCardReference.instance;

    weatherCard.forecast = Forecast.TODAY;
    weatherCard.weekday = Weekday.FIRST;

    this.weatherCards.push(weatherCardReference);
  }
}