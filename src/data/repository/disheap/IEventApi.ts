import { EventDTO, HandledResponse } from "client/disheap"
import { Event } from "client/disheap/models/Event"

export default interface IEventApi {

    getEventsByStartDateBetweenAndUserId(minDate: number, maxDate: number, userId: string): Promise<Event[]>

    getEventById(id: string): Promise<Event>

    saveEvent(eventDTO: EventDTO): Promise<Event>

    updateEvent(id: string, eventDTO: EventDTO): Promise<HandledResponse>

    deleteEvent(id: string): Promise<Event>

    deleteEventsByUserId(userId: string): Promise<Event[]>

}