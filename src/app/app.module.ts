import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';


import { ChartModule } from 'angular2-chartjs';

import { AppComponent } from './app/app.component';
import { WindService } from './wind/wind.service';
import {
  ChartPageComponent,
  BulkSpeedPageComponent,
  ProtonDensityPageComponent,
  IonTemperaturePageComponent
} from './chart-page/chart-page.component';

const appRoutes: Routes = [
  { path: 'speed', component: BulkSpeedPageComponent },
  { path: 'density', component: ProtonDensityPageComponent },
  { path: 'temp', component: IonTemperaturePageComponent },
  { path: '', redirectTo: '/speed', pathMatch: 'full' },
  { path: '**', redirectTo: '/speed' }
]

@NgModule({
  declarations: [
    AppComponent,
    ChartPageComponent,
    BulkSpeedPageComponent,
    ProtonDensityPageComponent,
    IonTemperaturePageComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ChartModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [WindService],
  bootstrap: [AppComponent]
})
export class AppModule { }
