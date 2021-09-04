import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Weather } from "../../forecast/weather";
import { OpenWeatherMapEndpoint } from "./openWeatherMap.endpoint";
import { Days } from "./days";

@Injectable()
export class WeatherService {
	private forecastTodayURL: string;
	private forecastThisWeekURL: string;
	private forecastNextWeekURL: string;

	/**
	 * Creates the {@link WeatherService weather service}.
	 * @param http the HTTP client
	 */
	constructor(private http: HttpClient) {
		this.forecastTodayURL = OpenWeatherMapEndpoint.TODAY;
		this.forecastThisWeekURL = OpenWeatherMapEndpoint.THIS_WEEK;
		this.forecastNextWeekURL = OpenWeatherMapEndpoint.NEXT_WEEK;
	}

	private getWeekday(days: number): string {
		let date = new Date();
		date.setDate(date.getDate() + days);
		return date.toLocaleDateString("en-GB", { weekday: "long" });
	}

	private getDate(days: number) {
		let date = new Date();
		date.setDate(date.getDate() + days);
		return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
	}

	private getWeather(days: Days, day: number): Weather {
		// JSON formatting
		let jsonForecastObject = JSON.parse(JSON.stringify(days.list))[day];
		let jsonTemperatureObject = jsonForecastObject["temp"];
		let jsonWeatherObject = jsonForecastObject["weather"];

		// Decimals are not necessary for degree values
		let max = Math.floor(jsonTemperatureObject["max"]);
		let min = Math.floor(jsonTemperatureObject["min"]);

		let forecast: Weather = {
			maxTemperature: max,
			minTemperature: min,
			weather: jsonWeatherObject[0]["main"],
			weekday: this.getWeekday(day),
			date: this.getDate(day),
		};

		return forecast;
	}

	/**
	 * Gets the today's forecast by given latitude and longitude
	 * @param latitude the latitude
	 * @param longitude the longitude
	 * @returns a weather object containing the current weather information for today
	 */
	async getForecastTodayByCoordinates(latitude: number, longitude: number): Promise<any> {
		let url = this.forecastTodayURL + "&lat=" + latitude + "&lon=" + longitude;
		return this.http
			.get<Days>(url)
			.toPromise()
			.then((days) => {
				return this.getWeather(days, 0);
			});
	}

	/**
	 * Gets the this week's forecast by given latitude and longitude
	 * @param latitude the latitude
	 * @param longitude the longitude
	 * @returns a weather list object containing the current weather information for this week
	 */
	async getForecastThisWeekByCoordinates(latitude: number, longitude: number): Promise<any[]> {
		let url = this.forecastThisWeekURL + "&lat=" + latitude + "&lon=" + longitude;
		return this.http
			.get<Days>(url)
			.toPromise()
			.then((days) => {
				let today = this.getWeather(days, 0);
				let todayPlusOne = this.getWeather(days, 1);
				let todayPlusTwo = this.getWeather(days, 2);
				let todayPlusThree = this.getWeather(days, 3);
				let todayPlusFour = this.getWeather(days, 4);
				let todayPlusFive = this.getWeather(days, 5);
				let todayPlusSix = this.getWeather(days, 6);

				let thisWeeksForecast = [
					today,
					todayPlusOne,
					todayPlusTwo,
					todayPlusThree,
					todayPlusFour,
					todayPlusFive,
					todayPlusSix,
				];

				return thisWeeksForecast;
			});
	}

	/**
	 * Gets the next week's forecast by given latitude and longitude
	 * @param latitude the latitude
	 * @param longitude the longitude
	 * @returns a weather list object containing the current weather information for next week
	 */
	async getForecastNextWeekByCoordinates(latitude: number, longitude: number): Promise<any[]> {
		let url = this.forecastNextWeekURL + "&lat=" + latitude + "&lon=" + longitude;
		return this.http
			.get<Days>(url)
			.toPromise()
			.then((days) => {
				let todayPlusSeven = this.getWeather(days, 7);
				let todayPlusEight = this.getWeather(days, 8);
				let todayPlusNine = this.getWeather(days, 9);
				let todayPlusTen = this.getWeather(days, 10);
				let todayPlusEleven = this.getWeather(days, 11);
				let todayPlusTwelve = this.getWeather(days, 12);
				let todayPlusThirteen = this.getWeather(days, 13);

				let nextWeeksForecast = [
					todayPlusSeven,
					todayPlusEight,
					todayPlusNine,
					todayPlusTen,
					todayPlusEleven,
					todayPlusTwelve,
					todayPlusThirteen,
				];

				return nextWeeksForecast;
			});
	}
}
