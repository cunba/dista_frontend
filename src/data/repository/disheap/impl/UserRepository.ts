import { PasswordChangeDTO, UserDTO } from "client/disheap";
import { LoginRepository } from "data/repository/LoginRepository";
import DisheapApiClient, { DisheapApi } from "infrastructure/data/DisheapApiClient";
import { DisheapBaseRepository } from "infrastructure/data/repository/DisheapBaseRepository";
import { SessionStoreFactory } from "infrastructure/data/SessionStoreFactory";
import IUserApi from "../IUserApi";

export class UserRepository extends DisheapBaseRepository<IUserApi> {
    
    static tries = 0

    constructor() {
        super(DisheapApi.UserApi, false)
    }

    async getByEmail(email: string) {
        try {
            const client = await DisheapApiClient.clientFor<IUserApi>(DisheapApi.UserApi)
            const result = await client.getUserByEmail(email)
            UserRepository.tries = 0
            return result
        } catch (e) {
            if (e && UserRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const token = await new LoginRepository().login(credentials!.email!, credentials!.password!)
                SessionStoreFactory.getSessionStore().setToken(token!.token)
                UserRepository.tries++
                this.getByEmail(email)
            } else {
                UserRepository.tries = 0
                throw e
            }
        }
    }

    async getById(id: string) {
        try {
            const client = await DisheapApiClient.clientFor<IUserApi>(DisheapApi.UserApi)
            const result = await client.getUserById(id)
            UserRepository.tries = 0
            return result
        } catch (e) {
            if (e && UserRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const token = await new LoginRepository().login(credentials!.email!, credentials!.password!)
                SessionStoreFactory.getSessionStore().setToken(token!.token)
                UserRepository.tries++
                this.getById(id)
            } else {
                UserRepository.tries = 0
                throw e
            }
        }
    }

    async save(userDTO: UserDTO) {
        try {
            const client = await DisheapApiClient.clientFor<IUserApi>(DisheapApi.UserApi)
            const result = await client.saveUser(userDTO)
            UserRepository.tries = 0
            return result
        } catch (e) {
            if (e && UserRepository.tries < 1) {
                UserRepository.tries++
                this.save(userDTO)
            } else {
                UserRepository.tries = 0
                throw e
            }
        }
    }

    async update(id: string, userDTO: UserDTO) {
        try {
            const client = await DisheapApiClient.clientFor<IUserApi>(DisheapApi.UserApi)
            const result = await client.updateUser(id, userDTO)
            UserRepository.tries = 0
            return result
        } catch (e) {
            if (e && UserRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const token = await new LoginRepository().login(credentials!.email!, credentials!.password!)
                SessionStoreFactory.getSessionStore().setToken(token!.token)
                UserRepository.tries++
                this.update(id, userDTO)
            } else {
                UserRepository.tries = 0
                throw e
            }
        }
    }

    async updatePassword(id: string, passwordDTO: PasswordChangeDTO) {
        try {
            const client = await DisheapApiClient.clientFor<IUserApi>(DisheapApi.UserApi)
            const result = await client.updateUserPassword(id, passwordDTO)
            UserRepository.tries = 0
            return result
        } catch (e) {
            if (e && UserRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const token = await new LoginRepository().login(credentials!.email!, credentials!.password!)
                SessionStoreFactory.getSessionStore().setToken(token!.token)
                UserRepository.tries++
                this.updatePassword(id, passwordDTO)
            } else {
                UserRepository.tries = 0
                throw e
            }
        }
    }

    async updateEmail(id: string, email: string) {
        try {
            const client = await DisheapApiClient.clientFor<IUserApi>(DisheapApi.UserApi)
            const result = await client.updateUserEmail(id, email)
            UserRepository.tries = 0
            return result
        } catch (e) {
            if (e && UserRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const token = await new LoginRepository().login(credentials!.email!, credentials!.password!)
                SessionStoreFactory.getSessionStore().setToken(token!.token)
                UserRepository.tries++
                this.updateEmail(id, email)
            } else {
                UserRepository.tries = 0
                throw e
            }
        }
    }

    async delete(id: string) {
        try {
            const client = await DisheapApiClient.clientFor<IUserApi>(DisheapApi.UserApi)
            const result = await client.deleteUser(id)
            UserRepository.tries
            return result
        } catch (e) {
            if (e && UserRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const token = await new LoginRepository().login(credentials!.email!, credentials!.password!)
                SessionStoreFactory.getSessionStore().setToken(token!.token)
                UserRepository.tries++
                this.delete(id)
            } else {
                UserRepository.tries = 0
                throw e
            }
        }
    }
}