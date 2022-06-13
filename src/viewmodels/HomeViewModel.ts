import { Event } from 'client/disheap/models/Event';
import { EventRepository } from "data/repository/disheap/impl/EventRepository";
import { SessionStoreFactory } from "infrastructure/data/SessionStoreFactory";
import { action, makeAutoObservable, observable } from "mobx";
import { getDateToSearch } from "utils/utils";


export class HomeViewModel {
    eventRepository = new EventRepository()
    @observable todaysEvents: Event[] = []

    constructor() {
        makeAutoObservable(this)
    }

    @action getTodaysEvents = async () => {
        const userId = (await SessionStoreFactory.getSessionStore().getUser())!.id!
        const dateInterval = getDateToSearch(new Date())
        await this.eventRepository.getByStartDateBetweenAndUserId(dateInterval.minDay, dateInterval.maxDay, userId).then(items => {
            console.log(items)
            this.setTodayEvents(items ?? [])
        })
    }

    @action setTodayEvents(events: Event[]) {
        this.todaysEvents = events
    }
}