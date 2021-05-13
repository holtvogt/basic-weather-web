import { Component, OnInit } from '@angular/core';

import { GeocodingService } from '../service/geocoding/geocoding.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  location!: string;

  constructor(private geocodingService: GeocodingService) {}

  ngOnInit(): void {
    // Get current position
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        this.geocodingService.getLocationByCoordinates(latitude, longitude).subscribe(data => {
          // Get attribute 'address' as an own JSON object
          let jsonAddressObject = JSON.parse(JSON.stringify(data['address']));
          console.log(jsonAddressObject);
          let city = jsonAddressObject['city'];
          let state = jsonAddressObject['state'];
          let country = jsonAddressObject['country'];
          this.location = city + ', ' + state + ', ' + country;
        });
      });
      // User denied access
    } else {
      document.getElementsByClassName('sub-title')[0].innerHTML = 'No location access granted.';
    }
  }
}