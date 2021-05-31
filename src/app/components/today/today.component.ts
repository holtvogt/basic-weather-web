import {
  AfterViewInit,
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
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.css']
})
export class TodayComponent implements OnInit {

  @ViewChild('day', { read: ViewContainerRef, static: true })
  private viewContainerReferenceDay!: ViewContainerRef;

  private componentFactory: ComponentFactory<CardComponent>;
  private weatherCard: Array<ComponentRef<CardComponent>>;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private geocodingService: GeocodingService) {
    this.componentFactory = this.componentFactoryResolver.resolveComponentFactory<CardComponent>(CardComponent);
    this.weatherCard = [];
  }

  private removeCards() {
    this.weatherCard.forEach(component => component.destroy()); 
  }

  private showWeatherToday() {
    // Main card
    let weatherCardReference = this.viewContainerReferenceDay.createComponent<CardComponent>(this.componentFactory);

    // Remove other weather cards
    this.removeCards();

    // Instantiate weather card component
    let weatherCard = weatherCardReference.instance;

    // Assignments
    weatherCard.forecast = Forecast.TODAY;
    weatherCard.weekday = Weekday.FIRST;

    this.weatherCard.push(weatherCardReference);
  }

  ngOnInit(): void {
    this.showWeatherToday();
  }
}
