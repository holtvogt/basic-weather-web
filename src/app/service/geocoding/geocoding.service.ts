import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { NominatimEndpoint } from './nominatim.endpoint';
import { Location } from './location';

const FORMAT: string = 'json';

@Injectable()
export class GeocodingService {

    constructor(private http: HttpClient) {}

    getLocationByCoordinates(latitude: number, longitude: number): Observable<Location> {
        let url = NominatimEndpoint.REVERSE_SEARCH + 'format=' + FORMAT + '&' + 'lat=' + latitude + '&' + 'lon=' + longitude;
        return this.http.get<Location>(url);
    }
}