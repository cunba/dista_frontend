import { DisbeacDTO } from "client/disbeac";
import { LoginRepository } from "data/repository/LoginRepository";
import DisbeacApiClient, { DisbeacApi } from "infrastructure/data/DisbeacApiClient";
import { DisbeacBaseRepository } from "infrastructure/data/repository/DisbeacBaseRepository";
import { SessionStoreFactory } from "infrastructure/data/SessionStoreFactory";
import IDisbeacApi from "../IDisbeacApi";

export class DisbeacRepository extends DisbeacBaseRepository<IDisbeacApi> {

    static tries = 0

    constructor() {
        super(DisbeacApi.DisbeacApi, false)
    }

    async getByUserId(userId: string) {
        try {
            const client = await DisbeacApiClient.clientFor<IDisbeacApi>(DisbeacApi.DisbeacApi)
            const result = await client.getDisbeacsByUserId(userId)
            DisbeacRepository.tries = 0
            return result
        } catch (e) {
            if (e && DisbeacRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const token = await new LoginRepository().login(credentials!.email!, credentials!.password!)
                SessionStoreFactory.getSessionStore().setToken(token.token)
                DisbeacRepository.tries++
                this.getByUserId(userId)
            } else {
                DisbeacRepository.tries = 0
                throw e
            }
        }
    }

    async getByMac(mac: string) {
        try {
            const client = await DisbeacApiClient.clientFor<IDisbeacApi>(DisbeacApi.DisbeacApi)
            const result = await client.getDisbeacByMac(mac)
            DisbeacRepository.tries = 0
            return result
        } catch (e) {
            if (e && DisbeacRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const token = await new LoginRepository().login(credentials!.email!, credentials!.password!)
                SessionStoreFactory.getSessionStore().setToken(token.token)
                DisbeacRepository.tries++
                this.getByMac(mac)
            } else {
                DisbeacRepository.tries = 0
                throw e
            }
        }
    }

    async getById(id: string) {
        try {
            const client = await DisbeacApiClient.clientFor<IDisbeacApi>(DisbeacApi.DisbeacApi)
            const result = await client.getDisbeacById(id)
            DisbeacRepository.tries = 0
            return result
        } catch (e) {
            if (e && DisbeacRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const token = await new LoginRepository().login(credentials!.email!, credentials!.password!)
                SessionStoreFactory.getSessionStore().setToken(token.token)
                DisbeacRepository.tries++
                this.getById(id)
            } else {
                DisbeacRepository.tries = 0
                throw e
            }
        }
    }

    async save(disbeacDTO: DisbeacDTO) {
        try {
            const client = await DisbeacApiClient.clientFor<IDisbeacApi>(DisbeacApi.DisbeacApi)
            const result = await client.saveDisbeac(disbeacDTO)
            DisbeacRepository.tries = 0
            return result
        } catch (e) {
            if (e && DisbeacRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const token = await new LoginRepository().login(credentials!.email!, credentials!.password!)
                SessionStoreFactory.getSessionStore().setToken(token.token)
                DisbeacRepository.tries++
                this.save(disbeacDTO)
            } else {
                DisbeacRepository.tries = 0
                throw e
            }
        }
    }

    async update(id: string, disbeacDTO: DisbeacDTO) {
        try {
            const client = await DisbeacApiClient.clientFor<IDisbeacApi>(DisbeacApi.DisbeacApi)
            const result = await client.updateDisbeac(id, disbeacDTO)
            DisbeacRepository.tries = 0
            return result
        } catch (e) {
            if (e && DisbeacRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const token = await new LoginRepository().login(credentials!.email!, credentials!.password!)
                SessionStoreFactory.getSessionStore().setToken(token.token)
                DisbeacRepository.tries++
                this.update(id, disbeacDTO)
            } else {
                DisbeacRepository.tries = 0
                throw e
            }
        }
    }

    async updateUserId(id: string, userId: string) {
        try {
            const client = await DisbeacApiClient.clientFor<IDisbeacApi>(DisbeacApi.DisbeacApi)
            const result = await client.updateDisbeacUserId(id, userId)
            DisbeacRepository.tries = 0
            return result
        } catch (e) {
            if (e && DisbeacRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const token = await new LoginRepository().login(credentials!.email!, credentials!.password!)
                SessionStoreFactory.getSessionStore().setToken(token.token)
                DisbeacRepository.tries++
                this.updateUserId(id, userId)
            } else {
                DisbeacRepository.tries = 0
                throw e
            }
        }
    }

    async delete(id: string) {
        try {
            const client = await DisbeacApiClient.clientFor<IDisbeacApi>(DisbeacApi.DisbeacApi)
            const result = await client.deleteDisbeac(id)
            DisbeacRepository.tries = 0
            return result
        } catch (e) {
            if (e && DisbeacRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const token = await new LoginRepository().login(credentials!.email!, credentials!.password!)
                SessionStoreFactory.getSessionStore().setToken(token.token)
                DisbeacRepository.tries++
                this.delete(id)
            } else {
                DisbeacRepository.tries = 0
                throw e
            }
        }
    }

    async deleteByUserId(userId: string) {
        try {
            const client = await DisbeacApiClient.clientFor<IDisbeacApi>(DisbeacApi.DisbeacApi)
            const result = await client.deleteDisbeacsByUserId(userId)
            DisbeacRepository.tries = 0
            return result
        } catch (e) {
            if (e && DisbeacRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const token = await new LoginRepository().login(credentials!.email!, credentials!.password!)
                SessionStoreFactory.getSessionStore().setToken(token.token)
                DisbeacRepository.tries++
                this.deleteByUserId(userId)
            } else {
                DisbeacRepository.tries = 0
                throw e
            }
        }
    }
}