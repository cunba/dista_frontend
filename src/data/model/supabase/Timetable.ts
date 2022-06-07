import { Subject } from "./Subject"
import { User } from './User';

export class Timetable {
    id: string
    startTime: string
    endTime: string
    weekDay: number
    subject: Subject
    user: User

    constructor(id: string, startTime: string, endTime: string, weekDay: number, subject: Subject, user: User) {
        this.id = id
        this.startTime = startTime
        this.endTime = endTime
        this.weekDay = weekDay
        this.subject = subject
        this.user = user
    }
}

export class TimetableFlat {
    start_time: string
    end_time: string
    week_day: number
    subject_id: string
    user_id: string

    constructor(start_time: string, end_time: string, week_day: number, subject_id: string, user_id: string) {
        this.start_time = start_time
        this.end_time = end_time
        this.week_day = week_day
        this.subject_id = subject_id
        this.user_id = user_id
    }
}