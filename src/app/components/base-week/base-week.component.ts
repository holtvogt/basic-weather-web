import { ComponentRef, ViewChild, ViewContainerRef } from "@angular/core";
import { Weekday } from "src/app/forecast/weekday";
import { CardComponent } from "../card/card.component";

import { Component } from "@angular/core";
import { Forecast } from "src/app/forecast/forecast";

@Component({
    selector: 'app-base-week',
    template: '',
})
export abstract class BaseWeekComponent {
    protected static readonly WEEKDAYS = [
        Weekday.FIRST,
        Weekday.SECOND,
        Weekday.THIRD,
        Weekday.FOURTH,
        Weekday.FIFTH,
        Weekday.SIXTH,
        Weekday.SEVENTH,
    ];
    
    @ViewChild("first", { read: ViewContainerRef, static: true })
    protected viewContainerReferenceFirst!: ViewContainerRef;
    @ViewChild("rest", { read: ViewContainerRef, static: true })
    protected viewContainerReferenceRest!: ViewContainerRef;
    protected weatherCards: Array<ComponentRef<CardComponent>> = [];

    /**
     * Removes all dynamically created weather cards.
     */
    protected removeCards(): void {
        this.weatherCards.forEach((component) => component.destroy());
        this.weatherCards = [];
    }

    /**
     * Dynamically creates weather cards for the given weekdays and forecast type.
     * @param forecast The forecast type (e.g., THIS_WEEK, NEXT_WEEK).
     */
    protected createWeatherCards(forecast: Forecast): void {
        // Remove existing cards
        this.removeCards();

        // Create and configure weather cards
        BaseWeekComponent.WEEKDAYS.forEach((weekday, index) => {
            const container = index === 0 ? this.viewContainerReferenceFirst : this.viewContainerReferenceRest;
            const card = container.createComponent(CardComponent);
            card.instance.forecast = forecast;
            card.instance.weekday = weekday;
            this.weatherCards.push(card);
        });
    }
}
