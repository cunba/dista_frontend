import { action, makeAutoObservable } from "mobx"
import { Event } from "../../data/model/Event"

export class ShowEventViewModel {
    eventPressed?: Event

    constructor() {
        makeAutoObservable(this)
    }

    @action setEventPressed(item: Event) {
        this.eventPressed = item
    }
}