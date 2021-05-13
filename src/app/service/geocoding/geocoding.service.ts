import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const NOMINATIM: string = "https://nominatim.openstreetmap.org/search?";
const NOMINATIM_REVERSE: string = "https://nominatim.openstreetmap.org/reverse?";

@Injectable()
export class GeocodingService {

    constructor(private http: HttpClient) {}

    getCityByCoordinates(latitude: number, longitude: number): string {
        return "";
    }
}