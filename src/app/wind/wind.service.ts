import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/share';
import { WindDatum } from './wind-datum';

@Injectable()
export class WindService {
    private windURL: string = "http://services.swpc.noaa.gov/text/ace-swepam.txt";
    private dataEveryMinute: Observable<Observable<WindDatum[]>>;

    constructor(private http: Http) {
        this.dataEveryMinute = IntervalObservable.create(60000)
                                                 .map(() => this.getData())
                                                 .share()
    }

    public getData(): Observable<WindDatum[]> {
        return this.http.get(this.windURL)
                 .map(response => response.text())
                 .map(response => response.split("\n"))
                 .map(response => response.filter(x => !x.startsWith("#") && !x.startsWith(":")))
                 .map(response => response.filter(x => x.length > 0))
                 .map(response => response.map(x => new WindDatum(x)))
    }

    public getDataEveryMinute(handler: (x: WindDatum[]) => void) {
        this.getData().first().subscribe(x => handler(x));
        this.dataEveryMinute.subscribe(ob => ob.first().subscribe(x => handler(x)));
    } 
}
