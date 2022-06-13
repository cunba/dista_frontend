import { LightningDTO } from "client/disband";
import { LoginRepository } from "data/repository/LoginRepository";
import DisbandApiClient, { DisbandApi } from "infrastructure/data/DisbandApiClient";
import { DisbandBaseRepository } from "infrastructure/data/repository/DisbandBaseRepository";
import { SessionStoreFactory } from "infrastructure/data/SessionStoreFactory";
import ILightningApi from "../ILightningApi";

export class LightningRepository extends DisbandBaseRepository<ILightningApi> {

    static tries = 0

    constructor() {
        super(DisbandApi.LightningApi, false)
    }

    async getLast1ByDateBetweenAndDisbandId(minDate: number, maxDate: number, disbandId: string) {
        try {
            const client = await DisbandApiClient.clientFor<ILightningApi>(DisbandApi.LightningApi)
            const result = await client.getLast1LightningByDateBetweenAndDisbandId(minDate, maxDate, disbandId)
            LightningRepository.tries = 0
            return result
        } catch (e) {
            if (e && LightningRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const token = await new LoginRepository().login(credentials!.email!, credentials!.password!)
                SessionStoreFactory.getSessionStore().setToken(token.token)
                LightningRepository.tries++
                this.getLast1ByDateBetweenAndDisbandId(minDate, maxDate, disbandId)
            } else {
                LightningRepository.tries = 0
                throw e
            }
        }
    }

    async getByDateBetweenAndDisbandId(minDate: number, maxDate: number, disbandId: string) {
        try {
            const client = await DisbandApiClient.clientFor<ILightningApi>(DisbandApi.LightningApi)
            const result = await client.getLightningsByDateBetweenAndDisbandId(minDate, maxDate, disbandId)
            LightningRepository.tries = 0
            return result
        } catch (e) {
            if (e && LightningRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const token = await new LoginRepository().login(credentials!.email!, credentials!.password!)
                SessionStoreFactory.getSessionStore().setToken(token.token)
                LightningRepository.tries++
                this.getByDateBetweenAndDisbandId(minDate, maxDate, disbandId)
            } else {
                LightningRepository.tries = 0
                throw e
            }
        }
    }

    async save(lightningDTO: LightningDTO) {
        try {
            const client = await DisbandApiClient.clientFor<ILightningApi>(DisbandApi.LightningApi)
            const result = await client.saveLightning(lightningDTO)
            LightningRepository.tries = 0
            return result
        } catch (e) {
            if (e && LightningRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const token = await new LoginRepository().login(credentials!.email!, credentials!.password!)
                SessionStoreFactory.getSessionStore().setToken(token.token)
                LightningRepository.tries++
                this.save(lightningDTO)
            } else {
                LightningRepository.tries = 0
                throw e
            }
        }
    }

    async deleteByDisbandId(disbandId: string) {
        try {
            const client = await DisbandApiClient.clientFor<ILightningApi>(DisbandApi.LightningApi)
            const result = await client.deleteLightningsByDisbandId(disbandId)
            LightningRepository.tries = 0
            return result
        } catch (e) {
            if (e && LightningRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const token = await new LoginRepository().login(credentials!.email!, credentials!.password!)
                SessionStoreFactory.getSessionStore().setToken(token.token)
                LightningRepository.tries++
                this.deleteByDisbandId(disbandId)
            } else {
                LightningRepository.tries = 0
                throw e
            }
        }
    }
}