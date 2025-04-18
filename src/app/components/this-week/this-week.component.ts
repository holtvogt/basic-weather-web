import {
    Component,
    OnInit
} from "@angular/core";

import { Forecast } from "src/app/forecast/forecast";
import { BaseWeekComponent } from "../base-week/base-week.component";

@Component({
    selector: "app-this-week",
    templateUrl: "./this-week.component.html",
    styleUrls: ["./this-week.component.css"],
    standalone: true,
})
export class ThisWeekComponent extends BaseWeekComponent implements OnInit {
	/**
     * Angular lifecycle hook that initializes the component.
     */
    public ngOnInit(): void {
        this.createWeatherCards(Forecast.THIS_WEEK);
    }
}
