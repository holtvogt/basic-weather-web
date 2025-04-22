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
    /**
     * The max. number of days that can be fetched from the OpenWeatherMap API.
     */
    private static readonly MAX_FETCHABLE_DAYS = 16;

    /**
     * Creates the {@link WeatherService weather service}.
     * @param http The HTTP client.
     */
    constructor(private http: HttpClient) {}

    /**
     * Gets today's forecast by latitude and longitude.
     * @param latitude The latitude.
     * @param longitude The longitude.
     * @returns A `Weather` object containing today's weather information.
     */
    async getForecastTodayByCoordinates(latitude: number, longitude: number): Promise<Weather> {
        const forecastResponse = await this.fetchForecast(latitude, longitude, 1);
        return this.getWeather(forecastResponse, 0, 1)[0];
    }

    /**
     * Gets this week's forecast by latitude and longitude.
     * @param latitude The latitude.
     * @param longitude The longitude.
     * @returns A list of `Weather` objects containing this week's weather information.
     */
    async getForecastThisWeekByCoordinates(latitude: number, longitude: number): Promise<Weather[]> {
        return this.getForecast(latitude, longitude, 0, 7);
    }

    /**
     * Gets next week's forecast by latitude and longitude.
     * @param latitude The latitude.
     * @param longitude The longitude.
     * @returns A list of `Weather` objects containing next week's weather information.
     */
    async getForecastNextWeekByCoordinates(latitude: number, longitude: number): Promise<Weather[]> {
        return this.getForecast(latitude, longitude, 7, 14);
    }

    /**
     * Gets the forecast for a specific range of days by latitude and longitude.
     * @param latitude The latitude.
     * @param longitude The longitude.
     * @param startDay The starting day index.
     * @param endDay The ending day index (exclusive).
     * @returns A list of `Weather` objects containing the weather information for the specified range.
     */
    private async getForecast(latitude: number, longitude: number, startDay: number, endDay: number): Promise<Weather[]> {
        const daysToFetch = Math.min(endDay - startDay, WeatherService.MAX_FETCHABLE_DAYS);
        const forecastResponse = await this.fetchForecast(latitude, longitude, daysToFetch);

        return this.getWeather(forecastResponse, startDay, endDay);
    }

    /**
     * Fetches the forecast data from the API.
     * @param latitude The latitude.
     * @param longitude The longitude.
     * @param days The number of days to fetch.
     * @returns The `ForecastResponse` object containing weather data.
     */
    private async fetchForecast(latitude: number, longitude: number, days: number): Promise<ForecastResponse> {
        const url = `${OpenWeatherMapEndpoint.getForecastEndpoint(days)}&lat=${latitude}&lon=${longitude}`;
        return firstValueFrom(this.http.get<ForecastResponse>(url));
    }

    /**
     * Extracts weather information for a range of days.
     * @param forecastResponse The `ForecastResponse` object containing weather data.
     * @param startDay The starting day index.
     * @param endDay The ending day index (exclusive).
     * @returns A list of `Weather` objects for the specified range of days.
     */
    private getWeather(forecastResponse: ForecastResponse, startDay: number, endDay: number): Weather[] {
        return Array.from({ length: endDay - startDay }, (_, i) => {
            const day = startDay + i;
            return this.createWeatherObject(forecastResponse.list[day], day);
        });
    }

    /**
     * Creates a Weather object based on the provided forecast data and day offset.
     * @param forecast The forecast data for a specific day, including temperature and weather details.
     * @param day The day offset from the current day (e.g., 0 for today, 1 for tomorrow).
     * @returns A Weather object containing the maximum and minimum temperatures, weather condition,
     *          weekday name, and formatted date for the specified day.
     */
    private createWeatherObject(forecast: DayForecast, day: number): Weather {
        const temperature = forecast.temp;
        const weather = forecast.weather[0];
    
        return {
            maxTemperature: Math.floor(temperature.max),
            minTemperature: Math.floor(temperature.min),
            weather: weather.main,
            weekday: this.getWeekday(day),
            date: this.getDate(day),
        } as Weather;
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
}
