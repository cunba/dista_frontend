import { MeasureDTO } from "client/disband";
import { LoginRepository } from "data/repository/LoginRepository";
import DisbandApiClient, { DisbandApi } from "infrastructure/data/DisbandApiClient";
import { DisbandBaseRepository } from "infrastructure/data/repository/DisbandBaseRepository";
import { SessionStoreFactory } from "infrastructure/data/SessionStoreFactory";
import IAmbientNoiseApi from "../IAmbientNoiseApi";

export class AmbientNoiseRepository extends DisbandBaseRepository<IAmbientNoiseApi> {

    static tries = 0

    constructor() {
        super(DisbandApi.AmbientNoiseApi, false)
    }

    async getLast1ByDateBetweenAndDisbandId(minDate: number, maxDate: number, disbandId: string) {
        try {
            const client = await DisbandApiClient.clientFor<IAmbientNoiseApi>(DisbandApi.AmbientNoiseApi)
            const result = await client.getLast1AmbientNoiseByDateBetweenAndDisbandId(minDate, maxDate, disbandId)
            AmbientNoiseRepository.tries = 0
            return result
        } catch (e) {
            if (e && AmbientNoiseRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const token = await new LoginRepository().login(credentials!.email!, credentials!.password!)
                SessionStoreFactory.getSessionStore().setToken(token.token)
                AmbientNoiseRepository.tries++
                this.getLast1ByDateBetweenAndDisbandId(minDate, maxDate, disbandId)
            } else {
                AmbientNoiseRepository.tries = 0
                throw e
            }
        }
    }

    async getByDateBetweenAndDisbandId(minDate: number, maxDate: number, disbandId: string) {
        try {
            const client = await DisbandApiClient.clientFor<IAmbientNoiseApi>(DisbandApi.AmbientNoiseApi)
            const result = await client.getAmbientNoisesByDateBetweenAndDisbandId(minDate, maxDate, disbandId)
            AmbientNoiseRepository.tries = 0
            return result
        } catch (e) {
            if (e && AmbientNoiseRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const token = await new LoginRepository().login(credentials!.email!, credentials!.password!)
                SessionStoreFactory.getSessionStore().setToken(token.token)
                AmbientNoiseRepository.tries++
                this.getByDateBetweenAndDisbandId(minDate, maxDate, disbandId)
            } else {
                AmbientNoiseRepository.tries = 0
                throw e
            }
        }
    }

    async save(measureDTO: MeasureDTO) {
        try {
            const client = await DisbandApiClient.clientFor<IAmbientNoiseApi>(DisbandApi.AmbientNoiseApi)
            const result = await client.saveAmbientNoise(measureDTO)
            AmbientNoiseRepository.tries = 0
            return result
        } catch (e) {
            if (e && AmbientNoiseRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const token = await new LoginRepository().login(credentials!.email!, credentials!.password!)
                SessionStoreFactory.getSessionStore().setToken(token.token)
                AmbientNoiseRepository.tries++
                this.save(measureDTO)
            } else {
                AmbientNoiseRepository.tries = 0
                throw e
            }
        }
    }

    async deleteByDisbandId(disbandId: string) {
        try {
            const client = await DisbandApiClient.clientFor<IAmbientNoiseApi>(DisbandApi.AmbientNoiseApi)
            const result = await client.deleteAmbientNoisesByDisbandId(disbandId)
            AmbientNoiseRepository.tries = 0
            return result
        } catch (e) {
            if (e && AmbientNoiseRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const token = await new LoginRepository().login(credentials!.email!, credentials!.password!)
                SessionStoreFactory.getSessionStore().setToken(token.token)
                AmbientNoiseRepository.tries++
                this.deleteByDisbandId(disbandId)
            } else {
                AmbientNoiseRepository.tries = 0
                throw e
            }
        }
    }
}