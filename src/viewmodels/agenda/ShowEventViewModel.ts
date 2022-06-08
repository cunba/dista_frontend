import { action, makeAutoObservable, observable } from "mobx"
import {Event} from "client/disheap/models/Event"

export class ShowEventViewModel {
    @observable eventPressed?: Event

    constructor() {
        makeAutoObservable(this)
    }

    @action setEventPressed(item: Event) {
        this.eventPressed = item
    }
}