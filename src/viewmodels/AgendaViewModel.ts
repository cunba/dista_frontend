import { UserApi } from 'client/UserApi';
import { COLORS } from 'config/Colors';
import { Event } from 'data/model/Event';
import { action, makeAutoObservable, observable } from 'mobx';
import { dateFormat } from 'utils/datetimeFormatterHelper';
import { EventApi } from '../client/EventApi';
import { EventTypeApi } from '../client/EventTypeApi';
import { EventType } from '../data/model/EventType';

export class AgendaViewModel {
    @observable agendaArray: Map<string, DataEvent> = new Map()
    @observable eventTypes: Map<string, EventType> = new Map()
    @observable renderMarkedDates: any = []
    @observable markedDatesToAgenda: any = {}
    @observable dateSelected: string = dateFormat(new Date())
    @observable eventPressed?: Event
    @observable dateTo: Date = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 23, 59, 59, 59)
    @observable dateFrom: Date = new Date().getMonth() + 1 > 2 ?
        new Date(new Date().getFullYear(), new Date().getMonth() - 2, 1, 0, 0, 0, 0)
        :
        new Date(new Date().getFullYear() - 1, new Date().getMonth() - 2, 1, 0, 0, 0, 0)

    // Add event
    @observable name: string | undefined = undefined
    @observable notes: string | undefined = undefined
    @observable startDate: Date = new Date()
    @observable endDate: Date = new Date()
    @observable eventTypeId: string | undefined = undefined

    constructor() {
        makeAutoObservable(this)
    }

    @action async constructorFunctions() {
        await this.getAllEventsType()
        const events = await this.getAllEvents()
        this.eventsToAgenda(events)
        this.markedDatesToJson()
    }

    @action getAllEventsType = async () => {
        const res = await new EventTypeApi().getAll()

        if (res !== false && res.length > 0) {
            res.map((item: any) => {
                this.eventTypes.set(item.id, new EventType(item.id, item.type, item.color))
            })
        }
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
        const userId = (await new UserApi().getUser()).id
        const res = await new EventApi().getByStartDateAndEndDateAndUser(this.dateFrom, this.dateTo, userId!)
        const events: Event[] = []

        if (res !== false) {
            res.map(async (item: any) => {
                const eventType = this.eventTypes.get(item.event_type_id)
                events.push(new Event(item.id, item.name, item.notes, new Date(item.start_date), new Date(item.end_date), eventType!, item.user_id))
            })
        }

        if (events.length > 0) {
            events.sort(this.orderAsc)
        }

        return events
    }

    orderAsc = (a: Event, b: Event) => {
        if (a.startDate.getTime() < b.startDate.getTime()) {
            return -1
        } else if (a.startDate.getTime() > b.startDate.getTime()) {
            return 1
        } else {
            return 0
        }
    }

    @action eventsToAgenda = (events: Event[]) => {
        if (events.length > 0 && events !== null && events !== undefined) {
            events.map((item: Event) => {
                if (this.agendaArray.has(dateFormat(item.startDate))) {
                    this.agendaArray.get(dateFormat(item.startDate))!.events.push(item)
                    this.agendaArray.get(dateFormat(item.startDate))!.events.sort(this.orderAsc)
                } else {
                    this.agendaArray.set(dateFormat(item.startDate), new DataEvent([item], []))
                }
            })
        }
    }

    refreshEvents = async (date: Date) => {
        const from = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0)
        const to = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 59)
        const userId = (await new UserApi().getUser()).id
        const events: Event[] = []

        const res = await new EventApi().getByStartDateAndEndDateAndUser(from, to, userId)

        if (res !== false && res.length > 0) {
            res.map(async (item: any) => {
                const eventType = this.eventTypes.get(item.event_type_id)
                events.push(new Event(item.id, item.name, item.notes, new Date(item.start_date), new Date(item.end_date), eventType!, item.user_id))
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
                this.agendaArray.set(dateFormat(item.startDate), new DataEvent([item], []))
                added = true
            } else {
                if (this.agendaArray.has(dateFormat(item.startDate))) {
                    this.agendaArray.get(dateFormat(item.startDate))!.events.map((event: Event) => {
                        if (item.id === event.id) {
                            exists = true
                        }
                    })

                    if (!exists) {
                        this.agendaArray.get(dateFormat(item.startDate))!.events.push(item)
                        added = true
                    }
                } else {
                    this.agendaArray.set(dateFormat(item.startDate), new DataEvent([item], []))
                }

                this.agendaArray.get(dateFormat(item.startDate))!.events.sort(this.orderAsc)
                exists = false
            }
        })
    }

    modifyFromAgendaArray = (eventModified: Event) => {
        this.agendaArray.get(dateFormat(eventModified.startDate))!.events.map((event: Event, key: number) => {
            if (event.id === eventModified.id) {
                this.agendaArray.get(dateFormat(eventModified.startDate))!.events.splice(key, 1, eventModified)
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
        await new EventApi().delete(event.id)

        this.deleteFromAgendaArray(event.id, dateFormat(event.signDate))
        this.markedDatesToJson()
    }

    setDots = (date: string) => {
        const events = this.agendaArray.get(date)!.events
        const dots = this.agendaArray.get(date)!.dots
        this.agendaArray.get(date)!.dots = []
        let exists = false

        events.map(item => {
            dots.map(dot => {
                if (dot.key === item.eventType.type) {
                    exists = true
                }
            })
            if (!exists) {
                this.agendaArray.get(date)!.dots.push(new Dot(item.eventType.type, item.eventType.color!))
            }
        })
    }

    @action markedDatesToJson = () => {
        this.renderMarkedDates = []
        this.markedDatesToAgenda = {}
        let existsItems = false

        existsItems = this.agendaArray!.has(this.dateSelected)

        if (this.agendaArray !== undefined && this.agendaArray.size > 0) {
            for (let [key, item] of this.agendaArray!) {
                this.setDots(key)
                if (this.dateSelected === key) {
                    this.renderMarkedDates.push({ [key.toString()]: { marked: true, selected: true, selectedColor: COLORS.touchables, selectedTextColor: COLORS.textButtons, dots: item.dots, disabled: false } })
                }
                else {
                    if (this.dateSelected === dateFormat(new Date())) {
                        this.renderMarkedDates.push({ [key.toString()]: { marked: true, selected: false, dots: item.dots, disabled: false } })
                    }
                    this.renderMarkedDates.push({ [key.toString()]: { marked: true, selected: false, dots: item.dots, disabled: false } })
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