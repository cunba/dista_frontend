import { COLORS } from 'config/Colors';
import { EventRepository } from 'data/repository/disheap/impl/EventRepository';
import { SessionStoreFactory } from 'infrastructure/data/SessionStoreFactory';
import { action, makeAutoObservable, observable } from 'mobx';
import { dateFormat } from 'utils/datetimeFormatterHelper';
import { Event } from 'client/disheap/models/Event'

export class AgendaViewModel {
    eventRepository = new EventRepository()
    @observable agendaArray: Map<string, DataEvent> = new Map()
    @observable renderMarkedDates: any = []
    @observable markedDatesToAgenda: any = {}
    @observable dateSelected: string = dateFormat(new Date())
    @observable eventPressed?: Event
    @observable dateTo: Date = new Date(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate(), 23, 59, 59, 59)
    @observable dateFrom: Date = new Date().getMonth() + 1 > 2 ?
        new Date(new Date().getFullYear(), new Date().getMonth() - 2, 1, 0, 0, 0, 0)
        :
        new Date(new Date().getFullYear() - 1, new Date().getMonth() - 2, 1, 0, 0, 0, 0)

    constructor() {
        makeAutoObservable(this)
    }

    @action async constructorFunctions() {
        const events: Event[] = await this.getAllEvents()
        this.eventsToAgenda(events)
        this.markedDatesToJson()
    }

    @action setDateFrom = () => {
        if (new Date().getMonth() === 1) {
            this.dateFrom = new Date(new Date().getFullYear() - 1, 11, 1, 0, 0, 0, 0)
        }
        else if (new Date().getMonth() === 0) {
            this.dateFrom = new Date(new Date().getFullYear() - 1, 10, 1, 0, 0, 0, 0)
        }
        else {
            this.dateFrom = new Date(new Date().getFullYear(), new Date().getMonth() - 2, 1, 0, 0, 0, 0)
        }
    }

    @action getAllEvents = async () => {
        const userId = (await SessionStoreFactory.getSessionStore().getUser())!.id
        let events: Event[] = []
        await this.eventRepository.getByStartDateBetweenAndUserId(this.dateFrom.getTime(), this.dateTo.getTime(), userId!).then(list => {
            events = list ?? []
        })

        return events
    }

    orderAsc = (a: Event, b: Event) => {
        if (a.startDate! < b.startDate!) {
            return -1
        } else if (a.startDate! > b.startDate!) {
            return 1
        } else {
            return 0
        }
    }

    @action eventsToAgenda = (events: Event[]) => {
        if (events.length > 0 && events !== null && events !== undefined) {
            events.map((item: Event) => {
                if (this.agendaArray.has(dateFormat(new Date(item.startDate!)))) {
                    this.agendaArray.get(dateFormat(new Date(item.startDate!)))!.events.push(item)
                    this.agendaArray.get(dateFormat(new Date(item.startDate!)))!.events.sort(this.orderAsc)
                } else {
                    this.agendaArray.set(dateFormat(new Date(item.startDate!)), new DataEvent([item], []))
                }
            })
        }
    }

    refreshEvents = async (date: Date) => {
        const from = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0).getTime()
        const to = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 59).getTime()
        const userId = (await SessionStoreFactory.getSessionStore().getUser())!.id
        const events: Event[] = []

        const res = await this.eventRepository.getByStartDateBetweenAndUserId(from, to, userId!)

        if (res!.length > 0) {
            res!.map(async (item: any) => {
                events.push(item)
            })

            if (events.length > 0) {
                events.sort(this.orderAsc)
                this.compareEvents(events)
            }

            this.markedDatesToJson()
        }
    }

    compareEvents = (eventsTemplate: Event[]) => {
        let exists: boolean = false
        let added = false

        eventsTemplate.map((item: Event) => {
            if (this.agendaArray!.size === 0) {
                this.agendaArray.set(dateFormat(new Date(item.startDate!)), new DataEvent([item], []))
                added = true
            } else {
                if (this.agendaArray.has(dateFormat(new Date(item.startDate!)))) {
                    this.agendaArray.get(dateFormat(new Date(item.startDate!)))!.events.map((event: Event) => {
                        if (item.id === event.id) {
                            exists = true
                        }
                    })

                    if (!exists) {
                        this.agendaArray.get(dateFormat(new Date(item.startDate!)))!.events.push(item)
                        added = true
                    }
                } else {
                    this.agendaArray.set(dateFormat(new Date(item.startDate!)), new DataEvent([item], []))
                }

                this.agendaArray.get(dateFormat(new Date(item.startDate!)))!.events.sort(this.orderAsc)
                exists = false
            }
        })
    }

    modifyFromAgendaArray = (eventModified: Event) => {
        this.agendaArray.get(dateFormat(new Date(eventModified.startDate!)))!.events.map((event: Event, key: number) => {
            if (event.id === eventModified.id) {
                this.agendaArray.get(dateFormat(new Date(eventModified.startDate!)))!.events.splice(key, 1, eventModified)
            }
        })
    }

    deleteFromAgendaArray = (id: string, date: string) => {
        this.agendaArray.get(date)!.events.map((event: Event, key: number) => {
            if (event.id === id) {
                this.agendaArray.get(date)!.events.splice(key, 1)

                if (this.agendaArray.get(date)!.events.length === 0) {
                    this.agendaArray.delete(date)
                }
            }
        })
    }

    @action deleteEvent = async (event: any) => {
        await this.eventRepository.delete(event.id)

        this.deleteFromAgendaArray(event.id, dateFormat(event.signDate))
        this.markedDatesToJson()
    }

    @action markedDatesToJson = () => {
        this.renderMarkedDates = []
        this.markedDatesToAgenda = {}
        let existsItems = false

        existsItems = this.agendaArray!.has(this.dateSelected)

        if (this.agendaArray !== undefined && this.agendaArray.size > 0) {
            for (let [key, item] of this.agendaArray!) {
                if (this.dateSelected === key) {
                    this.renderMarkedDates.push({ [key.toString()]: { marked: true, selected: true, selectedColor: COLORS.touchables, selectedTextColor: COLORS.textButtons, dotColor: COLORS.textButtons, disabled: false } })
                }
                else {
                    if (this.dateSelected === dateFormat(new Date())) {
                        this.renderMarkedDates.push({ [key.toString()]: { marked: true, selected: false, dotColor: COLORS.text, disabled: false } })
                    }
                    this.renderMarkedDates.push({ [key.toString()]: { marked: true, selected: false, dotColor: COLORS.text, disabled: false } })
                }
            }
        }

        if (!existsItems) {
            this.renderMarkedDates.push({ [this.dateSelected]: { selected: true, selectedColor: COLORS.button, selectedTextColor: COLORS.textButtons } })
        }

        this.renderMarkedDates.forEach((item: any) => {
            this.markedDatesToAgenda = Object.assign(this.markedDatesToAgenda, item)
        })
    }

    @action setEventPressed(item: Event) {
        this.eventPressed = item
    }
}

export class DataEvent {
    events: Event[]
    dots: Dot[]

    constructor(events: Event[], dots: Dot[]) {
        this.events = events
        this.dots = dots
    }
}

export class Dot {
    key: string
    color: string

    constructor(key: string, color?: string) {
        this.key = key
        this.color = color !== undefined ? color : 'black'
    }
}