import { MeasureResponseOxygen } from "client/disband";
import { OxygenRepository } from "data/repository/disband/impl/OxygenRepository";
import { SessionStoreFactory } from "infrastructure/data/SessionStoreFactory";
import { action, makeAutoObservable, observable } from "mobx";
import { getDateToSearch } from "utils/utils";


export class OxygenPlotViewModel {

    oxygenRepository = new OxygenRepository()

    @observable dayData?: MeasureResponseOxygen
    @observable weekData?: MeasureResponseOxygen
    @observable monthData?: MeasureResponseOxygen
    @observable finishGetOxygen: boolean = false

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
        await this.oxygenRepository.getByDateBetweenAndDisbandId(this.dateInterval.minDay, this.dateInterval.maxDay, disbandId).then(items => {
            if (items) {
                this.setDayData(items!)
            }
        })
        this.setFinishGetOxygen(true)
    }

    @action getDataWeek = async (disbandId: string) => {
        await this.oxygenRepository.getByDateBetweenAndDisbandId(this.dateInterval.minWeek, this.dateInterval.maxWeek, disbandId).then(items => {
            if (items) {
                this.setWeekData(items!)
            }
        })
        this.setFinishGetOxygen(true)
    }

    @action getDataMonth = async (disbandId: string) => {
        await this.oxygenRepository.getByDateBetweenAndDisbandId(this.dateInterval.minMonth, this.dateInterval.maxMonth, disbandId).then(items => {
            if (items) {
                this.setMonthData(items!)
            }
        })
        this.setFinishGetOxygen(true)
    }

    @action setFinishGetOxygen(finish: boolean) {
        this.finishGetOxygen = finish
    }

    @action setDayData(data: MeasureResponseOxygen) {
        this.dayData = data
    }

    @action setWeekData(data: MeasureResponseOxygen) {
        this.weekData = data
    }

    @action setMonthData(data: MeasureResponseOxygen) {
        this.monthData = data
    }
}