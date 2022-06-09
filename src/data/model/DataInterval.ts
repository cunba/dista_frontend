
export class DataInterval {
    minValue: number
    maxValue: number
    date: Date

    constructor (minValue: number, maxValue: number, date: number) {
        this.minValue = minValue
        this.maxValue = maxValue
        this.date = new Date(date)
    }
}