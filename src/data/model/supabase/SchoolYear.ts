import { Study } from './Study';

export class SchoolYear {
    id: string
    schoolYear: string
    study: Study

    constructor(id: string, study: Study, schoolYear: string) {
        this.id = id
        this.study = study
        this.schoolYear = schoolYear
    }
}

export class SchoolYearFlat {
    id: string
    school_year: string
    study_id: string

    constructor(id: string, school_year: string, study_id: string,) {
        this.id = id
        this.school_year = school_year
        this.study_id = study_id
    }
}