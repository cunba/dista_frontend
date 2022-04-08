import { NotImplementedException } from '../exceptions/NotImplementedException';
import AsyncStorage from "@react-native-async-storage/async-storage";

export enum SessionStoreType {
  SessionAsyncStorage, ContextStorage, LocalStorage, SessionStorage
}

export interface ICredentials {
  name: string,
  surname: string,
  birthday: string,
  schoolYearId: string,
  disorderId: string,
  email: string,
  password: string
}

export interface SessionStore {
  getToken(): Promise<string | undefined | null>
  setToken(token: string | undefined): void
  getUser(): Promise<ICredentials | undefined | null>
  setUser(user: ICredentials | undefined): void
  isLoggedIn(): Promise<boolean>
  setRecoverPassword(recoverPassword: string): void
  getRecoverPassword(): Promise<boolean>
}

export class SessionStoreFactory {

  private static type: SessionStoreType = SessionStoreType.SessionAsyncStorage

  public static getSessionStore() {
    switch (SessionStoreFactory.type) {
      case SessionStoreType.SessionAsyncStorage:
      default:
        return sessionAsyncStorage()
    }
  }
}

export interface SessionStoreProps {
  user?: any
  token?: string
  currentPath?: string
}

const sessionAsyncStorage = (): SessionStore => {

  const sessionStore: SessionStore = {
    getToken: async () => {
      return await AsyncStorage.getItem("token")
    },
    setToken: (token: string) => {
      AsyncStorage.setItem("token", token)
    },
    getUser: async () => {
      const user = await AsyncStorage.getItem("user")
      if (user)
        return JSON.parse(user)
      return undefined
    },
    setUser: (user: ICredentials | undefined) => {
      user ? AsyncStorage.setItem("user", JSON.stringify(user)) : AsyncStorage.removeItem("user")
    },
    isLoggedIn: async () => {
      const logged = await AsyncStorage.getItem("token")
      return logged && logged.length > 0 ? true : false
    },
    setRecoverPassword: (recoverPassword: string) => {
      AsyncStorage.setItem("recoverPassword", recoverPassword);
    },
    getRecoverPassword: async () => {
      const recoverPassword = await AsyncStorage.getItem("recoverPassword")
      return recoverPassword === 'true'
    }
  }
  return sessionStore
}