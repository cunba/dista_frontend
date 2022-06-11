import { TimetableDTO } from "client/disheap";
import { Subject } from "client/disheap/models/Subject";
import { Timetable } from "client/disheap/models/Timetable";
import { SubjectRepository } from "data/repository/disheap/impl/SubjectRepository";
import { TimetableRepository } from "data/repository/disheap/impl/TimetableRepository";
import { SessionStoreFactory } from "infrastructure/data/SessionStoreFactory";
import { action, makeAutoObservable, observable, runInAction } from 'mobx';
import { genTimeBlock } from 'react-native-timetable';
import { getWeekDayString } from "utils/utils";

export class TimetableViewModel {
    @observable allSubjects: Array<Subject> = observable([])
    @observable dataTimetable: Array<DataTimetable> = observable([])
    @observable newData: Array<Timetable> = observable([])

    constructor() {
        makeAutoObservable(this)
        this.constructorFunctions()
    }

    @action constructorFunctions = async () => {
        await this.getTimetable()
    }

    @action getTimetable = async () => {
        const userId = (await SessionStoreFactory.getSessionStore().getUser())!.id
        const res = await new TimetableRepository().getByUserId(userId!)

        res!.map(async (item: Timetable) => {
            // const subject = await new Subject().getById(item.subject_id)

            const data = new DataTimetable(
                item.subject!.name!,
                genTimeBlock(getWeekDayString(item.weekDay!), item.startTime!.substring(0, 2), item.startTime!.substring(3, 5)),
                genTimeBlock(getWeekDayString(item.weekDay!), item.endTime!.substring(0, 2), item.endTime!.substring(3, 5))
            )
            runInAction(() => {
                this.dataTimetable.push(data)
            })
        })
    }

    @action getAllSubjectsBySchoolYear = async () => {
        const schoolYearId = (await SessionStoreFactory.getSessionStore().getUser())?.schoolYear?.id
        const res = await new SubjectRepository().getBySchoolYearId(schoolYearId!)
        let exists = false

        await Promise.all(res!.map(async (item: Subject) => {
            this.allSubjects.map((item2: Subject) => {
                if (item2.id === item.id) {
                    exists = true
                }
            })

            if (!exists) {
                runInAction(() => {
                    this.allSubjects.push(item)
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
        Promise.all(this.newData.map(async (item: TimetableDTO) => {
            await new TimetableRepository().save(item)
            const subject = await new SubjectRepository().getById(item.subjectId!)
            runInAction(() => {
                this.dataTimetable.push(new DataTimetable(
                    subject!.name!,
                    genTimeBlock(getWeekDayString(item.weekDay!), item.startTime!.substring(0, 2), item.startTime!.substring(3, 5)),
                    genTimeBlock(getWeekDayString(item.weekDay!), item.endTime!.substring(0, 2), item.endTime!.substring(3, 5))
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