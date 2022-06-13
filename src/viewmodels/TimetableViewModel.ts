import { TimetableDTO, UserModel } from "client/disheap";
import { Subject } from "client/disheap/models/Subject";
import { Timetable } from "client/disheap/models/Timetable";
import { SubjectRepository } from "data/repository/disheap/impl/SubjectRepository";
import { TimetableRepository } from "data/repository/disheap/impl/TimetableRepository";
import { SessionStoreFactory } from "infrastructure/data/SessionStoreFactory";
import { action, makeAutoObservable, observable, runInAction } from 'mobx';
import { genTimeBlock } from 'react-native-timetable';
import { getWeekDayString } from "utils/utils";

export class TimetableViewModel {
    subjectRepository = new SubjectRepository()
    timetableRepository = new TimetableRepository()

    @observable allSubjects: Array<Subject> = observable([])
    @observable dataTimetable: Array<DataTimetable> = observable([])
    @observable newData: Array<Timetable> = observable([])

    constructor() {
        makeAutoObservable(this)
    }

    @action constructorFunctions = async () => {
        const user = await SessionStoreFactory.getSessionStore().getUser()
        this.getTimetable(user!)
        this.getAllSubjectsBySchoolYear(user!)
    }

    @action getTimetable = async (user: UserModel) => {
        const res = await this.timetableRepository.getByUserId(user.id!)
        console.log(res)

        res!.map(async (item: Timetable) => {
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

    @action getAllSubjectsBySchoolYear = async (user: UserModel) => {
        await this.subjectRepository.getBySchoolYearId(user.schoolYear!.id!).then(items => {
            this.setAllSubjects(items ?? [])
        })
    }

    @action setAllSubjects(subjects: Subject[]) {
        this.allSubjects = subjects
    }

    @action clearNewData = () => {
        this.newData.splice(0, this.newData.length)
    }

    @action saveNewData = async () => {
        Promise.all(this.newData.map(async (item: TimetableDTO) => {
            await this.timetableRepository.save(item)
            const subject = await this.subjectRepository.getById(item.subjectId!)
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