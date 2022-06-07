import { AmbientNoise, HeartRate, Humidity, Oxygen, Pressure, Temperature } from "client/disband"

export class Measure {
    id?: string
    data?: number
    date?: number

    constructor(measure: AmbientNoise | HeartRate | Humidity | Oxygen | Pressure | Temperature | undefined) {
        this.id = measure ? measure.id : undefined
        this.data = measure ? measure.data : undefined
        this.date = measure ? measure.date : undefined
    }
}