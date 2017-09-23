import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

export class WindDatum {
    date: Date;
    valid: boolean;
    protonDensity: number; //Unit: p/cc
    bulkSpeed: number; //Unit: km/s
    ionTemperature: number; //Unit: degrees Kelvin

    constructor(line: string) {
        let splitLine = line.split(" ").filter(x => x.length > 0);
        if(splitLine.length < 10) {
            console.warn(`Invalid datum line: '${line}'`)
            return
        }

        let year = Number(splitLine[0]);
        let month = Number(splitLine[1]) - 1; //In JS, months start from 00, but for the NOAA, months start from 01.
        let day = Number(splitLine[2]);
        let hour = Number(splitLine[3].substring(0, 2));
        let minute = Number(splitLine[3].substring(2, 4));
        this.date = new Date(year, month, day, hour, minute);

        this.valid = (Number(splitLine[6]) == 0);

        this.protonDensity = Number(splitLine[7]);
        this.bulkSpeed = Number(splitLine[8]);
        this.ionTemperature = Number(splitLine[9]);
    }
}

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
