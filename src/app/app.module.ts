import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MainComponent } from "./components/main/main.component";
import { CardComponent } from "./components/card/card.component";
import { HeaderComponent } from "./components/header/header.component";

import { GeocodingService } from "./service/geocoding/geocoding.service";
import { WeatherService } from "./service/weather/weather.service";
import { TodayComponent } from "./components/today/today.component";
import { ThisWeekComponent } from "./components/this-week/this-week.component";
import { NextWeekComponent } from "./components/next-week/next-week.component";

@NgModule({
	declarations: [
		AppComponent,
		MainComponent,
		CardComponent,
		HeaderComponent,
		TodayComponent,
		ThisWeekComponent,
		NextWeekComponent,
	],
	imports: [BrowserModule, HttpClientModule, AppRoutingModule],
	providers: [GeocodingService, WeatherService],
	bootstrap: [AppComponent],
})
export class AppModule {}
