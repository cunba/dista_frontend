import { LoginRepository } from "data/repository/LoginRepository";
import DisheapApiClient, { DisheapApi } from "infrastructure/data/DisheapApiClient";
import { DisheapBaseRepository } from "infrastructure/data/repository/DisheapBaseRepository";
import { SessionStoreFactory } from "infrastructure/data/SessionStoreFactory";
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
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const token = await new LoginRepository().login(credentials!.email!, credentials!.password!)
                SessionStoreFactory.getSessionStore().setToken(token.token)
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
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const token = await new LoginRepository().login(credentials!.email!, credentials!.password!)
                SessionStoreFactory.getSessionStore().setToken(token.token)
                SchoolYearRepository.tries++
                this.getById(id)
            } else {
                SchoolYearRepository.tries = 0
                throw e
            }
        }
    }
}