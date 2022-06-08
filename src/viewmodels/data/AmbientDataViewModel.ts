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

    @observable weekDataTemperature?: Measure[]
    @observable dayDataTemperature?: DataToPlot[] = []
    @observable finishGetTemperature: boolean = false

    minTodayDate: number = new Date().setHours(23, 59, 59, 59).valueOf() - 8640000
    minWeekDate: number = new Date().setHours(23, 59, 59, 59).valueOf() - 8640000
    maxDate: number = new Date().setHours(23, 59, 59, 59).valueOf()

    constructor() {
        makeAutoObservable(this)
        // this.constructorFunctions()
    }

    @action constructorFunctions = async () => {
        const disband = await SessionStoreFactory.getSessionStore().getDisband()
        await this.getTemperatureData(disband!.id!)
    }

    @action getTemperatureData = async (disbandId: string) => {
        await this.temperatureRepository.getByDateBetweenAndDisbandId(1653868800000, 1653955199000, disbandId).then(items => {
            items?.map(item => {
                this.dayDataTemperature?.push(new DataToPlot(item))
            })
        })
        this.finishGetTemperature = true
        console.log(this.dayDataTemperature)
    }

    // @action setDayDataTemperature(data: Temperature[]) {
    //     this.dayDataTemperature = data
    // }
}