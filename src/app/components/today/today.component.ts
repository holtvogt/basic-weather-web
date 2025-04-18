import {
    Component,
    ComponentRef,
    OnInit,
    ViewChild,
    ViewContainerRef,
} from "@angular/core";

import { Forecast } from "src/app/forecast/forecast";
import { Weekday } from "src/app/forecast/weekday";
import { CardComponent } from "../card/card.component";

@Component({
    selector: "app-today",
    templateUrl: "./today.component.html",
    styleUrls: ["./today.component.css"],
    standalone: true,
})
export class TodayComponent implements OnInit {
    @ViewChild("day", { read: ViewContainerRef, static: true })
    private viewContainerReferenceDay!: ViewContainerRef;
    private weatherCard: ComponentRef<CardComponent> | null = null;

	/**
     * Angular lifecycle hook that initializes the component.
     */
    public ngOnInit(): void {
        this.showWeatherToday();
    }

    /**
     * Removes the dynamically created weather card.
     */
    private removeCard(): void {
        if (this.weatherCard) {
            this.weatherCard.destroy();
            this.weatherCard = null;
        }
    }

    /**
     * Dynamically creates a weather card for today.
     */
    private showWeatherToday(): void {
        // Remove the existing card
        this.removeCard();

        // Create and configure the weather card
        const card = this.viewContainerReferenceDay.createComponent(CardComponent);
        card.instance.forecast = Forecast.TODAY;
        card.instance.weekday = Weekday.FIRST;

        // Store the reference to the created card
        this.weatherCard = card;
    }
}
