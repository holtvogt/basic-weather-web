import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { GeocodingService } from "src/app/service/geocoding/geocoding.service";

@Component({
	selector: "app-header",
	templateUrl: "./header.component.html",
	styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
	@ViewChild("navBurger")
	navBurger!: ElementRef;
	@ViewChild("navMenu")
	navMenu!: ElementRef;

	location!: string;

	/**
	 * Creates the {@link HeaderComponent header component}.
	 * @param router the routing element
	 * @param geocodingService the geocoding service
	 */
	constructor(private router: Router, private geocodingService: GeocodingService) {}

	private showUserLocation() {
		// Get current position
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => this.setLocation(position),
				(error) => this.showError(error)
			);
			// Geolocation is not supported
		} else {
			document.getElementById("location")!.innerHTML = "Geolocation is not supported by this browser.";
		}
	}

	private setLocation(position: GeolocationPosition) {
		let latitude = position.coords.latitude;
		let longitude = position.coords.longitude;
		this.geocodingService
			.getLocationByCoordinates(latitude, longitude)
			.then((location) => (this.location = location));
	}

	private showError(error: GeolocationPositionError) {
		let locationHeadline = document.getElementById("location");
		switch (error.code) {
			case error.PERMISSION_DENIED:
				locationHeadline!.innerHTML = "<strong><em>Geolocation request denied.</em></strong>";
				break;
			case error.POSITION_UNAVAILABLE:
				locationHeadline!.innerHTML = "<strong><em>Location information is unavailable.</em></strong>";
				break;
			case error.TIMEOUT:
				locationHeadline!.innerHTML = "<strong><em>The request to get user location timed out.</em></strong>";
				break;
			default:
				locationHeadline!.innerHTML =
					"<strong><em>An unknown error occurred while accessing user location.</em></strong>";
				break;
		}
	}

	ngOnInit(): void {
		this.showUserLocation();
	}

	/**
	 * Navigates to home page.
	 */
	navigateHome() {
		this.router.navigateByUrl("home");
	}

	/**
	 * Navigates to weather view for today's day.
	 */
	navigateToday() {
		this.router.navigateByUrl("today");
	}

	/**
	 * Navigates to weather view for this week's view.
	 */
	navigateThisWeek() {
		this.router.navigateByUrl("thisWeek");
	}

	/**
	 * Navigates to weather view for next week's view.
	 */
	navigateNextWeek() {
		this.router.navigateByUrl("nextWeek");
	}

	/**
	 * Toggles the navbar burger.
	 */
	toggleNavbar() {
		this.navBurger.nativeElement.classList.toggle("is-active");
		this.navMenu.nativeElement.classList.toggle("is-active");
	}
}
