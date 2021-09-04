import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { NominatimEndpoint } from "./nominatim.endpoint";
import { Location } from "./location";

const FORMAT: string = "json";

@Injectable()
export class GeocodingService {
	constructor(private http: HttpClient) {}

	/**
	 * Gets the current location given by the latitude and longitude.
	 * @param latitude the latitude
	 * @param longitude the longitude
	 * @returns the current location in "<City>, <Country>" format
	 */
	async getLocationByCoordinates(latitude: number, longitude: number): Promise<any> {
		let url =
			NominatimEndpoint.REVERSE_SEARCH + "format=" + FORMAT + "&" + "lat=" + latitude + "&" + "lon=" + longitude;
		return this.http
			.get<Location>(url)
			.toPromise()
			.then((location) => {
				let jsonAddressObject = JSON.parse(JSON.stringify(location.address));
				return jsonAddressObject["city"] + ", " + jsonAddressObject["country"];
			});
	}
}
