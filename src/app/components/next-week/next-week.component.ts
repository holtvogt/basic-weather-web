import {
    Component,
    OnInit
} from "@angular/core";

import { Forecast } from "src/app/forecast/forecast";
import { BaseWeekComponent } from "../base-week/base-week.component";

@Component({
    selector: "app-next-week",
    templateUrl: "./next-week.component.html",
    styleUrls: ["./next-week.component.css"],
    standalone: true,
})
export class NextWeekComponent extends BaseWeekComponent implements OnInit {
	/**
     * Angular lifecycle hook that initializes the component.
     */
    public ngOnInit(): void {
        this.createWeatherCards(Forecast.NEXT_WEEK);
    }
}
