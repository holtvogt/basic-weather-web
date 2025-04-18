import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";

import { NominatimEndpoint } from "./nominatim.endpoint";
import { LocationResponse } from "./response/location-response";

@Injectable({
    providedIn: 'root',
})
export class GeocodingService {
	private static readonly FORMAT = "json";
	
	constructor(private http: HttpClient) {}

	/**
	 * Gets the current location given by the latitude and longitude.
	 * @param latitude the latitude
	 * @param longitude the longitude
	 * @returns the current location in "<City>, <Country>" format
	 */
	async getLocationByCoordinates(latitude: number, longitude: number): Promise<string> {
        try {
            let url = `${NominatimEndpoint.REVERSE_SEARCH}format=${GeocodingService.FORMAT}&lat=${latitude}&lon=${longitude}`;
            const location = await firstValueFrom(this.http.get<LocationResponse>(url));
            let jsonAddressObject = location.address;
            return `${jsonAddressObject.city}, ${jsonAddressObject.country}`;
        } catch (error) {
            console.error("Error fetching location:", error);
            return "Unknown Location";
        }
    }
}
