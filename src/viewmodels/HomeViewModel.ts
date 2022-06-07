import { UserRepository } from "data/repository/disheap/impl/UserRepository";
import { SessionStoreFactory } from "infrastructure/data/SessionStoreFactory";
import { makeAutoObservable } from "mobx";


export class HomeViewModel {
    constructor() {
        makeAutoObservable(this)
    }
}