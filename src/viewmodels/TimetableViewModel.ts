import { SchoolYearApi } from "client/SchoolYearApi";
import { StudyApi } from "client/StudyApi";
import { UserApi } from "client/UserApi";
import { SchoolYear } from "data/model/SchoolYear";
import { Study } from "data/model/Study";
import { Subject } from "data/model/Subject";
import { ICredentials, SessionStoreFactory } from "infrastructure/data/SessionStoreFactory";
import { action, makeAutoObservable, observable, runInAction } from 'mobx';
import { genTimeBlock } from 'react-native-timetable';
import { SubjectApi } from '../client/SubjectApi';
import { TimetableApi } from '../client/TimetableApi';
import { TimetableFlat } from '../data/model/Timetable';
import { getWeekDayString } from '../utils/datetimeFormatterHelper';

export class TimetableViewModel {
    @observable allSubjects: Array<Subject> = observable([])
    @observable dataTimetable: Array<DataTimetable> = observable([])
    @observable newData: Array<TimetableFlat> = observable([])

    constructor() {
        makeAutoObservable(this)
        this.constructorFunctions()
    }

    @action constructorFunctions = async () => {
        await this.getTimetable()
    }

    @action getTimetable = async () => {
        const userId = (await new UserApi().getUser()).id
        const res = await new TimetableApi().getByUser(userId)

        res.map(async (item: TimetableFlat) => {
            const subject = await new SubjectApi().getById(item.subject_id)

            const data = new DataTimetable(
                subject[0].name,
                genTimeBlock(getWeekDayString(item.week_day), item.start_time.substring(0, 2), item.start_time.substring(3, 5)),
                genTimeBlock(getWeekDayString(item.week_day), item.end_time.substring(0, 2), item.end_time.substring(3, 5))
            )
            runInAction(() => {
                this.dataTimetable.push(data)
            })
        })
    }

    @action getAllSubjectsBySchoolYear = async () => {
        const schoolYearId = (await SessionStoreFactory.getSessionStore().getUser() as ICredentials).schoolYearId
        const res = await new SubjectApi().getBySchoolYearId(schoolYearId)
        let exists = false

        await Promise.all(res.map(async (item: any) => {
            let schoolYear = await new SchoolYearApi().getById(item.school_year_id)
            let study = await new StudyApi().getById(schoolYear[0].study_id)
            study = new Study(study[0].id, study[0].study)
            schoolYear = new SchoolYear(schoolYear[0].id, study, schoolYear[0].schoolYear)
            const subject = new Subject(item.id, item.name, schoolYear)
            this.allSubjects.map((item2: Subject) => {
                if (item2.id === subject.id) {
                    exists = true
                }
            })

            if (!exists) {
                runInAction(() => {
                    this.allSubjects.push(subject)
                })
            } else {
                exists = false
            }
        }))
    }

    @action clearNewData = () => {
        this.newData.splice(0, this.newData.length)
    }

    @action saveNewData = async () => {
        Promise.all(this.newData.map(async (item: TimetableFlat) => {
            await new TimetableApi().save(item)
            const subject = await new SubjectApi().getById(item.subject_id)
            runInAction(() => {
                this.dataTimetable.push(new DataTimetable(
                    subject[0].name,
                    genTimeBlock(getWeekDayString(item.week_day), item.start_time.substring(0, 2), item.start_time.substring(3, 5)),
                    genTimeBlock(getWeekDayString(item.week_day), item.end_time.substring(0, 2), item.end_time.substring(3, 5))
                ))
            })
        }))
    }
}

export class DataTimetable {
    title: string
    startTime: string
    endTime: string
    id?: string
    location?: string
    extra_descriptions?: Array<string>

    constructor(title: string, startTime: string, endTime: string) {
        this.title = title
        this.startTime = startTime
        this.endTime = endTime
    }

    setLocation(location: string) {
        this.location = location
    }

    setExtraDescriptions(extraDescription: Array<string>) {
        this.extra_descriptions = extraDescription
    }

    setId(id: string) {
        this.id = id
    }
}