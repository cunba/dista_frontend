import { makeAutoObservable } from "mobx";


export class DataViewModel {
    constructor() {
        makeAutoObservable(this)
    }
}