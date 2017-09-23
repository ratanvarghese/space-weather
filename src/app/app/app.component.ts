import { Component, OnInit } from '@angular/core';
import { WindService, WindDatum } from '../wind/wind.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Solar';
  somethingValid = false;
  loading = true;
  rawData: WindDatum[] = [];
  chartData: any;
  options: any = {
    legend: {
      display: false
    }
  }

  constructor(private wind: WindService) {}

  ngOnInit(): void {
    this.wind.getData(x => {
      this.rawData = x.filter(d => d.valid);
      this.somethingValid = this.rawData.length > 0;
      this.chartData = {
        labels: this.rawData.map(d => d.utcTime),
        datasets: [
          {
            label: "Bulk Speed (km/s)",
            data: this.rawData.map(d => d.bulkSpeed)
          }
        ]
      }
      this.loading = false;
    });
  }
}
