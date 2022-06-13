import { EventDTO } from "client/disheap/models/EventDTO"
import { EventRepository } from "data/repository/disheap/impl/EventRepository"
import { SessionStoreFactory } from "infrastructure/data/SessionStoreFactory"
import { action, makeAutoObservable, observable } from "mobx"


export class AddEventViewModel {
    eventRepository = new EventRepository()

    // Add event
    @observable name: string | undefined = undefined
    @observable notes: string | undefined = undefined
    @observable startDate: Date = new Date()
    @observable endDate: Date = new Date()

    constructor() {
        makeAutoObservable(this)
    }

    @action setName(name: string) {
        this.name = name
    }
    @action setNotes(notes: string) {
        this.notes = notes
    }
    @action setStartDate(startDate: Date) {
        this.startDate = startDate
    }
    @action setEndDate(endDate: Date) {
        this.endDate = endDate
    }

    @action saveEvent = async () => {
        const user = await SessionStoreFactory.getSessionStore().getUser()
        const eventDTO: EventDTO = {
            endDate: this.endDate.getTime(),
            name: this.name,
            notes: this.notes,
            startDate: this.startDate.getTime(),
            type: ' ',
            userId: user!.id!
        }
        console.log(eventDTO)
        await this.eventRepository.save(eventDTO)

        this.setName('')
        this.setNotes('')
    }
}