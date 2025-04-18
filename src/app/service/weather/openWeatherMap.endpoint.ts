import { OpenWeatherMap } from "./openWeatherMap";

/**
 * Represents the OpenWeatherMap endpoints for a time based forecast.
 */
export const OpenWeatherMapEndpoint = {
	/**
	 * Weather forecast endpoint for the current day.
	 */
	TODAY:
		"https://api.openweathermap.org/data/2.5/forecast/daily?mode=json&cnt=1&units=metric&appid=" +
		OpenWeatherMap.API_KEY,

	/**
	 * Weather forecast endpoint for the current week.
	 */
	THIS_WEEK:
		"https://api.openweathermap.org/data/2.5/forecast/daily?mode=json&cnt=7&units=metric&appid=" +
		OpenWeatherMap.API_KEY,

	/**
	 * Weather forecast endpoint for the next week.
	 */
	NEXT_WEEK:
		"https://api.openweathermap.org/data/2.5/forecast/daily?mode=json&cnt=14&units=metric&appid=" +
		OpenWeatherMap.API_KEY,
};
