import { makeAutoObservable } from "mobx";


export class HomeViewModel {
    constructor() {
        makeAutoObservable(this)
    }
}