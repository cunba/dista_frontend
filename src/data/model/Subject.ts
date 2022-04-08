import { SchoolYear } from './SchoolYear';

export class Subject {
    id: string
    name: string
    schoolYear: SchoolYear

    constructor(id: string, name: string, schoolYear: SchoolYear) {
        this.id = id
        this.name = name
        this.schoolYear = schoolYear
    }
}

export class SubjectFlat {
    id: string
    name: string
    school_year_id: string

    constructor(id: string, name: string, school_year_id: string) {
        this.id = id
        this.name = name
        this.school_year_id = school_year_id
    }
}