import { OpenWeatherMap } from "./openWeatherMap";

/**
 * Represents the OpenWeatherMap endpoints for weather forecasts.
 */
export const OpenWeatherMapEndpoint = {
    /**
     * Generates the weather forecast endpoint for a given number of days.
     * @param days The number of days to fetch (e.g., 1 for today, 7 for a week, 14 for two weeks).
     * @returns The API endpoint URL.
     */
    getForecastEndpoint(days: number): string {
        return `https://api.openweathermap.org/data/2.5/forecast/daily?mode=json&cnt=${days}&units=metric&appid=${OpenWeatherMap.API_KEY}`;
    },
};
