export default class Time {
    private _totalSeconds: number;

    readonly _secondsInDay: number = 86400;
    readonly _secondsInMinute: number = 60;
    readonly _secondsInHour: number = 3600;

    constructor(totalSeconds: number) {
        if (totalSeconds >= 0) {
            this._totalSeconds = totalSeconds % this._secondsInDay;
        }
        else {
            this._totalSeconds = this._secondsInDay + (totalSeconds % this._secondsInDay);
        }
    }

    public getHours(): number {
        return Math.floor(this._totalSeconds / 3600);
    }

    public getMinutes(): number {
        return Math.floor((this._totalSeconds % 3600) / 60);
    }

    public getSeconds() {
        return Math.floor(this._totalSeconds % 60);
    }

    public getTotalSeconds(): number {
        return this._totalSeconds;
    }

    public isBeginOfDay(): boolean {
        return this._totalSeconds == 0;
    }

    public isEndOfDay(): boolean {
        return this._totalSeconds == (this._secondsInDay - 1);
    }
}

export const hoursInDay: number = 24;
export const minutesInHour: number = 60;
export const secondsInMinute: number = 60;
export const secondsInHour: number = 3600;

export function getTimeString(totalSeconds: number): string {
    const value = new Time(totalSeconds);

    const hoursString = value.getHours() > 9 ? value.getHours().toString() : '0' + value.getHours().toString();
    const minutesString = value.getMinutes() > 9 ? value.getMinutes().toString() : '0' + value.getMinutes().toString();

    return hoursString + ':' + minutesString;
}

export function getTime(seconds: number | null): Time | null {
    if (seconds == null) return null;

    return new Time(seconds);
}

export function getTotalSeconds(time: Time | null, defaultValue: number = 0): number {
    return time?.getTotalSeconds() ?? defaultValue;
}

export const mapToTime = (data: any): Time => new Time(data.totalSeconds);