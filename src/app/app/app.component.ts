import { Component, OnInit } from '@angular/core';
import { WindService, WindDatum } from '../wind/wind.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Solar';
  rawData: WindDatum[] = [];
  chartData: any;

  constructor(private wind: WindService) {}

  ngOnInit(): void {
    this.wind.getData(x => {
      this.rawData = x;
      this.chartData = {
        labels: this.rawData.map(d => `${d.date.getHours()}:${d.date.getMinutes()}`),
        datasets: [
          {
            label: "My first dataset",
            data: this.rawData.map(d => d.bulkSpeed)
          }
        ]
      }
    });
  }
}
