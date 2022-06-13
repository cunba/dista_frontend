import { DisbandDTO } from "client/disband";
import { LoginRepository } from "data/repository/LoginRepository";
import DisbandApiClient, { DisbandApi } from "infrastructure/data/DisbandApiClient";
import { DisbandBaseRepository } from "infrastructure/data/repository/DisbandBaseRepository";
import { SessionStoreFactory } from "infrastructure/data/SessionStoreFactory";
import IDisbandApi from "../IDisbandApi";

export class DisbandRepository extends DisbandBaseRepository<IDisbandApi> {

    static tries = 0

    constructor() {
        super(DisbandApi.DisbandApi, false)
    }

    async getByUserId(userId: string) {
        try {
            const client = await DisbandApiClient.clientFor<IDisbandApi>(DisbandApi.DisbandApi)
            const result = await client.getDisbandsByUserId(userId)
            DisbandRepository.tries = 0
            return result
        } catch (e) {
            if (e && DisbandRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const token = await new LoginRepository().login(credentials!.email!, credentials!.password!)
                SessionStoreFactory.getSessionStore().setToken(token.token)
                DisbandRepository.tries++
                this.getByUserId(userId)
            } else {
                DisbandRepository.tries = 0
                throw e
            }
        }
    }

    async getByMac(mac: string) {
        try {
            const client = await DisbandApiClient.clientFor<IDisbandApi>(DisbandApi.DisbandApi)
            const result = await client.getDisbandByMac(mac)
            DisbandRepository.tries = 0
            return result
        } catch (e) {
            if (e && DisbandRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const token = await new LoginRepository().login(credentials!.email!, credentials!.password!)
                SessionStoreFactory.getSessionStore().setToken(token.token)
                DisbandRepository.tries++
                this.getByMac(mac)
            } else {
                DisbandRepository.tries = 0
                throw e
            }
        }
    }

    async getById(id: string) {
        try {
            const client = await DisbandApiClient.clientFor<IDisbandApi>(DisbandApi.DisbandApi)
            const result = await client.getDisbandById(id)
            DisbandRepository.tries = 0
            return result
        } catch (e) {
            if (e && DisbandRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const token = await new LoginRepository().login(credentials!.email!, credentials!.password!)
                SessionStoreFactory.getSessionStore().setToken(token.token)
                DisbandRepository.tries++
                this.getById(id)
            } else {
                DisbandRepository.tries = 0
                throw e
            }
        }
    }

    async save(disbandDTO: DisbandDTO) {
        try {
            const client = await DisbandApiClient.clientFor<IDisbandApi>(DisbandApi.DisbandApi)
            const result = await client.saveDisband(disbandDTO)
            DisbandRepository.tries = 0
            return result
        } catch (e) {
            if (e && DisbandRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const token = await new LoginRepository().login(credentials!.email!, credentials!.password!)
                SessionStoreFactory.getSessionStore().setToken(token.token)
                DisbandRepository.tries++
                this.save(disbandDTO)
            } else {
                DisbandRepository.tries = 0
                throw e
            }
        }
    }

    async update(id: string, disbandDTO: DisbandDTO) {
        try {
            const client = await DisbandApiClient.clientFor<IDisbandApi>(DisbandApi.DisbandApi)
            const result = await client.updateDisband(id, disbandDTO)
            DisbandRepository.tries = 0
            return result
        } catch (e) {
            if (e && DisbandRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const token = await new LoginRepository().login(credentials!.email!, credentials!.password!)
                SessionStoreFactory.getSessionStore().setToken(token.token)
                DisbandRepository.tries++
                this.update(id, disbandDTO)
            } else {
                DisbandRepository.tries = 0
                throw e
            }
        }
    }

    async updateUserId(id: string, userId: string) {
        try {
            const client = await DisbandApiClient.clientFor<IDisbandApi>(DisbandApi.DisbandApi)
            const result = await client.updateDisbandUserId(id, userId)
            DisbandRepository.tries = 0
            return result
        } catch (e) {
            if (e && DisbandRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const token = await new LoginRepository().login(credentials!.email!, credentials!.password!)
                SessionStoreFactory.getSessionStore().setToken(token.token)
                DisbandRepository.tries++
                this.updateUserId(id, userId)
            } else {
                DisbandRepository.tries = 0
                throw e
            }
        }
    }

    async delete(id: string) {
        try {
            const client = await DisbandApiClient.clientFor<IDisbandApi>(DisbandApi.DisbandApi)
            const result = await client.deleteDisband(id)
            DisbandRepository.tries = 0
            return result
        } catch (e) {
            if (e && DisbandRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const token = await new LoginRepository().login(credentials!.email!, credentials!.password!)
                SessionStoreFactory.getSessionStore().setToken(token.token)
                DisbandRepository.tries++
                this.delete(id)
            } else {
                DisbandRepository.tries = 0
                throw e
            }
        }
    }

    async deleteByUserId(userId: string) {
        try {
            const client = await DisbandApiClient.clientFor<IDisbandApi>(DisbandApi.DisbandApi)
            const result = await client.deleteDisbandsByUserId(userId)
            DisbandRepository.tries = 0
            return result
        } catch (e) {
            if (e && DisbandRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const token = await new LoginRepository().login(credentials!.email!, credentials!.password!)
                SessionStoreFactory.getSessionStore().setToken(token.token)
                DisbandRepository.tries++
                this.deleteByUserId(userId)
            } else {
                DisbandRepository.tries = 0
                throw e
            }
        }
    }
}