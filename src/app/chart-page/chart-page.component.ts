import { Component, OnInit, OnDestroy } from '@angular/core';
import { WindService } from '../wind/wind.service';
import { WindDatum } from '../wind/wind-datum';

@Component({
  selector: 'chart-page',
  templateUrl: './chart-page.component.html'
})
export class ChartPageComponent implements OnInit, OnDestroy {
  chartData: any;
  field: string;
  label: string;
  loading = true;
  somethingValid = false;
  options: any;

  alive = true;
  
  constructor(private wind: WindService) {}

  ngOnInit(): void {
    this.setOptions();

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
    }, () => this.alive);
  }

  ngOnDestroy(): void {
    this.alive = false;
  }

  setOptions(): void {
    this.options = {
      legend: { display: false },
      title: {
        display: true,
        text: `${this.label} over time`
      },
      scales: {
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: this.label
          }
        }],
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: "UTC Time (hh:mm)"
          }
        }]
      }
    }
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
