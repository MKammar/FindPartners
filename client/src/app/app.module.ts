import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { PartnersSearchComponent } from './partners-search/partners-search.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { NgxPaginationModule }  from 'ngx-pagination';
import { NavbarComponent } from './navbar/navbar.component';
import { MapViewComponent } from './map-view/map-view.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    PartnersSearchComponent,
    routingComponents,
    NavbarComponent,
    MapViewComponent,
    HomeComponent
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    AppRoutingModule,
    MatCardModule,
    MatButtonModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
