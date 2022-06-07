import { MeasureDTO } from "client/disband";
import { LoginRepository } from "data/repository/LoginRepository";
import DisbandApiClient, { DisbandApi } from "infrastructure/data/DisbandApiClient";
import { DisbandBaseRepository } from "infrastructure/data/repository/DisbandBaseRepository";
import { SessionStoreFactory } from "infrastructure/data/SessionStoreFactory";
import IOxygenApi from "../IOxygenApi";

export class OxygenRepository extends DisbandBaseRepository<IOxygenApi> {

    static tries = 0

    constructor() {
        super(DisbandApi.OxygenApi, false)
    }

    async getLast1ByDateBetweenAndDisbandId(minDate: number, maxDate: number, disbandId: string) {
        try {
            const client = await DisbandApiClient.clientFor<IOxygenApi>(DisbandApi.OxygenApi)
            const result = await client.getLast1OxygenByDateBetweenAndDisbandId(minDate, maxDate, disbandId)
            OxygenRepository.tries = 0
            return result
        } catch (e) {
            if (e && OxygenRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const token = await new LoginRepository().login(credentials!.email!, credentials!.password!)
                SessionStoreFactory.getSessionStore().setToken(token.token)
                OxygenRepository.tries++
                this.getLast1ByDateBetweenAndDisbandId(minDate, maxDate, disbandId)
            } else {
                OxygenRepository.tries = 0
                throw e
            }
        }
    }

    async getByDateBetweenAndDisbandId(minDate: number, maxDate: number, disbandId: string) {
        try {
            const client = await DisbandApiClient.clientFor<IOxygenApi>(DisbandApi.OxygenApi)
            const result = await client.getOxygensByDateBetweenAndDisbandId(minDate, maxDate, disbandId)
            OxygenRepository.tries = 0
            return result
        } catch (e) {
            if (e && OxygenRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const token = await new LoginRepository().login(credentials!.email!, credentials!.password!)
                SessionStoreFactory.getSessionStore().setToken(token.token)
                OxygenRepository.tries++
                this.getByDateBetweenAndDisbandId(minDate, maxDate, disbandId)
            } else {
                OxygenRepository.tries = 0
                throw e
            }
        }
    }

    async save(measureDTO: MeasureDTO) {
        try {
            const client = await DisbandApiClient.clientFor<IOxygenApi>(DisbandApi.OxygenApi)
            const result = await client.saveOxygen(measureDTO)
            OxygenRepository.tries = 0
            return result
        } catch (e) {
            if (e && OxygenRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const token = await new LoginRepository().login(credentials!.email!, credentials!.password!)
                SessionStoreFactory.getSessionStore().setToken(token.token)
                OxygenRepository.tries++
                this.save(measureDTO)
            } else {
                OxygenRepository.tries = 0
                throw e
            }
        }
    }

    async deleteByDisbandId(disbandId: string) {
        try {
            const client = await DisbandApiClient.clientFor<IOxygenApi>(DisbandApi.OxygenApi)
            const result = await client.deleteOxygensByDisbandId(disbandId)
            OxygenRepository.tries = 0
            return result
        } catch (e) {
            if (e && OxygenRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const token = await new LoginRepository().login(credentials!.email!, credentials!.password!)
                SessionStoreFactory.getSessionStore().setToken(token.token)
                OxygenRepository.tries++
                this.deleteByDisbandId(disbandId)
            } else {
                OxygenRepository.tries = 0
                throw e
            }
        }
    }
}