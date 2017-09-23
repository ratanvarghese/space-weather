import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { WindDatum } from './wind-datum';

@Injectable()
export class WindService {
    private windURL: string = "http://services.swpc.noaa.gov/text/ace-swepam.txt";
    public response: any;

    constructor(private http: Http) {}

    public getData(handler?: (x: WindDatum[]) => void): void {
        if(!handler)
            handler = (x: WindDatum[]) => console.dir(x);

        this.http.get(this.windURL)
                 .map(response => response.text())
                 .map(response => response.split("\n"))
                 .map(response => response.filter(x => !x.startsWith("#") && !x.startsWith(":")))
                 .map(response => response.filter(x => x.length > 0))
                 .map(response => response.map(x => new WindDatum(x)))
                 .subscribe(response => handler(response));
    }
}
