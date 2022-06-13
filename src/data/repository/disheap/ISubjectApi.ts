import { SubjectDTO, HandledResponse } from "client/disheap"
import { Subject } from "client/disheap/models/Subject"

export default interface ISubjectApi {

    getSubjectsBySchoolYearId(schoolYearId: string): Promise<Subject[]>

    getSubjectById(id: string): Promise<Subject>

}