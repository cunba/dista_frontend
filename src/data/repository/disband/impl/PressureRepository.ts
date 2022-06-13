import { MeasureDTO } from "client/disband";
import { LoginRepository } from "data/repository/LoginRepository";
import DisbandApiClient, { DisbandApi } from "infrastructure/data/DisbandApiClient";
import { DisbandBaseRepository } from "infrastructure/data/repository/DisbandBaseRepository";
import { SessionStoreFactory } from "infrastructure/data/SessionStoreFactory";
import IPressureApi from "../IPressureApi";

export class PressureRepository extends DisbandBaseRepository<IPressureApi> {

    static tries = 0

    constructor() {
        super(DisbandApi.PressureApi, false)
    }

    async getLast1ByDateBetweenAndDisbandId(minDate: number, maxDate: number, disbandId: string) {
        try {
            const client = await DisbandApiClient.clientFor<IPressureApi>(DisbandApi.PressureApi)
            const result = await client.getLast1PressureByDateBetweenAndDisbandId(minDate, maxDate, disbandId)
            PressureRepository.tries = 0
            return result
        } catch (e) {
            if (e && PressureRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const token = await new LoginRepository().login(credentials!.email!, credentials!.password!)
                SessionStoreFactory.getSessionStore().setToken(token.token)
                PressureRepository.tries++
                this.getLast1ByDateBetweenAndDisbandId(minDate, maxDate, disbandId)
            } else {
                PressureRepository.tries = 0
                throw e
            }
        }
    }

    async getByDateBetweenAndDisbandId(minDate: number, maxDate: number, disbandId: string) {
        try {
            const client = await DisbandApiClient.clientFor<IPressureApi>(DisbandApi.PressureApi)
            const result = await client.getPressuresByDateBetweenAndDisbandId(minDate, maxDate, disbandId)
            PressureRepository.tries = 0
            return result
        } catch (e) {
            if (e && PressureRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const token = await new LoginRepository().login(credentials!.email!, credentials!.password!)
                SessionStoreFactory.getSessionStore().setToken(token.token)
                PressureRepository.tries++
                this.getByDateBetweenAndDisbandId(minDate, maxDate, disbandId)
            } else {
                PressureRepository.tries = 0
                throw e
            }
        }
    }

    async save(measureDTO: MeasureDTO) {
        try {
            const client = await DisbandApiClient.clientFor<IPressureApi>(DisbandApi.PressureApi)
            const result = await client.savePressure(measureDTO)
            PressureRepository.tries = 0
            return result
        } catch (e) {
            if (e && PressureRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const token = await new LoginRepository().login(credentials!.email!, credentials!.password!)
                SessionStoreFactory.getSessionStore().setToken(token.token)
                PressureRepository.tries++
                this.save(measureDTO)
            } else {
                PressureRepository.tries = 0
                throw e
            }
        }
    }

    async deleteByDisbandId(disbandId: string) {
        try {
            const client = await DisbandApiClient.clientFor<IPressureApi>(DisbandApi.PressureApi)
            const result = await client.deletePressuresByDisbandId(disbandId)
            PressureRepository.tries = 0
            return result
        } catch (e) {
            if (e && PressureRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const token = await new LoginRepository().login(credentials!.email!, credentials!.password!)
                SessionStoreFactory.getSessionStore().setToken(token.token)
                PressureRepository.tries++
                this.deleteByDisbandId(disbandId)
            } else {
                PressureRepository.tries = 0
                throw e
            }
        }
    }
}