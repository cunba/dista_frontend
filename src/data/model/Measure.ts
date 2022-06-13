import { AmbientNoise, HeartRate, Humidity, Oxygen, Pressure, Temperature } from "client/disband"

export class Measure {
    data?: number
    date?: number

    constructor(measure: AmbientNoise | HeartRate | Humidity | Oxygen | Pressure | Temperature | undefined) {
        this.data = measure ? measure.data : undefined
        this.date = measure ? measure.date : undefined
    }
}