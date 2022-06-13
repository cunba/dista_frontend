import { AmbientNoise, HeartRate, Humidity, Oxygen, Pressure, Temperature } from "client/disband/models"
import { timeFormatter } from "utils/datetimeFormatterHelper"

export class DataToPlot {
    data?: number
    date: Date

    constructor(data: AmbientNoise | HeartRate | Humidity | Oxygen | Pressure | Temperature | undefined) {
        this.data = data!.data!
        this.date = new Date(data!.date!)
    }

    // getDate = (date: number) => {
    //     const dateToCompare = new Date(date)
    //     switch(dateToCompare.getHours()) {
    //         case 0: case 6: case 12: case 18:
    //             if (dateToCompare.getMinutes() === 0) {
    //                 return timeFormatter(dateToCompare.getHours(), 0)
    //             }
    //             break;
    //         default:
    //             return ' '
    //     }
    // }
}