import { TimetableDTO, HandledResponse } from "client/disheap"
import { Timetable } from "client/disheap/models/Timetable"

export default interface ITimetableApi {

    getTimetablesByUserId(userId: string): Promise<Timetable[]>

    getTimetableById(id: string): Promise<Timetable>

    saveTimetable(timetableDTO: TimetableDTO): Promise<Timetable>

    updateTimetable(id: string, timetableDTO: TimetableDTO): Promise<HandledResponse>

    deleteTimetable(id: string): Promise<Timetable>

    deleteTimetablesByUserId(userId: string): Promise<Timetable[]>

}