/**
 * Represents the forecast data returned by the OpenWeather API.
 */
export interface ForecastResponse {
    city: {
        id: number;
        name: string;
        coord: {
            lon: number;
            lat: number;
        };
        country: string;
        population: number;
        timezone: number;
    };
    cod: string;
    message: number;
    cnt: number;
    list: DayForecast[];
}

/**
 * Represents the forecast for a single day.
 */
export interface DayForecast {
    dt: number;
    sunrise: number;
    sunset: number;
    temp: {
        day: number;
        min: number;
        max: number;
        night: number;
        eve: number;
        morn: number;
    };
    feels_like: {
        day: number;
        night: number;
        eve: number;
        morn: number;
    };
    pressure: number;
    humidity: number;
    weather: WeatherCondition[];
    speed: number;
    deg: number;
    gust: number;
    clouds: number;
    pop: number;
    rain?: number; // Optional, as it may not always be present
}

/**
 * Represents a weather condition (e.g., "Rain", "Sunny").
 */
export interface WeatherCondition {
    id: number;
    main: string;
    description: string;
    icon: string;
}
