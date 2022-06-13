import { LoginRepository } from "data/repository/LoginRepository";
import DisheapApiClient, { DisheapApi } from "infrastructure/data/DisheapApiClient";
import { DisheapBaseRepository } from "infrastructure/data/repository/DisheapBaseRepository";
import { SessionStoreFactory } from "infrastructure/data/SessionStoreFactory";
import ISubjectApi from "../ISubjectApi";

export class SubjectRepository extends DisheapBaseRepository<ISubjectApi> {
    
    static tries = 0

    constructor() {
        super(DisheapApi.SubjectApi, false)
    }

    async getBySchoolYearId(schoolYearId: string) {
        try {
            const client = await this.apiClient
            const result = await client.getSubjectsBySchoolYearId(schoolYearId)
            SubjectRepository.tries = 0
            return result
        } catch (e) {
            if (e && SubjectRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const token = await new LoginRepository().login(credentials!.email!, credentials!.password!)
                SessionStoreFactory.getSessionStore().setToken(token.token)
                SubjectRepository.tries++
                this.getBySchoolYearId(schoolYearId)
            } else {
                SubjectRepository.tries = 0
                throw e
            }
        }
    }

    async getById(id: string) {
        try {
            const client = await this.apiClient
            const result = await client.getSubjectById(id)
            SubjectRepository.tries = 0
            return result
        } catch (e) {
            if (e && SubjectRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const token = await new LoginRepository().login(credentials!.email!, credentials!.password!)
                SessionStoreFactory.getSessionStore().setToken(token.token)
                SubjectRepository.tries++
                this.getById(id)
            } else {
                SubjectRepository.tries = 0
                throw e
            }
        }
    }
}