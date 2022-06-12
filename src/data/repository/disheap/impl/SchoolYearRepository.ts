import DisheapApiClient, { DisheapApi } from "infrastructure/data/DisheapApiClient";
import { DisheapBaseRepository } from "infrastructure/data/repository/DisheapBaseRepository";
import ISchoolYearApi from "../ISchoolYearApi";

export class SchoolYearRepository extends DisheapBaseRepository<ISchoolYearApi> {
    
    static tries = 0

    constructor() {
        super(DisheapApi.SchoolYearApi, false)
    }

    async getAll() {
        try {
            const client = await DisheapApiClient.clientFor<ISchoolYearApi>(DisheapApi.SchoolYearApi)
            const result = await client.getAllSchoolYears()
            SchoolYearRepository.tries = 0
            return result
        } catch (e) {
            if (e && SchoolYearRepository.tries < 1) {
                SchoolYearRepository.tries++
                this.getAll()
            } else {
                SchoolYearRepository.tries = 0
                throw e
            }
        }
    }

    async getById(id: string) {
        try {
            const client = await DisheapApiClient.clientFor<ISchoolYearApi>(DisheapApi.SchoolYearApi)
            const result = await client.getSchoolYearById(id)
            SchoolYearRepository.tries = 0
            return result
        } catch (e) {
            if (e && SchoolYearRepository.tries < 1) {
                SchoolYearRepository.tries++
                this.getById(id)
            } else {
                SchoolYearRepository.tries = 0
                throw e
            }
        }
    }
}