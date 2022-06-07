import { action, makeAutoObservable } from "mobx"
import {Event} from "client/disheap/models/Event"

export class ShowEventViewModel {
    eventPressed?: Event

    constructor() {
        makeAutoObservable(this)
    }

    @action setEventPressed(item: Event) {
        this.eventPressed = item
    }
}