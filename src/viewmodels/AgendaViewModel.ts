import { UserApi } from 'client/UserApi';
import { COLORS } from 'config/Colors';
import { Event } from 'data/model/Event';
import { action, makeAutoObservable, observable } from 'mobx';
import { dateFormat } from 'utils/datetimeFormatterHelper';
import { EventApi } from '../client/EventApi';
import { EventTypeApi } from '../client/EventTypeApi';

export class AgendaViewModel {
    @observable agendaArray: Map<String, Event[]> = new Map()
    @observable renderMarkedDates: any = []
    @observable markedDatesToAgenda: any = {}
    @observable dateSelected: string = dateFormat(new Date())
    @observable dateTo: Date = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 1, 23, 59, 59, 59)
    @observable dateFrom: Date = new Date().getMonth() + 1 > 2 ?
        new Date(new Date().getFullYear(), new Date().getMonth() - 2, 1, 0, 0, 0, 0)
        :
        new Date(new Date().getFullYear() - 1, new Date().getMonth() - 2, 1, 0, 0, 0, 0)

    constructor() {
        makeAutoObservable(this)
        this.setDateFrom()
        this.constructorFunctions()
    }

    @action async constructorFunctions() {
        const events = await this.getAllEvents()
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
        const userId = (await new UserApi().getUser()).id
        const res = await new EventApi().getByStartDateAndEndDateAndUser(this.dateFrom, this.dateTo, userId!)
        const events: Event[] = []

        if (res !== false) {
            res.map(async (item: any) => {
                const eventType = await new EventTypeApi().getById(item.event_type_id)
                events.push(new Event(item.id, item.name, item.notes, item.start_date, item.end_date, eventType, item.user_id))
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
                    this.agendaArray.get(dateFormat(item.startDate))!.push(item)
                    this.agendaArray.get(dateFormat(item.startDate))!.sort(this.orderAsc)
                } else {
                    this.agendaArray.set(dateFormat(item.startDate), [item])
                }
            })
        }
    }

    // @action saveSigning = async () => {
    //     const location = geolocation === undefined ? new Location(0.0, 0.0) : geolocation
    //     var dateObj = new Date(this.dateToMissedSignings.getFullYear(),
    //         this.dateToMissedSignings.getMonth(),
    //         this.dateToMissedSignings.getDate(),
    //         this.time.getHours(),
    //         this.time.getMinutes(),
    //         this.time.getSeconds()
    //     );

    //     const user = (await SessionStoreFactory.getSessionStore().getUser() as ICredentials).username
    //     const signing = new SigningFlat(user!, location!, dateObj, this.getCurrentType(), SigningState.CREATED, SigningPlace.OOO, this.observationId!)
    //     const response = await new SigningApi().saveSigning(signing)

    //     if (response === false) {
    //         const observationId = signing.observation_id === undefined ? '00000000-0000-0000-0000-000000000000' : signing.observation_id
    //         const icon = new Icon('0', 'alert', Directory.OCTICONS)
    //         const observation = new Observation(observationId, 'Alert', icon)
    //         const signingError = new Signing('0', signing.user_id, signing.location, signing.sign_date, signing.type, signing.state, signing.place, observation)
    //         this.agendaArray.get(dateFormat(signingError.signDate))!.signings.push(signingError)
    //         if (this.sortType === 'orderAsc') {
    //             this.agendaArray.get(dateFormat(signingError.signDate))!.signings.sort(orderAsc)
    //         } else {
    //             this.agendaArray.get(dateFormat(signingError.signDate))!.signings.sort(orderDesc)
    //         }
    //         this.agendaArray.get(dateFormat(signingError.signDate))!.dayCorrect = this.isDayCorrect(this.agendaArray.get(dateFormat(signingError.signDate))!.signings)
    //         this.markedDatesToJson()
    //         SessionStoreFactory.getSessionStore().setSignings(signingError)
    //     }

    //     this.setObservation('')
    // }

    refreshEvents = async (date: Date) => {
        const from = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0)
        const to = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 59)
        const userId = (await new UserApi().getUser()).id
        const events: Event[] = []

        const res = await new EventApi().getByStartDateAndEndDateAndUser(from, to, userId)

        res.map(async (item: any) => {
            const eventType = await new EventTypeApi().getById(item.event_type_id)
            events.push(new Event(item.id, item.name, item.notes, item.start_date, item.end_date, eventType, item.user_id))
        })

        if (events.length > 0) {
            events.sort(this.orderAsc)
            this.compareEvents(events)
        }

        this.markedDatesToJson()
    }

    compareEvents = (eventsTemplate: Event[]) => {
        let exists: boolean = false
        let added = false

        eventsTemplate.map((item: Event) => {
            if (this.agendaArray!.size === 0) {
                this.agendaArray.set(dateFormat(item.startDate), [item])
                added = true
            } else {
                if (this.agendaArray.has(dateFormat(item.startDate))) {
                    this.agendaArray.get(dateFormat(item.startDate))!.map((event: Event) => {
                        if (item.id === event.id) {
                            exists = true
                        }
                    })

                    if (!exists) {
                        this.agendaArray.get(dateFormat(item.startDate))!.push(item)
                        added = true
                    }
                } else {
                    this.agendaArray.set(dateFormat(item.startDate), [item])
                }

                this.agendaArray.get(dateFormat(item.startDate))!.sort(this.orderAsc)
                exists = false
            }
        })
    }

    modifyFromAgendaArray = (eventModified: Event) => {
        this.agendaArray.get(dateFormat(eventModified.startDate))!.map((event: Event, key: number) => {
            if (event.id === eventModified.id) {
                this.agendaArray.get(dateFormat(eventModified.startDate))!.splice(key, 1, eventModified)
            }
        })
    }

    deleteFromAgendaArray = (id: string, date: string) => {
        this.agendaArray.get(date)!.map((event: Event, key: number) => {
            if (event.id === id) {
                this.agendaArray.get(date)!.splice(key, 1)

                if (this.agendaArray.get(date)!.length === 0) {
                    this.agendaArray.delete(date)
                }
            }
        })
    }

    @action deleteEvent = async (event: any) => {
        const response = await new EventApi().delete(event.id)

        this.deleteFromAgendaArray(event.id, dateFormat(event.signDate))
        this.markedDatesToJson()
    }

    @action markedDatesToJson = () => {
        this.renderMarkedDates = []
        this.markedDatesToAgenda = {}
        let existsItems = false
        const defaultColor = 'brown'

        existsItems = this.agendaArray!.has(this.dateSelected)

        if (this.agendaArray !== undefined && this.agendaArray.size > 0) {
            for (let [key, item] of this.agendaArray!) {
                if (this.dateSelected === key) {
                    this.renderMarkedDates.push({ [key.toString()]: { marked: true, selected: true, selectedColor: COLORS.touchables, selectedTextColor: COLORS.textButtons, dotColor: COLORS.textButtons, disabled: false } })
                }
                else {
                    if (this.dateSelected === dateFormat(new Date())) {
                        this.renderMarkedDates.push({ [key.toString()]: { marked: true, selected: false, dotColor: 'red', selectedTextColor: 'blue', disabled: false } })
                    }
                    this.renderMarkedDates.push({ [key.toString()]: { marked: true, selected: false, dotColor: 'red', disabled: false } })
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
}

// export class AgendaItems {
//     event: Event[]
//     dayCorrect?: boolean

//     constructor(signings: Event[], dayCorrect: boolean) {
//         this.signings = signings
//         this.dayCorrect = dayCorrect
//     }
// }