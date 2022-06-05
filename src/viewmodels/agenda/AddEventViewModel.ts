import { action, makeAutoObservable } from "mobx"


export class AddEventViewModel {
    // Add event
    name: string | undefined = undefined
    notes: string | undefined = undefined
    startDate: Date = new Date()
    endDate: Date = new Date()
    eventTypeId: string | undefined = undefined

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
    @action setEventTypeId(eventTypeId: string) {
        this.eventTypeId = eventTypeId
    }
}