import { HomeworkDTO } from "client/disheap";
import { LoginRepository } from "data/repository/LoginRepository";
import DisheapApiClient, { DisheapApi } from "infrastructure/data/DisheapApiClient";
import { DisheapBaseRepository } from "infrastructure/data/repository/DisheapBaseRepository";
import { SessionStoreFactory } from "infrastructure/data/SessionStoreFactory";
import IHomeworkApi from "../IHomeworkApi";

export class HomeworkRepository extends DisheapBaseRepository<IHomeworkApi> {
    
    static tries = 0

    constructor() {
        super(DisheapApi.HomeworkApi, false)
    }

    async getByByDeadlineBetweenAndUserId(minDate: number, maxDate: number, userId: string) {
        try {
            const client = await this.apiClient
            const result = await client.getHomeworksByByDeadlineBetweenAndUserId(minDate, maxDate, userId)
            HomeworkRepository.tries = 0
            return result
        } catch (e) {
            if (e && HomeworkRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const token = await new LoginRepository().login(credentials!.email!, credentials!.password!)
                SessionStoreFactory.getSessionStore().setToken(token.token)
                HomeworkRepository.tries++
                this.getByByDeadlineBetweenAndUserId(minDate, maxDate, userId)
            } else {
                HomeworkRepository.tries = 0
                throw e
            }
        }
    }

    async getByDeadlineBetweenAndSubjectIdAndUserId(minDate: number, maxDate: number, subjectId: string, userId: string) {
        try {
            const client = await this.apiClient
            const result = await client.getHomeworksByDeadlineBetweenAndSubjectIdAndUserId(minDate, maxDate, subjectId, userId)
            HomeworkRepository.tries = 0
            return result
        } catch (e) {
            if (e && HomeworkRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const token = await new LoginRepository().login(credentials!.email!, credentials!.password!)
                SessionStoreFactory.getSessionStore().setToken(token.token)
                HomeworkRepository.tries++
                this.getByDeadlineBetweenAndSubjectIdAndUserId(minDate, maxDate, subjectId, userId)
            } else {
                HomeworkRepository.tries = 0
                throw e
            }
        }
    }

    async getById(id: string) {
        try {
            const client = await this.apiClient
            const result = await client.getHomeworkById(id)
            HomeworkRepository.tries = 0
            return result
        } catch (e) {
            if (e && HomeworkRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const token = await new LoginRepository().login(credentials!.email!, credentials!.password!)
                SessionStoreFactory.getSessionStore().setToken(token.token)
                HomeworkRepository.tries++
                this.getById(id)
            } else {
                HomeworkRepository.tries = 0
                throw e
            }
        }
    }

    async save(homeworkDTO: HomeworkDTO) {
        try {
            const client = await this.apiClient
            const result = await client.saveHomework(homeworkDTO)
            HomeworkRepository.tries = 0
            return result
        } catch (e) {
            if (e && HomeworkRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const token = await new LoginRepository().login(credentials!.email!, credentials!.password!)
                SessionStoreFactory.getSessionStore().setToken(token.token)
                HomeworkRepository.tries++
                this.save(homeworkDTO)
            } else {
                HomeworkRepository.tries = 0
                throw e
            }
        }
    }

    async update(id: string, homeworkDTO: HomeworkDTO) {
        try {
            const client = await this.apiClient
            const result = await client.updateHomework(id, homeworkDTO)
            HomeworkRepository.tries = 0
            return result
        } catch (e) {
            if (e && HomeworkRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const token = await new LoginRepository().login(credentials!.email!, credentials!.password!)
                SessionStoreFactory.getSessionStore().setToken(token.token)
                HomeworkRepository.tries++
                this.update(id, homeworkDTO)
            } else {
                HomeworkRepository.tries = 0
                throw e
            }
        }
    }

    async delete(id: string) {
        try {
            const client = await this.apiClient
            const result = await client.deleteHomework(id)
            HomeworkRepository.tries = 0
            return result
        } catch (e) {
            if (e && HomeworkRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const token = await new LoginRepository().login(credentials!.email!, credentials!.password!)
                SessionStoreFactory.getSessionStore().setToken(token.token)
                HomeworkRepository.tries++
                this.delete(id)
            } else {
                HomeworkRepository.tries = 0
                throw e
            }
        }
    }

    async deleteByUserId(userId: string) {
        try {
            const client = await this.apiClient
            const result = await client.deleteHomeworksByUserId(userId)
            HomeworkRepository.tries = 0
            return result
        } catch (e) {
            if (e && HomeworkRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const token = await new LoginRepository().login(credentials!.email!, credentials!.password!)
                SessionStoreFactory.getSessionStore().setToken(token.token)
                HomeworkRepository.tries++
                this.deleteByUserId(userId)
            } else {
                HomeworkRepository.tries = 0
                throw e
            }
        }
    }
}