import { Component, OnInit } from '@angular/core';
import { WindService } from '../wind/wind.service';
import { WindDatum } from '../wind/wind-datum';

@Component({
  selector: 'chart-page',
  templateUrl: './chart-page.component.html'
})
export class ChartPageComponent implements OnInit {
  chartData: any;
  field: string;
  label: string;
  loading = true;
  somethingValid = false;
  options: any = {
    legend: {
      display: false
    }
  }

  constructor(private wind: WindService) {}

  ngOnInit(): void {
    this.wind.getDataEveryMinute(x => {
      let rawData = x.filter(d => d.valid);
      this.somethingValid = rawData.length > 0;
      this.chartData = {
        labels: rawData.map(d => d.utcTime),
        datasets: [
          {
            label: this.label,
            data: rawData.map(d => d[this.field])
          }
        ]
      }
      this.loading = false;
    });
  }
}

@Component({
  selector: 'bulk-speed-page',
  templateUrl: './chart-page.component.html'
})
export class BulkSpeedPageComponent extends ChartPageComponent {
  field = "bulkSpeed";
  label = "Bulk Speed (km/s)";
}

@Component({
  selector: 'proton-density-page',
  templateUrl: './chart-page.component.html'
})
export class ProtonDensityPageComponent extends ChartPageComponent {
  field = "protonDensity";
  label = "Proton Density (p/cc)";
}

@Component({
  selector: 'ion-temperature-page',
  templateUrl: './chart-page.component.html'
})
export class IonTemperaturePageComponent extends ChartPageComponent {
  field = "ionTemperature";
  label = "Ion Temperature (Kelvin)";
}
