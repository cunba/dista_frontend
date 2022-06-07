import { MeasureDTO } from "client/disband";
import { LoginRepository } from "data/repository/LoginRepository";
import DisbandApiClient, { DisbandApi } from "infrastructure/data/DisbandApiClient";
import { DisbandBaseRepository } from "infrastructure/data/repository/DisbandBaseRepository";
import { SessionStoreFactory } from "infrastructure/data/SessionStoreFactory";
import IHumidityApi from "../IHumidityApi";

export class HumidityRepository extends DisbandBaseRepository<IHumidityApi> {

    static tries = 0

    constructor() {
        super(DisbandApi.HumidityApi, false)
    }

    async getLast1ByDateBetweenAndDisbandId(minDate: number, maxDate: number, disbandId: string) {
        try {
            const client = await DisbandApiClient.clientFor<IHumidityApi>(DisbandApi.HumidityApi)
            const result = await client.getLast1HumidityByDateBetweenAndDisbandId(minDate, maxDate, disbandId)
            HumidityRepository.tries = 0
            return result
        } catch (e) {
            if (e && HumidityRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const token = await new LoginRepository().login(credentials!.email!, credentials!.password!)
                SessionStoreFactory.getSessionStore().setToken(token.token)
                HumidityRepository.tries++
                this.getLast1ByDateBetweenAndDisbandId(minDate, maxDate, disbandId)
            } else {
                HumidityRepository.tries = 0
                throw e
            }
        }
    }

    async getByDateBetweenAndDisbandId(minDate: number, maxDate: number, disbandId: string) {
        try {
            const client = await DisbandApiClient.clientFor<IHumidityApi>(DisbandApi.HumidityApi)
            const result = await client.getHumiditiesByDateBetweenAndDisbandId(minDate, maxDate, disbandId)
            HumidityRepository.tries = 0
            return result
        } catch (e) {
            if (e && HumidityRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const token = await new LoginRepository().login(credentials!.email!, credentials!.password!)
                SessionStoreFactory.getSessionStore().setToken(token.token)
                HumidityRepository.tries++
                this.getByDateBetweenAndDisbandId(minDate, maxDate, disbandId)
            } else {
                HumidityRepository.tries = 0
                throw e
            }
        }
    }

    async save(measureDTO: MeasureDTO) {
        try {
            const client = await DisbandApiClient.clientFor<IHumidityApi>(DisbandApi.HumidityApi)
            const result = await client.saveHumidity(measureDTO)
            HumidityRepository.tries = 0
            return result
        } catch (e) {
            if (e && HumidityRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const token = await new LoginRepository().login(credentials!.email!, credentials!.password!)
                SessionStoreFactory.getSessionStore().setToken(token.token)
                HumidityRepository.tries++
                this.save(measureDTO)
            } else {
                HumidityRepository.tries = 0
                throw e
            }
        }
    }

    async deleteByDisbandId(disbandId: string) {
        try {
            const client = await DisbandApiClient.clientFor<IHumidityApi>(DisbandApi.HumidityApi)
            const result = await client.deleteHumiditiesByDisbandId(disbandId)
            HumidityRepository.tries = 0
            return result
        } catch (e) {
            if (e && HumidityRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const token = await new LoginRepository().login(credentials!.email!, credentials!.password!)
                SessionStoreFactory.getSessionStore().setToken(token.token)
                HumidityRepository.tries++
                this.deleteByDisbandId(disbandId)
            } else {
                HumidityRepository.tries = 0
                throw e
            }
        }
    }
}