import { MeasureResponseHeartRate } from "client/disband";
import { HeartRateRepository } from "data/repository/disband/impl/HeartRateRepository";
import { SessionStoreFactory } from "infrastructure/data/SessionStoreFactory";
import { action, makeAutoObservable, observable } from "mobx";
import { getDateToSearch } from "utils/utils";


export class HeartRatePlotViewModel {

    heartRateRepository = new HeartRateRepository()

    @observable dayData?: MeasureResponseHeartRate
    @observable weekData?: MeasureResponseHeartRate
    @observable monthData?: MeasureResponseHeartRate
    @observable finishGetHeartRate: boolean = false

    @observable dateInterval = getDateToSearch(new Date())

    constructor() {
        makeAutoObservable(this)
    }

    @action constructorFunctions = async () => {
        const disband = await SessionStoreFactory.getSessionStore().getDisband()
        this.getDataDay(disband!.id!)
        this.getDataWeek(disband!.id!)
        this.getDataMonth(disband!.id!)
    }

    @action getDataDay = async (disbandId: string) => {
        await this.heartRateRepository.getByDateBetweenAndDisbandId(this.dateInterval.minDay, this.dateInterval.maxDay, disbandId).then(items => {
            if (items) {
                this.setDayData(items!)
            }
        })
        this.setFinishGetHeartRate(true)
    }

    @action getDataWeek = async (disbandId: string) => {
        await this.heartRateRepository.getByDateBetweenAndDisbandId(this.dateInterval.minWeek, this.dateInterval.maxWeek, disbandId).then(items => {
            if (items) {
                this.setWeekData(items!)
            }
        })
        this.setFinishGetHeartRate(true)
    }

    @action getDataMonth = async (disbandId: string) => {
        await this.heartRateRepository.getByDateBetweenAndDisbandId(this.dateInterval.minMonth, this.dateInterval.maxMonth, disbandId).then(items => {
            if (items) {
                this.setMonthData(items!)
            }
        })
        this.setFinishGetHeartRate(true)
    }

    @action setFinishGetHeartRate(finish: boolean) {
        this.finishGetHeartRate = finish
    }

    @action setDayData(data: MeasureResponseHeartRate) {
        this.dayData = data
    }

    @action setWeekData(data: MeasureResponseHeartRate) {
        this.weekData = data
    }

    @action setMonthData(data: MeasureResponseHeartRate) {
        this.monthData = data
    }
}