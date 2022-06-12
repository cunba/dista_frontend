import { UserDTO } from "client/disheap";
import { Disorder } from "client/disheap/models/Disorder";
import { SchoolYear } from "client/disheap/models/SchoolYear";
import { DisorderRepository } from "data/repository/disheap/impl/DisorderRepository";
import { SchoolYearRepository } from "data/repository/disheap/impl/SchoolYearRepository";
import { action, makeAutoObservable, observable } from "mobx";
import { dateFormat } from "utils/datetimeFormatterHelper";

export class SignUpViewModel {

    disorderRepository = new DisorderRepository()
    schoolYearReposiroty = new SchoolYearRepository()

    @observable email?: string
    @observable password?: string
    @observable name?: string
    @observable surname?: string
    @observable birthday?: Date = new Date()
    @observable schoolYear?: string = ''
    @observable isDisorder?: boolean = false
    @observable disorder?: string = ''
    @observable repeatPassword?: string
    @observable allSchoolYears?: Map<string, SchoolYear[]> = new Map()
    @observable allDisorders?: Disorder[] = observable([])
    @observable user?: UserDTO

    constructor() {
        makeAutoObservable(this)
        this.constructorFunctions()
    }

    @action constructorFunctions() {
        this.getAllSchoolYears()
        this.getAllDisorders()
    }

    @action async getAllDisorders() {
        await this.disorderRepository.getAll().then(disorders => {
            console.log(disorders)
            this.setAllDisorders(disorders ?? [])
        })
    }

    @action async getAllSchoolYears() {
        const res = await this.schoolYearReposiroty.getAll()
        console.log(res)

        Promise.all(res!.map(async (item: SchoolYear) => {
            if (this.allSchoolYears!.has(item.study!)) {
                this.allSchoolYears!.get(item.study!)!.push(item)
            } else {
                this.allSchoolYears!.set(item.study!, [item])
            }
            this.allSchoolYears!.get(item.study!)!.sort(this.orderDesc)
        }))
        console.log(this.allSchoolYears)
    }

    orderDesc = (a: SchoolYear, b: SchoolYear) => {
        if (a.name!.substring(0, 1) > b.name!.substring(0, 1)) {
            return -1
        } else if (a.name!.substring(0, 1) < b.name!.substring(0, 1)) {
            return 1
        } else {
            return 0
        }
    }

    @action setAllDisorders(disorders: Disorder[]) {
        this.allDisorders = disorders
    }

    @action setEmail(email: string) {
        this.email = email
        return this.email
    }

    @action setPassword(password: string) {
        this.password = password
        return this.password
    }

    @action setName(name: string) {
        this.name = name
        return this.name
    }

    @action setSurname(surname: string) {
        this.surname = surname
        return this.surname
    }

    @action setBirthday(birthday: Date) {
        this.birthday = birthday
        return this.birthday
    }

    @action setSchoolYear(schoolYear: string) {
        this.schoolYear = schoolYear
        return this.schoolYear
    }

    @action setIsDisorder(isDisorder: boolean) {
        this.isDisorder = isDisorder
        return this.isDisorder
    }

    @action setDisorder(disorder: string) {
        this.disorder = disorder
        return this.disorder
    }

    @action setRepeatPassword(repeatPassword: string) {
        this.repeatPassword = repeatPassword
        return this.repeatPassword
    }

    @action setUser() {
        const user: UserDTO = {
            name: this.name!,
            surname: this.surname!,
            birthday: dateFormat(this.birthday!, "dd-MM-yyyy"),
            isDisorder: this.isDisorder!,
            disorderId: this.isDisorder ? this.disorder : undefined,
            email: this.email!,
            password: this.password!,
            schoolYearId: this.schoolYear!,
            role: "USER"
        }
        
        this.user = user
    }

    isPasswordValid() {
        if (this.password) {
            return this.password.trim().length > 0
        }
        else { return false }
    }

    isRepeatPasswordValid() {
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

    isNameValid() {
        if (this.name) {
            return this.name.trim().length > 0
        }
        else { return false }
    }

    isSurnameValid() {
        if (this.surname) {
            return this.surname.trim().length > 0
        }
        else { return false }
    }

    isSchoolYearValid() {
        if (this.schoolYear) {
            return this.schoolYear.trim().length > 0
        }
        else { return false }
    }

    isDisorderValid() {
        if (this.disorder) {
            return this.disorder.trim().length > 0
        }
        else { return false }
    }

    @action isValid() {
        let disorderValid = true
        if (this.isDisorder) {
            disorderValid = this.isDisorderValid()
        }

        return (
            this.isEmailValid() === true
            &&
            this.isPasswordValid() === true
            &&
            this.isNameValid() === true
            &&
            this.isSurnameValid() === true
            &&
            this.isSchoolYearValid() === true
            &&
            this.isRepeatPasswordValid() === true
            &&
            disorderValid === true
        )
    }

    @action passwordLength() {
        if (this.password) {
            return this.password.trim().length > 6
        }
        else { return false }
    }
}