import { Component, OnInit } from '@angular/core';
import { WindService, WindDatum } from '../wind/wind.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Solar';
  data: WindDatum[] = [];

  constructor(private wind: WindService) {}

  ngOnInit(): void {
    this.wind.getData(x => this.data = x);
  }
}
