import { OpenWeatherMap } from "./openWeatherMap";

export const OpenWeatherMapEndpoint = {
    TODAY: 'https://pro.openweathermap.org/data/2.5/forecast/climate?mode=json&cnt=1&units=metric&appid=' + OpenWeatherMap.API_KEY,
    THIS_WEEK: 'https://pro.openweathermap.org/data/2.5/forecast/climate?mode=json&cnt=7&units=metric&appid=' + OpenWeatherMap.API_KEY,
    NEXT_WEEK: 'https://pro.openweathermap.org/data/2.5/forecast/climate?mode=json&cnt=14&units=metric&appid=' + OpenWeatherMap.API_KEY
};