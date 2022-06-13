import { MeasureDTO } from "client/disband";
import { LoginRepository } from "data/repository/LoginRepository";
import DisbandApiClient, { DisbandApi } from "infrastructure/data/DisbandApiClient";
import { DisbandBaseRepository } from "infrastructure/data/repository/DisbandBaseRepository";
import { SessionStoreFactory } from "infrastructure/data/SessionStoreFactory";
import ITemperatureApi from "../ITemperatureApi";

export class TemperatureRepository extends DisbandBaseRepository<ITemperatureApi> {

    static tries = 0

    constructor() {
        super(DisbandApi.TemperatureApi, false)
    }

    async getLast1ByDateBetweenAndDisbandId(minDate: number, maxDate: number, disbandId: string) {
        try {
            const client = await DisbandApiClient.clientFor<ITemperatureApi>(DisbandApi.TemperatureApi)
            const result = await client.getLast1TemperatureByDateBetweenAndDisbandId(minDate, maxDate, disbandId)
            TemperatureRepository.tries = 0
            return result
        } catch (e) {
            if (e && TemperatureRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const token = await new LoginRepository().login(credentials!.email!, credentials!.password!)
                SessionStoreFactory.getSessionStore().setToken(token.token)
                TemperatureRepository.tries++
                this.getLast1ByDateBetweenAndDisbandId(minDate, maxDate, disbandId)
            } else {
                TemperatureRepository.tries = 0
                throw e
            }
        }
    }

    async getByDateBetweenAndDisbandId(minDate: number, maxDate: number, disbandId: string) {
        try {
            const client = await DisbandApiClient.clientFor<ITemperatureApi>(DisbandApi.TemperatureApi)
            const result = await client.getTemperaturesByDateBetweenAndDisbandId(minDate, maxDate, disbandId)
            TemperatureRepository.tries = 0
            return result
        } catch (e) {
            if (e && TemperatureRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const token = await new LoginRepository().login(credentials!.email!, credentials!.password!)
                SessionStoreFactory.getSessionStore().setToken(token.token)
                TemperatureRepository.tries++
                this.getByDateBetweenAndDisbandId(minDate, maxDate, disbandId)
            } else {
                TemperatureRepository.tries = 0
                throw e
            }
        }
    }

    async save(measureDTO: MeasureDTO) {
        try {
            const client = await DisbandApiClient.clientFor<ITemperatureApi>(DisbandApi.TemperatureApi)
            const result = await client.saveTemperature(measureDTO)
            TemperatureRepository.tries = 0
            return result
        } catch (e) {
            if (e && TemperatureRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const token = await new LoginRepository().login(credentials!.email!, credentials!.password!)
                SessionStoreFactory.getSessionStore().setToken(token.token)
                TemperatureRepository.tries++
                this.save(measureDTO)
            } else {
                TemperatureRepository.tries = 0
                throw e
            }
        }
    }

    async deleteByDisbandId(disbandId: string) {
        try {
            const client = await DisbandApiClient.clientFor<ITemperatureApi>(DisbandApi.TemperatureApi)
            const result = await client.deleteTemperaturesByDisbandId(disbandId)
            TemperatureRepository.tries = 0
            return result
        } catch (e) {
            if (e && TemperatureRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const token = await new LoginRepository().login(credentials!.email!, credentials!.password!)
                SessionStoreFactory.getSessionStore().setToken(token.token)
                TemperatureRepository.tries++
                this.deleteByDisbandId(disbandId)
            } else {
                TemperatureRepository.tries = 0
                throw e
            }
        }
    }
}