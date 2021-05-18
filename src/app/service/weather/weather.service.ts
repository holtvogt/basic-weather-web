import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OpenWeatherMapEndpoint } from './openWeatherMap.endpoint';
import { Days } from './days';
import { Weather } from './weather';

@Injectable()
export class WeatherService {

    private forecastTodayURL: string;
    private forecastThisWeekURL: string;
    private forecastNextWeekURL: string;

    weatherForecast: Weather[];

    constructor(private http: HttpClient) {
        this.forecastTodayURL = OpenWeatherMapEndpoint.TODAY;
        this.forecastThisWeekURL = OpenWeatherMapEndpoint.THIS_WEEK;
        this.forecastNextWeekURL = OpenWeatherMapEndpoint.NEXT_WEEK;
        this.weatherForecast = new Array(3);
    }

    private getWeekday(): string {
        return new Date().toLocaleDateString("default", { weekday: "long" });
    }

    private getDate() {
        let date = new Date();
        return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    }

    getForecastTodayByCoordinates(latitude: number, longitude: number) {
        let url = this.forecastTodayURL + '&lat=' + latitude + '&lon=' + longitude;
        this.http.get<Days>(url).toPromise().then(data => {
            // JSON formatting
            let jsonTodayObject = JSON.parse(JSON.stringify(data['list']))[0];
            let jsonTemperatureObject = jsonTodayObject['temp'];
            let jsonWeatherObject = jsonTodayObject['weather']; 
            
            let forecastToday: Weather = {
                maxTemperature: jsonTemperatureObject['max'],
                minTemperature: jsonTemperatureObject['min'],
                weather: jsonWeatherObject[0]['main'],
                weekday: this.getWeekday(),
                date: this.getDate()
            }

            this.weatherForecast[0] = forecastToday;
        });
    }

    getForecastThisWeekByCoordinates(latitude: number, longitude: number) {
        let url = this.forecastThisWeekURL + '&lat=' + latitude + '&lon=' + longitude;
        this.http.get(url).toPromise().then(data => console.log(data));
    }

    getForecastNextWeekByCoordinates(latitude: number, longitude: number) {
        let url = this.forecastNextWeekURL + '&lat=' + latitude + '&lon=' + longitude;
        this.http.get(url).toPromise().then(data => console.log(data));
    }
}