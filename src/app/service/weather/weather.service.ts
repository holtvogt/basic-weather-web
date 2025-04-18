import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";

import { Weather } from "../../forecast/weather";
import { OpenWeatherMapEndpoint } from "./openWeatherMap.endpoint";
import { DayForecast, ForecastResponse } from "./response/forecast-response";

@Injectable({
	providedIn: 'root',
})
export class WeatherService {
    private forecastTodayURL: string;
    private forecastWeekURL: string;

    /**
     * Creates the {@link WeatherService weather service}.
     * @param http The HTTP client.
     */
    constructor(private http: HttpClient) {
        this.forecastTodayURL = OpenWeatherMapEndpoint.TODAY;
        this.forecastWeekURL = OpenWeatherMapEndpoint.WEEK;
    }

    /**
     * Gets the weekday name for a given number of days from today.
     * @param days The number of days from today.
     * @returns The name of the weekday.
     */
    private getWeekday(days: number): string {
        const date = new Date();
        date.setDate(date.getDate() + days);
        return date.toLocaleDateString("en-GB", { weekday: "long" });
    }

    /**
     * Gets the date in DD/MM/YYYY format for a given number of days from today.
     * @param days The number of days from today.
     * @returns The formatted date string.
     */
    private getDate(days: number): string {
        const date = new Date();
        date.setDate(date.getDate() + days);
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    }

    /**
     * Extracts weather information for a specific day.
     * @param forecastResponse The `ForecastResponse` object containing weather data.
     * @param day The index of the day to extract.
     * @returns A `Weather` object for the specified day.
     */
    private getWeather(forecastResponse: ForecastResponse, day: number): Weather {
        const forecast: DayForecast = forecastResponse.list[day];
        const temperature = forecast.temp;
        const weather = forecast.weather[0];

        return {
            maxTemperature: Math.floor(temperature.max),
            minTemperature: Math.floor(temperature.min),
            weather: weather.main,
            weekday: this.getWeekday(day),
            date: this.getDate(day),
        };
    }

    /**
     * Gets today's forecast by latitude and longitude.
     * @param latitude The latitude.
     * @param longitude The longitude.
     * @returns A `Weather` object containing today's weather information.
     */
    async getForecastTodayByCoordinates(latitude: number, longitude: number): Promise<Weather> {
        const url = `${this.forecastTodayURL}&lat=${latitude}&lon=${longitude}`;
        const forecastResponse = await firstValueFrom(this.http.get<ForecastResponse>(url));
        return this.getWeather(forecastResponse, 0);
    }

    /**
     * Gets the forecast for a given week by latitude and longitude.
     * @param latitude The latitude.
     * @param longitude The longitude.
     * @param startDay The starting day index (e.g., 0 for this week, 7 for next week).
     * @returns A list of `Weather` objects containing the weather information for the week.
     */
    private async getWeeklyForecast(latitude: number, longitude: number, startDay: number): Promise<Weather[]> {
        const url = `${this.forecastWeekURL}&lat=${latitude}&lon=${longitude}`;
        const forecastResponse = await firstValueFrom(this.http.get<ForecastResponse>(url));

        // Generate the forecast for the week dynamically
        return Array.from({ length: 7 }, (_, i) => this.getWeather(forecastResponse, startDay + i));
    }

    /**
     * Gets this week's forecast by latitude and longitude.
     * @param latitude The latitude.
     * @param longitude The longitude.
     * @returns A list of `Weather` objects containing this week's weather information.
     */
    async getForecastThisWeekByCoordinates(latitude: number, longitude: number): Promise<Weather[]> {
        return this.getWeeklyForecast(latitude, longitude, 0);
    }

    /**
     * Gets next week's forecast by latitude and longitude.
     * @param latitude The latitude.
     * @param longitude The longitude.
     * @returns A list of `Weather` objects containing next week's weather information.
     */
    async getForecastNextWeekByCoordinates(latitude: number, longitude: number): Promise<Weather[]> {
        return this.getWeeklyForecast(latitude, longitude, 7);
    }
}
