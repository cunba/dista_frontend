import { UserApi } from "client/UserApi";
import { SessionStoreFactory } from "infrastructure/data/SessionStoreFactory";
import { action, makeAutoObservable, observable } from "mobx";

export class SendEmailViewModel {
    @observable email?: string = ""

    constructor() {
        makeAutoObservable(this)
    }

    @action setEmail(email: string) {
        this.email = email
        return this.email
    }

    @action async passwordRecover() {
        await new UserApi().passwordRecover(this.email!)
        SessionStoreFactory.getSessionStore().setRecoverPassword("true");
    }
}