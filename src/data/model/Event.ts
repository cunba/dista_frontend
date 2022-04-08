import { EventType } from "./EventType"
import { User } from './User';

export class Event {
    id: string
    name: string
    notes: string
    startDate: Date
    endDate: Date
    eventType: EventType
    userId: string

    constructor(id: string, name: string, notes: string, startDate: Date, endDate: Date, eventType: EventType, userId: string) {
        this.id = id
        this.name = name
        this.notes = notes
        this.startDate = startDate
        this.endDate = endDate
        this.eventType = eventType
        this.userId = userId
    }
}

export class EventFlat {
    name: string
    notes: string
    start_date: Date
    end_date: Date
    event_type_id: string
    user_id: string

    constructor(name: string, notes: string, start_date: Date, end_date: Date, event_type_id: string, user_id: string) {
        this.name = name
        this.notes = notes
        this.start_date = start_date
        this.end_date = end_date
        this.event_type_id = event_type_id
        this.user_id = user_id
    }
}