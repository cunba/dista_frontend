import { UserModel } from "client/disheap"
import { ICredentials } from "./ICredentials"

export interface SessionStore {
    getToken(): Promise<string | undefined | null>
    setToken(token: string | undefined): void
    getCredentials(): Promise<ICredentials | undefined | null>
    setCredentials(credentials: ICredentials | undefined): void
    getUser(): Promise<UserModel | undefined>
    setUser(user: UserModel | undefined): void
    isLoggedIn(): Promise<boolean>
    setRecoverPassword(recoverPassword: string): void
    getRecoverPassword(): Promise<boolean>
  }