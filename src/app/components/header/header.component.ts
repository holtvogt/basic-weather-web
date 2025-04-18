import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { GeocodingService } from "src/app/service/geocoding/geocoding.service";

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.css"],
    standalone: true,
})
export class HeaderComponent implements OnInit {
    @ViewChild("navBurger")
	navBurger!: ElementRef;
    @ViewChild("navMenu")
	navMenu!: ElementRef;

    location!: string;

    /**
     * Creates the {@link HeaderComponent header component}.
     * @param router The routing element.
     * @param geocodingService The geocoding service.
     */
    constructor(private router: Router, private geocodingService: GeocodingService) {}

    /**
     * Angular lifecycle hook that initializes the component.
     */
    public ngOnInit(): void {
        this.showUserLocation();
    }

    /**
     * Displays the user's location.
     */
    private showUserLocation(): void {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => this.setLocation(position),
                (error) => this.showError(error)
            );
        } else {
            this.updateLocationMessage("Geolocation is not supported by this browser.");
        }
    }

    /**
     * Sets the user's location using geocoding.
     * @param position The user's geolocation position.
     */
    private setLocation(position: GeolocationPosition): void {
        const { latitude, longitude } = position.coords;
        this.geocodingService
            .getLocationByCoordinates(latitude, longitude)
            .then((location) => (this.location = location));
    }

    /**
     * Displays an error message if geolocation fails.
     * @param error The geolocation error.
     */
    private showError(error: GeolocationPositionError): void {
        let message: string;
        switch (error.code) {
            case error.PERMISSION_DENIED:
                message = "Geolocation request denied.";
                break;
            case error.POSITION_UNAVAILABLE:
                message = "Location information is unavailable.";
                break;
            case error.TIMEOUT:
                message = "The request to get user location timed out.";
                break;
            default:
                message = "An unknown error occurred while accessing user location.";
                break;
        }
        this.updateLocationMessage(message);
    }

    /**
     * Updates the location message in the DOM.
     * @param message The message to display.
     */
    private updateLocationMessage(message: string): void {
        const locationHeadline = document.getElementById("location");
        if (locationHeadline) {
            locationHeadline.innerHTML = `<strong><em>${message}</em></strong>`;
        }
    }

    /**
     * Navigates to the home page.
     */
    public navigateHome(): void {
        this.router.navigateByUrl("home");
    }

    /**
     * Navigates to the weather view for today's forecast.
     */
    public navigateToday(): void {
        this.router.navigateByUrl("today");
    }

    /**
     * Navigates to the weather view for this week's forecast.
     */
    public navigateThisWeek(): void {
        this.router.navigateByUrl("thisWeek");
    }

    /**
     * Navigates to the weather view for next week's forecast.
     */
    public navigateNextWeek(): void {
        this.router.navigateByUrl("nextWeek");
    }

    /**
     * Toggles the navbar burger menu.
     */
    public toggleNavbar(): void {
        this.navBurger.nativeElement.classList.toggle("is-active");
        this.navMenu.nativeElement.classList.toggle("is-active");
    }
}
