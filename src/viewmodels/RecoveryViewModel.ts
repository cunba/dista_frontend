import { action, makeAutoObservable, observable } from "mobx"

export class RecoveryViewModel {
    @observable email?: string = ""
    @observable password?: string = ""
    @observable passwordRepeat?: string = ""

    constructor() {
        makeAutoObservable(this)
    }

    @action setEmail(email: string) {
        this.email = email
        return this.email
    }

    @action setPassword(password: string) {
        this.password = password
        return this.password
    }

    @action setPasswordRepeat(passwordRepeat: string) {
        this.passwordRepeat = passwordRepeat
        return this.passwordRepeat
    }

    isEmailValid() {
        if (this.email) {
            return this.email.trim().length > 0
        }
        else { return false }
    }
}