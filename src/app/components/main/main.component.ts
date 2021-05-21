import {
  Component,
  OnInit,
  ComponentRef,
  ComponentFactoryResolver,
  ViewContainerRef,
  ViewChild,
  AfterViewInit
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
export class MainComponent implements OnInit, AfterViewInit {

  @ViewChild("first", { read: ViewContainerRef, static: true })
  viewContainerReferenceFirst!: ViewContainerRef;
  @ViewChild("rest", { read: ViewContainerRef, static: true })
  viewContainerReferenceRest!: ViewContainerRef;

  location!: string;
  weatherCards: Array<ComponentRef<CardComponent>>;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private geocodingService: GeocodingService) {
    this.weatherCards = [];
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

  private removeCards() {
    this.weatherCards.forEach(component => component.destroy()); 
  }

  ngOnInit(): void {
    this.showUserLocation();
  }

  ngAfterViewInit(): void {}

  showWeatherToday() {
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory<CardComponent>(CardComponent);

    // Main card
    let weatherCardReference = this.viewContainerReferenceFirst.createComponent<CardComponent>(componentFactory);

    // Remove other weather cards
    this.removeCards();

    // Instantiate weather card component
    let weatherCard = weatherCardReference.instance;

    // Assignments
    weatherCard.forecast = Forecast.TODAY;
    weatherCard.weekday = Weekday.FIRST;

    this.weatherCards.push(weatherCardReference);
  }

  showWeatherThisWeek() {
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory<CardComponent>(CardComponent);

    // Main card
    let firstWeatherCardReference = this.viewContainerReferenceFirst.createComponent<CardComponent>(componentFactory); 
    // Remaining cards
    let secondWeatherCardReference = this.viewContainerReferenceRest.createComponent<CardComponent>(componentFactory);
    let thirdWeatherCardReference = this.viewContainerReferenceRest.createComponent<CardComponent>(componentFactory);
    let fourthWeatherCardReference = this.viewContainerReferenceRest.createComponent<CardComponent>(componentFactory);
    let fifthWeatherCardReference = this.viewContainerReferenceRest.createComponent<CardComponent>(componentFactory);
    let sixthWeatherCardReference = this.viewContainerReferenceRest.createComponent<CardComponent>(componentFactory);
    let seventhWeatherCardReference = this.viewContainerReferenceRest.createComponent<CardComponent>(componentFactory);

    // Remove other weather cards
    this.removeCards();

    // Instantiation
    let firstWeatherCard = firstWeatherCardReference.instance;
    let secondWeatherCard = secondWeatherCardReference.instance;
    let thirdWeatherCard = thirdWeatherCardReference.instance;
    let fourthWeatherCard = fourthWeatherCardReference.instance;
    let fifthWeatherCard = fifthWeatherCardReference.instance;
    let sixthWeatherCard = sixthWeatherCardReference.instance;
    let seventhWeatherCard = seventhWeatherCardReference.instance;

    // Assignments
    firstWeatherCard.forecast = Forecast.THIS_WEEK;
    firstWeatherCard.weekday = Weekday.FIRST;
    secondWeatherCard.forecast = Forecast.THIS_WEEK;
    secondWeatherCard.weekday = Weekday.SECOND;
    thirdWeatherCard.forecast = Forecast.THIS_WEEK;
    thirdWeatherCard.weekday = Weekday.THIRD;
    fourthWeatherCard.forecast = Forecast.THIS_WEEK;
    fourthWeatherCard.weekday = Weekday.FOURTH;
    fifthWeatherCard.forecast = Forecast.THIS_WEEK;
    fifthWeatherCard.weekday = Weekday.FIFTH;
    sixthWeatherCard.forecast = Forecast.THIS_WEEK;
    sixthWeatherCard.weekday = Weekday.SIXTH;
    seventhWeatherCard.forecast = Forecast.THIS_WEEK;
    seventhWeatherCard.weekday = Weekday.SEVENTH;

    this.weatherCards.push(firstWeatherCardReference);
    this.weatherCards.push(secondWeatherCardReference);
    this.weatherCards.push(thirdWeatherCardReference);
    this.weatherCards.push(fourthWeatherCardReference);
    this.weatherCards.push(fifthWeatherCardReference);
    this.weatherCards.push(sixthWeatherCardReference);
    this.weatherCards.push(seventhWeatherCardReference);
  }

  showWeatherNextWeek() {
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory<CardComponent>(CardComponent);

    // Main card
    let firstWeatherCardReference = this.viewContainerReferenceFirst.createComponent<CardComponent>(componentFactory); 
    // Remaining cards
    let secondWeatherCardReference = this.viewContainerReferenceRest.createComponent<CardComponent>(componentFactory);
    let thirdWeatherCardReference = this.viewContainerReferenceRest.createComponent<CardComponent>(componentFactory);
    let fourthWeatherCardReference = this.viewContainerReferenceRest.createComponent<CardComponent>(componentFactory);
    let fifthWeatherCardReference = this.viewContainerReferenceRest.createComponent<CardComponent>(componentFactory);
    let sixthWeatherCardReference = this.viewContainerReferenceRest.createComponent<CardComponent>(componentFactory);
    let seventhWeatherCardReference = this.viewContainerReferenceRest.createComponent<CardComponent>(componentFactory);

    // Remove other weather cards
    this.removeCards();

    // Instantiation
    let firstWeatherCard = firstWeatherCardReference.instance;
    let secondWeatherCard = secondWeatherCardReference.instance;
    let thirdWeatherCard = thirdWeatherCardReference.instance;
    let fourthWeatherCard = fourthWeatherCardReference.instance;
    let fifthWeatherCard = fifthWeatherCardReference.instance;
    let sixthWeatherCard = sixthWeatherCardReference.instance;
    let seventhWeatherCard = seventhWeatherCardReference.instance;

    // Assignments
    firstWeatherCard.forecast = Forecast.NEXT_WEEK;
    firstWeatherCard.weekday = Weekday.FIRST;
    secondWeatherCard.forecast = Forecast.NEXT_WEEK;
    secondWeatherCard.weekday = Weekday.SECOND;
    thirdWeatherCard.forecast = Forecast.NEXT_WEEK;
    thirdWeatherCard.weekday = Weekday.THIRD;
    fourthWeatherCard.forecast = Forecast.NEXT_WEEK;
    fourthWeatherCard.weekday = Weekday.FOURTH;
    fifthWeatherCard.forecast = Forecast.NEXT_WEEK;
    fifthWeatherCard.weekday = Weekday.FIFTH;
    sixthWeatherCard.forecast = Forecast.NEXT_WEEK;
    sixthWeatherCard.weekday = Weekday.SIXTH;
    seventhWeatherCard.forecast = Forecast.NEXT_WEEK;
    seventhWeatherCard.weekday = Weekday.SEVENTH;

    this.weatherCards.push(firstWeatherCardReference);
    this.weatherCards.push(secondWeatherCardReference);
    this.weatherCards.push(thirdWeatherCardReference);
    this.weatherCards.push(fourthWeatherCardReference);
    this.weatherCards.push(fifthWeatherCardReference);
    this.weatherCards.push(sixthWeatherCardReference);
    this.weatherCards.push(seventhWeatherCardReference);
  }
}