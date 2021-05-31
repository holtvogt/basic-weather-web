import {
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';

import { Forecast } from 'src/app/forecast/forecast';
import { Weekday } from 'src/app/forecast/weekday';
import { GeocodingService } from 'src/app/service/geocoding/geocoding.service';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-next-week',
  templateUrl: './next-week.component.html',
  styleUrls: ['./next-week.component.css']
})
export class NextWeekComponent implements OnInit {

  @ViewChild('first', { read: ViewContainerRef, static: true })
  private viewContainerReferenceFirst!: ViewContainerRef;
  @ViewChild('rest', { read: ViewContainerRef, static: true })
  private viewContainerReferenceRest!: ViewContainerRef;

  private componentFactory: ComponentFactory<CardComponent>;
  private weatherCards: Array<ComponentRef<CardComponent>>;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private geocodingService: GeocodingService) {
    this.componentFactory = this.componentFactoryResolver.resolveComponentFactory<CardComponent>(CardComponent);
    this.weatherCards = [];
  }

  private removeCards() {
    this.weatherCards.forEach(component => component.destroy()); 
  }

  private showWeatherNextWeek() {
    // Main card
    let firstWeatherCardReference = this.viewContainerReferenceFirst.createComponent<CardComponent>(this.componentFactory); 
    // Remaining cards
    let secondWeatherCardReference = this.viewContainerReferenceRest.createComponent<CardComponent>(this.componentFactory);
    let thirdWeatherCardReference = this.viewContainerReferenceRest.createComponent<CardComponent>(this.componentFactory);
    let fourthWeatherCardReference = this.viewContainerReferenceRest.createComponent<CardComponent>(this.componentFactory);
    let fifthWeatherCardReference = this.viewContainerReferenceRest.createComponent<CardComponent>(this.componentFactory);
    let sixthWeatherCardReference = this.viewContainerReferenceRest.createComponent<CardComponent>(this.componentFactory);
    let seventhWeatherCardReference = this.viewContainerReferenceRest.createComponent<CardComponent>(this.componentFactory);

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

  ngOnInit(): void {
    this.showWeatherNextWeek();
  }
}