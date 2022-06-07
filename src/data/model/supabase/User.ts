import { Disorder } from "./Disorder"
import { SchoolYear } from "./SchoolYear"

export class User {
    name: string
    surname: string
    birthday: string
    schoolYear: SchoolYear
    disorder: boolean
    disorderType: Disorder
    email: string
    password: string

    constructor(name: string, surname: string, birthday: string, schoolYear: SchoolYear, disorder: boolean, disorderType: Disorder, email: string, password: string) {
        this.name = name
        this.surname = surname
        this.birthday = birthday
        this.schoolYear = schoolYear
        this.disorder = disorder
        this.disorderType = disorderType
        this.email = email
        this.password = password
    }
}

export class UserFlat {
    name: string
    surname: string
    birthday: string
    disorderId: string
    schoolYearId: string
    email: string
    password: string

    constructor(name: string, surname: string, birthday: string, disorderId: string, schoolYearId: string, email: string, password: string) {
        this.name = name
        this.surname = surname
        this.birthday = birthday
        this.disorderId = disorderId
        this.schoolYearId = schoolYearId
        this.email = email
        this.password = password
    }
}