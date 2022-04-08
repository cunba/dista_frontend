import { action, makeAutoObservable, observable } from "mobx";

export class LoginViewModel {
    @observable email?: string = ""
    @observable password?: string = ""

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

    isPasswordValid() {
        if (this.password) {
            return this.password.trim().length > 0
        }
        else { return false }
    }

    isEmailValid() {
        if (this.email) {
            return this.email.trim().length > 0
        }
        else { return false }
    }

    isValid() {
        return this.isEmailValid() === true && this.isPasswordValid() === true
    }
}