import { SchoolYearApi } from "client/supabase/SchoolYearApi";
import { StudyApi } from "client/supabase/StudyApi";
import { Disorder } from "data/model/Disorder";
import { action, makeAutoObservable, observable, runInAction } from "mobx";
import { dateFormat } from "utils/datetimeFormatterHelper";
import { DisorderApi } from '../client/supabase/DisorderApi';
import { SchoolYearFlat } from '../data/model/SchoolYear';
import { Study } from '../data/model/Study';
import { UserFlat } from '../data/model/User';

export class SignUpViewModel {
    @observable email?: string
    @observable password?: string
    @observable name?: string
    @observable surname?: string
    @observable birthday?: Date = new Date()
    @observable schoolYear?: string = ''
    @observable isDisorder?: boolean = false
    @observable disorder?: string = ''
    @observable repeatPassword?: string
    @observable allStudies?: Array<Study> = observable([])
    @observable allSchoolYears?: Map<string, SchoolYearFlat[]> = new Map()
    @observable allDisorders?: Array<Disorder> = observable([])
    @observable user?: UserFlat

    constructor() {
        makeAutoObservable(this)
        this.constructorFunctions()
    }

    @action async constructorFunctions() {
        await this.getAllSchoolYears()
        await this.getAllDisorders()
    }

    @action async getAllDisorders() {
        const res = await new DisorderApi().getAll()

        res.map((item: any) => {
            runInAction(() => {
                this.allDisorders?.push(new Disorder(item.id, item.disorder))
            })
        })
    }

    @action async getAllSchoolYears() {
        const res = await new SchoolYearApi().getAll()

        Promise.all(res.map(async (item: SchoolYearFlat) => {
            const study = await new StudyApi().getById(item.study_id)

            if (this.allSchoolYears!.has(study[0].study)) {
                this.allSchoolYears!.get(study[0].study)!.push(item)
            } else {
                this.allSchoolYears!.set(study[0].study, [item])
            }
            this.allSchoolYears!.get(study[0].study)!.sort(this.orderDesc)
        }))
    }

    orderDesc = (a: SchoolYearFlat, b: SchoolYearFlat) => {
        if (a.school_year.substring(0, 1) > b.school_year.substring(0, 1)) {
            return -1
        } else if (a.school_year.substring(0, 1) < b.school_year.substring(0, 1)) {
            return 1
        } else {
            return 0
        }
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
        this.user = new UserFlat(this.name!, this.surname!, dateFormat(this.birthday!, 'DD/MM/YYYY'), this.disorder!, this.schoolYear!, this.email!, this.password!)
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