import { HomeworkDTO, HandledResponse } from "client/disheap"
import { Homework } from "client/disheap/models/Homework"

export default interface IHomeworkApi {

    getHomeworksByByDeadlineBetweenAndUserId(minDate: number, maxDate: number, userId: string): Promise<Homework[]>

    getHomeworksByDeadlineBetweenAndSubjectIdAndUserId(minDate: number, maxDate: number, subjectId: string, userId: string): Promise<Homework[]>

    getHomeworkById(id: string): Promise<Homework>

    saveHomework(homeworkDTO: HomeworkDTO): Promise<Homework>

    updateHomework(id: string, homeworkDTO: HomeworkDTO): Promise<HandledResponse>

    deleteHomework(id: string): Promise<Homework>

    deleteHomeworksByUserId(userId: string): Promise<Homework[]>

}