import { MeasureResponseHumidity, MeasureResponsePressure, MeasureResponseTemperature } from "client/disband";
import { HumidityRepository } from "data/repository/disband/impl/HumidityRepository";
import { PressureRepository } from "data/repository/disband/impl/PressureRepository";
import { TemperatureRepository } from "data/repository/disband/impl/TemperatureRepository";
import { SessionStoreFactory } from "infrastructure/data/SessionStoreFactory";
import { action, makeAutoObservable, observable } from "mobx";
import { getDateToSearch } from "utils/utils";


export class AmbientDataPlotViewModel {

    temperatureRepository = new TemperatureRepository()
    humidityRepository = new HumidityRepository()
    pressureRepository = new PressureRepository()

    @observable dayDataTemperature?: MeasureResponseTemperature
    @observable weekDataTemperature?: MeasureResponseTemperature
    @observable monthDataTemperature?: MeasureResponseTemperature
    @observable finishGetTemperature: boolean = false

    @observable dayDataPressure?: MeasureResponsePressure
    @observable weekDataPressure?: MeasureResponsePressure
    @observable monthDataPressure?: MeasureResponsePressure
    @observable finishGetPressure: boolean = false

    @observable dayDataHumidity?: MeasureResponseHumidity
    @observable weekDataHumidity?: MeasureResponseHumidity
    @observable monthDataHumidity?: MeasureResponseHumidity
    @observable finishGetHumidity: boolean = false

    @observable dateInterval = getDateToSearch(new Date())

    constructor() {
        makeAutoObservable(this)
    }

    @action constructorFunctions = async () => {
        const disband = await SessionStoreFactory.getSessionStore().getDisband()
        this.getTemperatureDataDay(disband!.id!)
        this.getTemperatureDataWeek(disband!.id!)
        this.getTemperatureDataMonth(disband!.id!)

        this.getPressureDataDay(disband!.id!)
        this.getPressureDataWeek(disband!.id!)
        this.getPressureDataMonth(disband!.id!)

        this.getHumidityDataDay(disband!.id!)
        this.getHumidityDataWeek(disband!.id!)
        this.getHumidityDataMonth(disband!.id!)
    }

    // Temperature

    @action getTemperatureDataDay = async (disbandId: string) => {
        await this.temperatureRepository.getByDateBetweenAndDisbandId(this.dateInterval.minDay, this.dateInterval.maxDay, disbandId).then(items => {
            if (items) {
                this.setDayDataTemperature(items!)
            }
        })
        this.setFinishGetTemperature(true)
    }

    @action getTemperatureDataWeek = async (disbandId: string) => {
        await this.temperatureRepository.getByDateBetweenAndDisbandId(this.dateInterval.minWeek, this.dateInterval.maxWeek, disbandId).then(items => {
            if (items) {
                this.setWeekDataTemperature(items!)
            }
        })
        this.setFinishGetTemperature(true)
    }

    @action getTemperatureDataMonth = async (disbandId: string) => {
        await this.temperatureRepository.getByDateBetweenAndDisbandId(this.dateInterval.minMonth, this.dateInterval.maxMonth, disbandId).then(items => {
            if (items) {
                this.setMonthDataTemperature(items!)
            }
        })
        this.setFinishGetTemperature(true)
    }

    @action setFinishGetTemperature(finish: boolean) {
        this.finishGetTemperature = finish
    }

    @action setDayDataTemperature(data: MeasureResponseTemperature) {
        this.dayDataTemperature = data
    }

    @action setWeekDataTemperature(data: MeasureResponseTemperature) {
        this.weekDataTemperature = data
    }

    @action setMonthDataTemperature(data: MeasureResponseTemperature) {
        this.monthDataTemperature = data
    }

    // Humidity

    @action getHumidityDataDay = async (disbandId: string) => {
        await this.humidityRepository.getByDateBetweenAndDisbandId(this.dateInterval.minDay, this.dateInterval.maxDay, disbandId).then(items => {
            if (items) {
                this.setDayDataHumidity(items!)
            }
        })
        this.setFinishGetHumidity(true)
    }

    @action getHumidityDataWeek = async (disbandId: string) => {
        await this.humidityRepository.getByDateBetweenAndDisbandId(this.dateInterval.minWeek, this.dateInterval.maxWeek, disbandId).then(items => {
            if (items) {
                this.setWeekDataHumidity(items!)
            }
        })
        this.setFinishGetHumidity(true)
    }

    @action getHumidityDataMonth = async (disbandId: string) => {
        await this.humidityRepository.getByDateBetweenAndDisbandId(this.dateInterval.minMonth, this.dateInterval.maxMonth, disbandId).then(items => {
            if (items) {
                this.setMonthDataHumidity(items!)
            }
        })
        this.setFinishGetHumidity(true)
    }

    @action setFinishGetHumidity(finish: boolean) {
        this.finishGetHumidity = finish
    }

    @action setDayDataHumidity(data: MeasureResponseHumidity) {
        this.dayDataHumidity = data
    }

    @action setWeekDataHumidity(data: MeasureResponseHumidity) {
        this.weekDataHumidity = data
    }

    @action setMonthDataHumidity(data: MeasureResponseHumidity) {
        this.monthDataHumidity = data
    }

    // Pressure

    @action getPressureDataDay = async (disbandId: string) => {
        await this.pressureRepository.getByDateBetweenAndDisbandId(this.dateInterval.minDay, this.dateInterval.maxDay, disbandId).then(items => {
            if (items) {
                this.setDayDataPressure(items!)
            }
        })
        this.setFinishGetPressure(true)
    }

    @action getPressureDataWeek = async (disbandId: string) => {
        await this.pressureRepository.getByDateBetweenAndDisbandId(this.dateInterval.minWeek, this.dateInterval.maxWeek, disbandId).then(items => {
            if (items) {
                this.setWeekDataPressure(items!)
            }
        })
        this.setFinishGetPressure(true)
    }

    @action getPressureDataMonth = async (disbandId: string) => {
        await this.pressureRepository.getByDateBetweenAndDisbandId(this.dateInterval.minMonth, this.dateInterval.maxMonth, disbandId).then(items => {
            if (items) {
                this.setMonthDataPressure(items!)
            }
        })
        this.setFinishGetPressure(true)
    }

    @action setFinishGetPressure(finish: boolean) {
        this.finishGetPressure = finish
    }

    @action setDayDataPressure(data: MeasureResponsePressure) {
        this.dayDataPressure = data
    }

    @action setWeekDataPressure(data: MeasureResponsePressure) {
        this.weekDataPressure = data
    }

    @action setMonthDataPressure(data: MeasureResponsePressure) {
        this.monthDataPressure = data
    }
}