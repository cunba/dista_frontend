import { LightningToShow } from "data/model/LightningToShow";
import { LightningRepository } from "data/repository/disband/impl/LightningRepository";
import { SessionStoreFactory } from "infrastructure/data/SessionStoreFactory";
import { action, makeAutoObservable, observable } from "mobx";
import { getDateToSearch } from "utils/utils";


export class LightningPlotViewModel {

    lightningRepository = new LightningRepository()

    @observable dayData?: LightningToShow[]
    @observable weekData?: LightningToShow[]
    @observable monthData?: LightningToShow[]
    @observable finishGetLightning: boolean = false

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
        await this.lightningRepository.getByDateBetweenAndDisbandId(this.dateInterval.minDay, this.dateInterval.maxDay, disbandId).then(items => {
            if (items) {
                const data: LightningToShow[] = []
                items.map(item => {
                    data.push(new LightningToShow(item, true))
                })
                this.setDayData(data)
            }
        })
        this.setFinishGetLightning(true)
    }

    @action getDataWeek = async (disbandId: string) => {
        await this.lightningRepository.getByDateBetweenAndDisbandId(this.dateInterval.minWeek, this.dateInterval.maxWeek, disbandId).then(items => {
            if (items) {
                const data: LightningToShow[] = []
                items.map(item => {
                    data.push(new LightningToShow(item, true))
                })
                this.setWeekData(data)
            }
        })
        this.setFinishGetLightning(true)
    }

    @action getDataMonth = async (disbandId: string) => {
        await this.lightningRepository.getByDateBetweenAndDisbandId(this.dateInterval.minMonth, this.dateInterval.maxMonth, disbandId).then(items => {
            if (items) {
                const data: LightningToShow[] = []
                items.map(item => {
                    data.push(new LightningToShow(item, true))
                })
                this.setMonthData(data)
            }
        })
        this.setFinishGetLightning(true)
    }

    @action setFinishGetLightning(finish: boolean) {
        this.finishGetLightning = finish
    }

    @action setDayData(data: LightningToShow[]) {
        this.dayData = data
    }

    @action setWeekData(data: LightningToShow[]) {
        this.weekData = data
    }

    @action setMonthData(data: LightningToShow[]) {
        this.monthData = data
    }
}