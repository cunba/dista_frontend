import { Temperature } from "client/disband/models/Temperature";
import { DataToPlot } from "data/model/DataToPlot";
import { Measure } from "data/model/Measure";
import { HumidityRepository } from "data/repository/disband/impl/HumidityRepository";
import { PressureRepository } from "data/repository/disband/impl/PressureRepository";
import { TemperatureRepository } from "data/repository/disband/impl/TemperatureRepository";
import { SessionStoreFactory } from "infrastructure/data/SessionStoreFactory";
import { action, makeAutoObservable, observable } from "mobx";


export class AmbientDataViewModel {

    temperatureRepository = new TemperatureRepository()
    humidityRepository = new HumidityRepository()
    pressureRepository = new PressureRepository()

    minTodayDate: number = new Date().setHours(23, 59, 59, 59).valueOf() - 8640000
    minWeekDate: number = new Date().setHours(23, 59, 59, 59).valueOf() - 8640000
    maxDate: number = new Date().setHours(23, 59, 59, 59).valueOf()

    @observable weekDataTemperature?: Measure[]
    @observable dayDataTemperature?: DataToPlot[] = []
    @observable finishGetTemperature: boolean = false
    @observable minTemperature?: number
    @observable maxTemperature?: number

    constructor() {
        makeAutoObservable(this)
        // this.constructorFunctions()
    }

    @action constructorFunctions = async () => {
        const disband = await SessionStoreFactory.getSessionStore().getDisband()
        this.getTemperatureData(disband!.id!)
    }

    @action getTemperatureData = async (disbandId: string) => {
        await this.temperatureRepository.getByDateBetweenAndDisbandId(1653868800000, 1653955199000, disbandId).then(items => {
            let minTemp = items![0].data ?? undefined
            let maxTemp = items![0].data ?? undefined
            const dayData: DataToPlot[] = []

            items?.map(item => {
                if (item.data! > maxTemp!) {
                    maxTemp = item.data!
                }
                if (item.data! < minTemp!) {
                    minTemp = item.data!
                }
                dayData.push(new DataToPlot(item))
            })

            this.setDayDataTemperature(dayData)
            this.setMinTemperature(minTemp)
            this.setMaxTemperature(maxTemp)
            console.log(dayData)
        })
        this.setFinishGetTemperature(true)
    }

    @action setFinishGetTemperature(finish: boolean) {
        this.finishGetTemperature = finish
    }

    @action setMinTemperature(temperature: number | undefined) {
        this.minTemperature = temperature
    }

    @action setMaxTemperature(temperature: number | undefined) {
        this.maxTemperature = temperature
    }

    @action setDayDataTemperature(data: DataToPlot[]) {
        this.dayDataTemperature = data
    }
}