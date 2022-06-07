import { LoginRepository } from "data/repository/LoginRepository";
import DisheapApiClient, { DisheapApi } from "infrastructure/data/DisheapApiClient";
import { DisheapBaseRepository } from "infrastructure/data/repository/DisheapBaseRepository";
import { SessionStoreFactory } from "infrastructure/data/SessionStoreFactory";
import IDisorderApi from "../IDisorderApi";

export class DisorderRepository extends DisheapBaseRepository<IDisorderApi> {
    
    static tries = 0

    constructor() {
        super(DisheapApi.DisorderApi, false)
    }

    async getAll() {
        try {
            const client = await DisheapApiClient.clientFor<IDisorderApi>(DisheapApi.DisorderApi)
            const result = await client.getAllDisorders()
            DisorderRepository.tries = 0
            return result
        } catch (e) {
            if (e && DisorderRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const token = await new LoginRepository().login(credentials!.email!, credentials!.password!)
                SessionStoreFactory.getSessionStore().setToken(token.token)
                DisorderRepository.tries++
                this.getAll()
            } else {
                DisorderRepository.tries = 0
                throw e
            }
        }
    }

    async getById(id: string) {
        try {
            const client = await DisheapApiClient.clientFor<IDisorderApi>(DisheapApi.DisorderApi)
            const result = await client.getDisorderById(id)
            DisorderRepository.tries = 0
            return result
        } catch (e) {
            if (e && DisorderRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const token = await new LoginRepository().login(credentials!.email!, credentials!.password!)
                SessionStoreFactory.getSessionStore().setToken(token.token)
                DisorderRepository.tries++
                this.getById(id)
            } else {
                DisorderRepository.tries = 0
                throw e
            }
        }
    }
}