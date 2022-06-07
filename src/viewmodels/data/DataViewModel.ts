import { AmbientNoise, HeartRate, Humidity, Lightning, MeasureDTO, Oxygen, Pressure, Temperature } from "client/disband";
import { Measure } from "data/model/disband/Measure";
import { AmbientNoiseRepository } from "data/repository/disband/impl/AmbientNoiseRepository";
import { HeartRateRepository } from "data/repository/disband/impl/HeartRateRepository";
import { HumidityRepository } from "data/repository/disband/impl/HumidityRepository";
import { LightningRepository } from "data/repository/disband/impl/LightningRepository";
import { OxygenRepository } from "data/repository/disband/impl/OxygenRepository";
import { PressureRepository } from "data/repository/disband/impl/PressureRepository";
import { TemperatureRepository } from "data/repository/disband/impl/TemperatureRepository";
import { SessionStoreFactory } from "infrastructure/data/SessionStoreFactory";
import { action, makeAutoObservable } from "mobx";


export class DataViewModel {

    // Repositories
    ambientNoiseRepository = new AmbientNoiseRepository()
    heartRateRepository = new HeartRateRepository()
    humidityRepository = new HumidityRepository()
    lightningRepository = new LightningRepository()
    oxygenRepository = new OxygenRepository()
    pressureRepository = new PressureRepository()
    temperatureRepository = new TemperatureRepository()

    // Variables
    lastAmbientNoise: Measure | undefined
    lastHeartRate: Measure | undefined
    lastHumidity: Measure | undefined
    lastLightning: Measure | undefined
    lastOxygen: Measure | undefined
    lastPressure: Measure | undefined
    lastTemperature: Measure | undefined

    // Dates to get mesures
    // minDate: number = new Date().getTime()
    minDate: number = 1654300800000
    maxDate: number = new Date().getTime()

    constructor() {
        makeAutoObservable(this)
    }

    @action constructorFunctions = async () => {
        await this.getLastMesures()
    }

    @action getLastMesures = async () => {
        const disband = await SessionStoreFactory.getSessionStore().getDisband()
        await this.ambientNoiseRepository.getLast1ByDateBetweenAndDisbandId(this.minDate, this.maxDate, disband!.id!).then(item => {
            this.setLastAmbientNoise(new Measure(item))
        })
        console.log('ambient noise last measure')
        console.log(this.lastAmbientNoise)
        console.log(' ')

        await this.heartRateRepository.getLast1ByDateBetweenAndDisbandId(this.minDate, this.maxDate, disband!.id!).then(item => {
            this.setLastHeartRate(new Measure(item))
        })
        console.log('heart rate last measure')
        console.log(this.lastHeartRate)
        console.log(' ')

        await this.humidityRepository.getLast1ByDateBetweenAndDisbandId(this.minDate, this.maxDate, disband!.id!).then(item => {
            this.setLastHumidity(new Measure(item))
        })
        console.log('humidity last measure')
        console.log(this.lastHumidity)
        console.log(' ')

        await this.lightningRepository.getLast1ByDateBetweenAndDisbandId(this.minDate, this.maxDate, disband!.id!).then(item => {
            this.setLastLightning(new Measure(item))
        })
        console.log('lightning last measure')
        console.log(this.lastLightning)
        console.log(' ')

        await this.oxygenRepository.getLast1ByDateBetweenAndDisbandId(this.minDate, this.maxDate, disband!.id!).then(item => {
            this.setLastOxygen(new Measure(item))
        })
        console.log('Oxygen last measure')
        console.log(this.lastOxygen)
        console.log(' ')

        await this.pressureRepository.getLast1ByDateBetweenAndDisbandId(this.minDate, this.maxDate, disband!.id!).then(item => {
            this.setLastPressure(new Measure(item))
        })
        console.log('pressure last measure')
        console.log(this.lastPressure)
        console.log(' ')
        
        await this.temperatureRepository.getLast1ByDateBetweenAndDisbandId(this.minDate, this.maxDate, disband!.id!).then(item => {
            this.setLastTemperature(new Measure(item))
        })
        console.log('temperature last measure')
        console.log(this.lastTemperature)
        console.log(' ')     
    }

    @action setLastAmbientNoise(ambientNoise: Measure | undefined) {
        this.lastAmbientNoise = ambientNoise
    }

    @action setLastHeartRate(heartRate: Measure | undefined) {
        this.lastHeartRate = heartRate
    }

    @action setLastHumidity(humidity: Measure | undefined) {
        this.lastHumidity = humidity
    }

    @action setLastLightning(lightning: Measure | undefined) {
        this.lastLightning = lightning
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