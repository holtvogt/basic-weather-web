import { OpenWeatherMap } from "./openWeatherMap";

export const OpenWeatherMapEndpoint = {
    TODAY: 'https://pro.openweathermap.org/data/2.5/forecast/climate?appid=' + OpenWeatherMap.API_KEY + '&cnt=1&units=metric',
    THIS_WEEK: 'https://pro.openweathermap.org/data/2.5/forecast/climate?appid=' + OpenWeatherMap.API_KEY + '&cnt=7&units=metric',
    NEXT_WEEK: 'https://pro.openweathermap.org/data/2.5/forecast/climate?appid=' + OpenWeatherMap.API_KEY + '&cnt=14&units=metric'
};