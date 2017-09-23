import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { ChartModule } from 'angular2-chartjs';

import { AppComponent } from './app/app.component';
import { WindService } from './wind/wind.service';
import { ChartPageComponent, BulkSpeedPageComponent } from './chart-page/chart-page.component';


@NgModule({
  declarations: [
    AppComponent,
    ChartPageComponent,
    BulkSpeedPageComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ChartModule
  ],
  providers: [WindService],
  bootstrap: [AppComponent]
})
export class AppModule { }
