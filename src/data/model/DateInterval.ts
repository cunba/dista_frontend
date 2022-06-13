
export class DateInterval {
    minDay: number
    maxDay: number
    minWeek: number
    maxWeek: number
    minMonth: number
    maxMonth: number

    constructor(
        minDay: number,
        maxDay: number,
        minWeek: number,
        maxWeek: number,
        minMonth: number,
        maxMonth: number
    ) {
        this.minDay = minDay
        this.maxDay = maxDay
        this.minWeek = minWeek
        this.maxWeek = maxWeek
        this.minMonth = minMonth
        this.maxMonth = maxMonth
    }
}