import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OpenWeatherMapEndpoint } from './openWeatherMap.endpoint';

@Injectable()
export class WeatherService {

    private forecastTodayURL: string;
    private forecastThisWeekURL: string;
    private forecastNextWeekURL: string;

    constructor(private http: HttpClient) {
        this.forecastTodayURL = OpenWeatherMapEndpoint.TODAY;
        this.forecastThisWeekURL = OpenWeatherMapEndpoint.THIS_WEEK;
        this.forecastNextWeekURL = OpenWeatherMapEndpoint.NEXT_WEEK;
    }

    getForecastTodayByCoordinates(latitude: number, longitude: number) {
        let url = this.forecastTodayURL + '&lat=' + latitude + '&lon=' + longitude;
        this.http.get(url).toPromise().then(data => console.log(data));
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