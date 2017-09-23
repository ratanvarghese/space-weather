export class WindDatum {
    date: Date;
    valid: boolean;
    protonDensity: number; //Unit: p/cc
    bulkSpeed: number; //Unit: km/s
    ionTemperature: number; //Unit: degrees Kelvin

    constructor(line: string) {
        let splitLine = line.split(" ").filter(x => x.length > 0);
        if(splitLine.length < 10) {
            this.valid = false;
            return
        }

        let year = Number(splitLine[0]);
        let month = Number(splitLine[1]) - 1; //In JS, months start from 00, but for the NOAA, months start from 01.
        let day = Number(splitLine[2]);
        let hour = Number(splitLine[3].substring(0, 2));
        let minute = Number(splitLine[3].substring(2, 4));
        this.date = new Date(year, month, day, hour, minute);

        this.protonDensity = Number(splitLine[7]);
        this.bulkSpeed = Number(splitLine[8]);
        this.ionTemperature = Number(splitLine[9]);
       
        let validStatus = (Number(splitLine[6]) == 0);
        let validSpeed = this.bulkSpeed != -9999.9;
        let validProton = this.protonDensity != -9999.9;
        let validIon = this.ionTemperature != -1 * Math.pow(10, 5);
        this.valid = validStatus && validSpeed && validProton && validIon;
    }

    get utcTime(): string {
        let hour = ('00' + this.date.getHours().toString()).slice(-2);
        let minute = ('00' + this.date.getMinutes().toString()).slice(-2);
        return `${hour}:${minute}`
    }
}
