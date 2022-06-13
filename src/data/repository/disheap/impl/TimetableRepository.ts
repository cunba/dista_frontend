import { TimetableDTO } from "client/disheap";
import { LoginRepository } from "data/repository/LoginRepository";
import DisheapApiClient, { DisheapApi } from "infrastructure/data/DisheapApiClient";
import { DisheapBaseRepository } from "infrastructure/data/repository/DisheapBaseRepository";
import { SessionStoreFactory } from "infrastructure/data/SessionStoreFactory";
import ITimetableApi from "../ITimetableApi";

export class TimetableRepository extends DisheapBaseRepository<ITimetableApi> {
    static tries = 0

    constructor() {
        super(DisheapApi.TimetableApi, false)
    }

    async getByUserId(userId: string) {
        try {
            const client = await DisheapApiClient.clientFor<ITimetableApi>(DisheapApi.DisorderApi)
            const result = await client.getTimetablesByUserId(userId)
            return result
        } catch (e) {
            if (e && TimetableRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const token = await new LoginRepository().login(credentials!.email!, credentials!.password!)
                SessionStoreFactory.getSessionStore().setToken(token.token)
                TimetableRepository.tries++
                this.getByUserId(userId)
            } else {
                TimetableRepository.tries = 0
                throw e
            }
        }
    }

    async getById(id: string) {
        try {
            const client = await DisheapApiClient.clientFor<ITimetableApi>(DisheapApi.DisorderApi)
            const result = await client.getTimetableById(id)
            TimetableRepository.tries = 0
            return result
        } catch (e) {
            if (e && TimetableRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const token = await new LoginRepository().login(credentials!.email!, credentials!.password!)
                SessionStoreFactory.getSessionStore().setToken(token.token)
                TimetableRepository.tries++
                this.getById(id)
            } else {
                TimetableRepository.tries = 0
                throw e
            }
        }
    }

    async save(timetableDTO: TimetableDTO) {
        try {
            const client = await DisheapApiClient.clientFor<ITimetableApi>(DisheapApi.DisorderApi)
            const result = await client.saveTimetable(timetableDTO)
            TimetableRepository.tries = 0
            return result
        } catch (e) {
            if (e && TimetableRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const token = await new LoginRepository().login(credentials!.email!, credentials!.password!)
                SessionStoreFactory.getSessionStore().setToken(token.token)
                TimetableRepository.tries++
                this.save(timetableDTO)
            } else {
                TimetableRepository.tries = 0
                throw e
            }
        }
    }

    async update(id: string, timetableDTO: TimetableDTO) {
        try {
            const client = await DisheapApiClient.clientFor<ITimetableApi>(DisheapApi.DisorderApi)
            const result = await client.updateTimetable(id, timetableDTO)
            TimetableRepository.tries = 0
            return result
        } catch (e) {
            if (e && TimetableRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const token = await new LoginRepository().login(credentials!.email!, credentials!.password!)
                SessionStoreFactory.getSessionStore().setToken(token.token)
                TimetableRepository.tries++
                this.update(id, timetableDTO)
            } else {
                TimetableRepository.tries = 0
                throw e
            }
        }
    }

    async delete(id: string) {
        try {
            const client = await DisheapApiClient.clientFor<ITimetableApi>(DisheapApi.DisorderApi)
            const result = await client.deleteTimetable(id)
            TimetableRepository.tries = 0
            return result
        } catch (e) {
            if (e && TimetableRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const token = await new LoginRepository().login(credentials!.email!, credentials!.password!)
                SessionStoreFactory.getSessionStore().setToken(token.token)
                TimetableRepository.tries++
                this.delete(id)
            } else {
                TimetableRepository.tries = 0
                throw e
            }
        }
    }

    async deleteByUserId(userId: string) {
        try {
            const client = await DisheapApiClient.clientFor<ITimetableApi>(DisheapApi.DisorderApi)
            const result = await client.deleteTimetablesByUserId(userId)
            TimetableRepository.tries = 0
            return result
        } catch (e) {
            if (e && TimetableRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const token = await new LoginRepository().login(credentials!.email!, credentials!.password!)
                SessionStoreFactory.getSessionStore().setToken(token.token)
                TimetableRepository.tries++
                this.deleteByUserId(userId)
            } else {
                TimetableRepository.tries = 0
                throw e
            }
        }
    }
}