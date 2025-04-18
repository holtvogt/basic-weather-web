import { Component, OnInit } from "@angular/core";

import { Weather } from "src/app/forecast/weather";
import { WeatherService } from "src/app/service/weather/weather.service";
import { Forecast } from "../../forecast/forecast";
import { Weekday } from "../../forecast/weekday";

@Component({
    selector: "app-card",
    templateUrl: "./card.component.html",
    styleUrls: ["./card.component.css"],
    standalone: true,
})
export class CardComponent implements OnInit {
    forecast!: Forecast;
    weekday!: Weekday;
    weather!: Weather;

    /**
     * Creates the {@link CardComponent card component}.
     * @param weatherService the weather service
     */
    constructor(private weatherService: WeatherService) {}

    /**
     * Angular lifecycle hook that initializes the component.
     */
    public ngOnInit(): void {
        // Get current position
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                this.fetchWeatherData(latitude, longitude);
            });
        }
    }

    /**
     * Fetches weather data based on the forecast and weekday.
     * @param latitude The latitude of the location.
     * @param longitude The longitude of the location.
     */
    private fetchWeatherData(latitude: number, longitude: number): void {
        switch (this.forecast) {
            case Forecast.TODAY:
                this.weatherService
                    .getForecastTodayByCoordinates(latitude, longitude)
                    .then((weather) => (this.weather = weather));
                break;

            case Forecast.THIS_WEEK:
                this.fetchWeeklyWeather(
                    () => this.weatherService.getForecastThisWeekByCoordinates(latitude, longitude)
                );
                break;

            case Forecast.NEXT_WEEK:
                this.fetchWeeklyWeather(
                    () => this.weatherService.getForecastNextWeekByCoordinates(latitude, longitude)
                );
                break;

            default:
                break;
        }
    }

    /**
     * Fetches weather data for a specific day of the week.
     * @param fetchWeather A function to fetch the weekly weather data.
     */
    private fetchWeeklyWeather(fetchWeather: () => Promise<Weather[]>): void {
        fetchWeather().then((weather) => {
            const dayIndex = this.getDayIndex(this.weekday);
            if (dayIndex !== null) {
                this.weather = weather[dayIndex];
            }
        });
    }

    /**
     * Maps the weekday to its corresponding index.
     * @param weekday The weekday.
     * @returns The index of the weekday or null if invalid.
     */
    private getDayIndex(weekday: Weekday): number | null {
        switch (weekday) {
            case Weekday.FIRST:
                return 0;
            case Weekday.SECOND:
                return 1;
            case Weekday.THIRD:
                return 2;
            case Weekday.FOURTH:
                return 3;
            case Weekday.FIFTH:
                return 4;
            case Weekday.SIXTH:
                return 5;
            case Weekday.SEVENTH:
                return 6;
            default:
                return null;
        }
    }
}
