import { OpenWeatherMap } from "./openWeatherMap";

export const OpenWeatherMapEndpoint = {
    CURRENT: 'https://pro.openweathermap.org/data/2.5/forecast/climate?appid=' + OpenWeatherMap.API_KEY + '&cnt=1',
    THIS_WEEK: 'https://pro.openweathermap.org/data/2.5/forecast/climate?appid=' + OpenWeatherMap.API_KEY + '&cnt=7',
    NEXT_WEEK: 'https://pro.openweathermap.org/data/2.5/forecast/climate?appid=' + OpenWeatherMap.API_KEY + '&cnt=14'
};