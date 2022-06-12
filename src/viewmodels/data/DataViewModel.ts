import { AmbientNoise, HeartRate, Humidity, Lightning, MeasureDTO, Oxygen, Pressure, Temperature } from "client/disband";
import { LightningToPie, LightningToShow } from "data/model/LightningToShow";
import { Measure } from "data/model/Measure";
import { AmbientNoiseRepository } from "data/repository/disband/impl/AmbientNoiseRepository";
import { HeartRateRepository } from "data/repository/disband/impl/HeartRateRepository";
import { HumidityRepository } from "data/repository/disband/impl/HumidityRepository";
import { LightningRepository } from "data/repository/disband/impl/LightningRepository";
import { OxygenRepository } from "data/repository/disband/impl/OxygenRepository";
import { PressureRepository } from "data/repository/disband/impl/PressureRepository";
import { TemperatureRepository } from "data/repository/disband/impl/TemperatureRepository";
import { SessionStoreFactory } from "infrastructure/data/SessionStoreFactory";
import { action, makeAutoObservable, observable } from "mobx";
import { getDateToSearch } from "utils/utils";


export class DataViewModel {

    // Repositories
    heartRateRepository = new HeartRateRepository()
    humidityRepository = new HumidityRepository()
    lightningRepository = new LightningRepository()
    oxygenRepository = new OxygenRepository()
    pressureRepository = new PressureRepository()
    temperatureRepository = new TemperatureRepository()

    // Variables
    @observable lastHeartRate: Measure | undefined
    @observable lastHumidity: Measure | undefined
    @observable lastLightning: LightningToShow | undefined
    @observable lastOxygen: Measure | undefined
    @observable lastPressure: Measure | undefined
    @observable lastTemperature: Measure | undefined

    // Dates to get mesures
    // minDate: number = new Date().getTime()
    @observable dateInterval = getDateToSearch(new Date())

    constructor() {
        makeAutoObservable(this)
    }

    @action constructorFunctions = async () => {
        await this.getLastMesures()
    }

    @action getLastMesures = async () => {
        const disband = await SessionStoreFactory.getSessionStore().getDisband()
        this.temperatureRepository.getLast1ByDateBetweenAndDisbandId(this.dateInterval.minWeek, this.dateInterval.maxDay, disband!.id!).then(item => {
            this.setLastTemperature(new Measure(item))
        })
        this.humidityRepository.getLast1ByDateBetweenAndDisbandId(this.dateInterval.minWeek, this.dateInterval.maxDay, disband!.id!).then(item => {
            this.setLastHumidity(new Measure(item))
        })
        this.pressureRepository.getLast1ByDateBetweenAndDisbandId(this.dateInterval.minWeek, this.dateInterval.maxDay, disband!.id!).then(item => {
            this.setLastPressure(new Measure(item))
        })
        this.heartRateRepository.getLast1ByDateBetweenAndDisbandId(this.dateInterval.minWeek, this.dateInterval.maxDay, disband!.id!).then(item => {
            this.setLastHeartRate(new Measure(item))
        })
        this.oxygenRepository.getLast1ByDateBetweenAndDisbandId(this.dateInterval.minWeek, this.dateInterval.maxDay, disband!.id!).then(item => {
            this.setLastOxygen(new Measure(item))
        })
        this.lightningRepository.getLast1ByDateBetweenAndDisbandId(this.dateInterval.minWeek, this.dateInterval.maxDay, disband!.id!).then(item => {
            this.setLastLightning(item)
        })
    }

    @action setLastHeartRate(heartRate: Measure | undefined) {
        this.lastHeartRate = heartRate
    }

    @action setLastHumidity(humidity: Measure | undefined) {
        this.lastHumidity = humidity
    }

    @action setLastLightning(lightning: Lightning | undefined) {
        this.lastLightning = lightning ? new LightningToShow(lightning, false) : undefined
    }

    @action setLastOxygen(oxygen: Measure | undefined) {
        this.lastOxygen = oxygen
    }

    @action setLastPressure(pressure: Measure | undefined) {
        this.lastPressure = pressure
    }

    @action setLastTemperature(temperature: Measure | undefined) {
        this.lastTemperature = temperature
    }
}