import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { CardComponent } from './components/card/card.component';
import { HeaderComponent } from './components/header/header.component';

import { GeocodingService } from './service/geocoding/geocoding.service';
import { WeatherService } from './service/weather/weather.service';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    CardComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    GeocodingService,
    WeatherService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}