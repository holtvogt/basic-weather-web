import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-main",
    templateUrl: "./main.component.html",
    styleUrls: ["./main.component.css"],
    standalone: true
})
export class MainComponent implements OnInit {
	/**
	 * Creates the {@link MainComponent main component}.
	 */
	constructor() {}

	/**
	 * Angular lifecycle hook that initializes the component.
	 */
	public ngOnInit(): void {}
}
