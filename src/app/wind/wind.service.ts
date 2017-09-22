import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class WindService {
    private windURL: string = "http://services.swpc.noaa.gov/text/ace-swepam.txt";
    public response: any;

    constructor(private http: Http) {}

    getData() {
        this.http.get(this.windURL)
                 .map(response => response.text())
                 .map(response => response.split("\n"))
                 .map(response => response.filter(x => !x.startsWith("#") && !x.startsWith(":")))
                 .subscribe(response => console.dir(response));
    }
}
