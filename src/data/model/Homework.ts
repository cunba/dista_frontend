import { Subject } from "./Subject"
import { User } from './User';

export class Homework {
    id: string
    name: string
    description: string
    deadline: Date
    subject: Subject
    user: User

    constructor(id: string, name: string, description: string, deadline: Date, subject: Subject, user: User) {
        this.id = id
        this.name = name
        this.description = description
        this.deadline = deadline
        this.subject = subject
        this.user = user
    }
}

export class HomeworkFlat {
    name: string
    description: string
    deadline: Date
    subject_id: string
    user_id: string

    constructor(name: string, description: string, deadline: Date, subject_id: string, user_id: string) {
        this.name = name
        this.description = description
        this.deadline = deadline
        this.subject_id = subject_id
        this.user_id = user_id
    }
}