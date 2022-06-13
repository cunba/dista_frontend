import { MeasureDTO } from "client/disband";
import { LoginRepository } from "data/repository/LoginRepository";
import DisbandApiClient, { DisbandApi } from "infrastructure/data/DisbandApiClient";
import { DisbandBaseRepository } from "infrastructure/data/repository/DisbandBaseRepository";
import { SessionStoreFactory } from "infrastructure/data/SessionStoreFactory";
import IHeartRateApi from "../IHeartRateApi";

export class HeartRateRepository extends DisbandBaseRepository<IHeartRateApi> {

    static tries = 0

    constructor() {
        super(DisbandApi.HeartRateApi, false)
    }

    async getLast1ByDateBetweenAndDisbandId(minDate: number, maxDate: number, disbandId: string) {
        try {
            const client = await DisbandApiClient.clientFor<IHeartRateApi>(DisbandApi.HeartRateApi)
            const result = await client.getLast1HeartRateByDateBetweenAndDisbandId(minDate, maxDate, disbandId)
            HeartRateRepository.tries = 0
            return result
        } catch (e) {
            if (e && HeartRateRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const token = await new LoginRepository().login(credentials!.email!, credentials!.password!)
                SessionStoreFactory.getSessionStore().setToken(token.token)
                HeartRateRepository.tries++
                this.getLast1ByDateBetweenAndDisbandId(minDate, maxDate, disbandId)
            } else {
                HeartRateRepository.tries = 0
                throw e
            }
        }
    }

    async getByDateBetweenAndDisbandId(minDate: number, maxDate: number, disbandId: string) {
        try {
            const client = await DisbandApiClient.clientFor<IHeartRateApi>(DisbandApi.HeartRateApi)
            const result = await client.getHeartRatesByDateBetweenAndDisbandId(minDate, maxDate, disbandId)
            HeartRateRepository.tries = 0
            return result
        } catch (e) {
            if (e && HeartRateRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const token = await new LoginRepository().login(credentials!.email!, credentials!.password!)
                SessionStoreFactory.getSessionStore().setToken(token.token)
                HeartRateRepository.tries++
                this.getByDateBetweenAndDisbandId(minDate, maxDate, disbandId)

            } else {
                HeartRateRepository.tries = 0
                throw e
            }
        }
    }

    async save(measureDTO: MeasureDTO) {
        try {
            const client = await DisbandApiClient.clientFor<IHeartRateApi>(DisbandApi.HeartRateApi)
            const result = await client.saveHeartRate(measureDTO)
            HeartRateRepository.tries = 0
            return result
        } catch (e) {
            if (e && HeartRateRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const token = await new LoginRepository().login(credentials!.email!, credentials!.password!)
                SessionStoreFactory.getSessionStore().setToken(token.token)
                HeartRateRepository.tries++
                this.save(measureDTO)
            } else {
                HeartRateRepository.tries = 0
                throw e
            }
        }
    }

    async deleteByDisbandId(disbandId: string) {
        try {
            const client = await DisbandApiClient.clientFor<IHeartRateApi>(DisbandApi.HeartRateApi)
            const result = await client.deleteHeartRatesByDisbandId(disbandId)
            HeartRateRepository.tries = 0
            return result
        } catch (e) {
            if (e && HeartRateRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const token = await new LoginRepository().login(credentials!.email!, credentials!.password!)
                SessionStoreFactory.getSessionStore().setToken(token.token)
                HeartRateRepository.tries++
                this.deleteByDisbandId(disbandId)
            } else {
                HeartRateRepository.tries = 0
                throw e
            }
        }
    }
}