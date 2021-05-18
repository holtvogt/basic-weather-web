import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { NominatimEndpoint } from './nominatim.endpoint';
import { Location } from './location';

const FORMAT: string = 'json';

@Injectable()
export class GeocodingService {

    private location!: string;

    constructor(private http: HttpClient) {}

    getLocationByCoordinates(latitude: number, longitude: number): string {
        let url = NominatimEndpoint.REVERSE_SEARCH + 'format=' + FORMAT + '&' + 'lat=' + latitude + '&' + 'lon=' + longitude;
        this.http.get<Location>(url).toPromise().then(data => {
            // Get attribute 'address' as an own JSON object
            let jsonAddressObject = JSON.parse(JSON.stringify(data['address']));
            this.location = jsonAddressObject['city'];
        });
        return this.location;
    }
}