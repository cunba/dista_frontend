import { SchoolYearDTO, HandledResponse } from "client/disheap"
import { SchoolYear } from "client/disheap/models/SchoolYear"

export default interface ISchoolYearApi {

    getAllSchoolYears(): Promise<SchoolYear[]>

    getSchoolYearById(id: string): Promise<SchoolYear>

}