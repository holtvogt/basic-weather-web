import {
	Component,
	ComponentFactory,
	ComponentFactoryResolver,
	ComponentRef,
	OnInit,
	ViewChild,
	ViewContainerRef,
} from "@angular/core";

import { Forecast } from "src/app/forecast/forecast";
import { Weekday } from "src/app/forecast/weekday";
import { CardComponent } from "../card/card.component";

@Component({
	selector: "app-this-week",
	templateUrl: "./this-week.component.html",
	styleUrls: ["./this-week.component.css"],
})
export class ThisWeekComponent implements OnInit {
	@ViewChild("first", { read: ViewContainerRef, static: true })
	private viewContainerReferenceFirst!: ViewContainerRef;
	@ViewChild("rest", { read: ViewContainerRef, static: true })
	private viewContainerReferenceRest!: ViewContainerRef;

	private componentFactory: ComponentFactory<CardComponent>;
	private weatherCards: Array<ComponentRef<CardComponent>>;

	/**
	 * Creates the {@link ThisWeekComponent this week component}.
	 * @param componentFactoryResolver the component factory resolver
	 */
	constructor(private componentFactoryResolver: ComponentFactoryResolver) {
		this.componentFactory = this.componentFactoryResolver.resolveComponentFactory<CardComponent>(CardComponent);
		this.weatherCards = [];
	}

	private removeCards() {
		this.weatherCards.forEach((component) => component.destroy());
	}

	private showWeatherThisWeek() {
		// Main card
		let firstWeatherCardReference = this.viewContainerReferenceFirst.createComponent<CardComponent>(
			this.componentFactory
		);
		// Remaining cards
		let secondWeatherCardReference = this.viewContainerReferenceRest.createComponent<CardComponent>(
			this.componentFactory
		);
		let thirdWeatherCardReference = this.viewContainerReferenceRest.createComponent<CardComponent>(
			this.componentFactory
		);
		let fourthWeatherCardReference = this.viewContainerReferenceRest.createComponent<CardComponent>(
			this.componentFactory
		);
		let fifthWeatherCardReference = this.viewContainerReferenceRest.createComponent<CardComponent>(
			this.componentFactory
		);
		let sixthWeatherCardReference = this.viewContainerReferenceRest.createComponent<CardComponent>(
			this.componentFactory
		);
		let seventhWeatherCardReference = this.viewContainerReferenceRest.createComponent<CardComponent>(
			this.componentFactory
		);

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

	ngOnInit(): void {
		this.showWeatherThisWeek();
	}
}
