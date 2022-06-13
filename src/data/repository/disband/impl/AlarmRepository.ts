import { AlarmDTO } from "client/disband";
import { LoginRepository } from "data/repository/LoginRepository";
import DisbandApiClient, { DisbandApi } from "infrastructure/data/DisbandApiClient";
import { DisbandBaseRepository } from "infrastructure/data/repository/DisbandBaseRepository";
import { SessionStoreFactory } from "infrastructure/data/SessionStoreFactory";
import IAlarmApi from "../IAlarmApi";

export class AlarmRepository extends DisbandBaseRepository<IAlarmApi> {

    static tries = 0

    constructor() {
        super(DisbandApi.AlarmApi, false)
    }

    async getByDisbandId(disbandId: string) {
        try {
            const client = await DisbandApiClient.clientFor<IAlarmApi>(DisbandApi.AlarmApi)
            const result = await client.getAlarmsByDisbandId(disbandId)
            AlarmRepository.tries = 0
            return result
        } catch (e) {
            if (e && AlarmRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const token = await new LoginRepository().login(credentials!.email!, credentials!.password!)
                SessionStoreFactory.getSessionStore().setToken(token.token)
                AlarmRepository.tries++
                this.getByDisbandId(disbandId)
            } else {
                AlarmRepository.tries = 0
                throw e
            }
        }
    }

    async getById(id: string) {
        try {
            const client = await DisbandApiClient.clientFor<IAlarmApi>(DisbandApi.AlarmApi)
            const result = await client.getAlarmById(id)
            AlarmRepository.tries = 0
            return result
        } catch (e) {
            if (e && AlarmRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const token = await new LoginRepository().login(credentials!.email!, credentials!.password!)
                SessionStoreFactory.getSessionStore().setToken(token.token)
                AlarmRepository.tries++
                this.getById(id)
            } else {
                AlarmRepository.tries = 0
                throw e
            }
        }
    }

    async save(alarmDTO: AlarmDTO) {
        try {
            const client = await DisbandApiClient.clientFor<IAlarmApi>(DisbandApi.AlarmApi)
            const result = await client.saveAlarm(alarmDTO)
            AlarmRepository.tries = 0
            return result
        } catch (e) {
            if (e && AlarmRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const token = await new LoginRepository().login(credentials!.email!, credentials!.password!)
                SessionStoreFactory.getSessionStore().setToken(token.token)
                AlarmRepository.tries++
                this.save(alarmDTO)
            } else {
                AlarmRepository.tries = 0
                throw e
            }
        }
    }

    async update(id: string, alarmDTO: AlarmDTO) {
        try {
            const client = await DisbandApiClient.clientFor<IAlarmApi>(DisbandApi.AlarmApi)
            const result = await client.updateAlarm(id, alarmDTO)
            AlarmRepository.tries = 0
            return result
        } catch (e) {
            if (e && AlarmRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const token = await new LoginRepository().login(credentials!.email!, credentials!.password!)
                SessionStoreFactory.getSessionStore().setToken(token.token)
                AlarmRepository.tries++
                this.update(id, alarmDTO)
            } else {
                AlarmRepository.tries = 0
                throw e
            }
        }
    }

    async delete(id: string) {
        try {
            const client = await DisbandApiClient.clientFor<IAlarmApi>(DisbandApi.AlarmApi)
            const result = await client.deleteAlarm(id)
            AlarmRepository.tries = 0
            return result
        } catch (e) {
            if (e && AlarmRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const token = await new LoginRepository().login(credentials!.email!, credentials!.password!)
                SessionStoreFactory.getSessionStore().setToken(token.token)
                AlarmRepository.tries++
                this.delete(id)
            } else {
                AlarmRepository.tries = 0
                throw e
            }
        }
    }

    async deleteByDisbandId(disbandId: string) {
        try {
            const client = await DisbandApiClient.clientFor<IAlarmApi>(DisbandApi.AlarmApi)
            const result = await client.deleteAlarmsByDisbandId(disbandId)
            AlarmRepository.tries = 0
            return result
        } catch (e) {
            if (e && AlarmRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const token = await new LoginRepository().login(credentials!.email!, credentials!.password!)
                SessionStoreFactory.getSessionStore().setToken(token.token)
                AlarmRepository.tries++
                this.deleteByDisbandId(disbandId)
            } else {
                AlarmRepository.tries = 0
                throw e
            }
        }
    }
}