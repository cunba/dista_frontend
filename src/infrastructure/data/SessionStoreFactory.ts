import AsyncStorage from "@react-native-async-storage/async-storage";
import { Disband } from "client/disband/models/Disband";
import { UserModel } from 'client/disheap/models/UserModel';
import { ICredentials } from './ICredentials';
import { SessionStore } from './ISessionStore';

export enum SessionStoreType {
  SessionAsyncStorage, ContextStorage, LocalStorage, SessionStorage
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
    getCredentials: async () => {
      const credentials = await AsyncStorage.getItem("credentials")
      if (credentials)
        return JSON.parse(credentials)
      return undefined
    },
    setCredentials: (credentials: ICredentials | undefined) => {
      credentials ? AsyncStorage.setItem("credentials", JSON.stringify(credentials)) : AsyncStorage.removeItem("credentials")
    },
    getUser: async () => {
      const user = await AsyncStorage.getItem("user")
      if (user)
        return JSON.parse(user)
      return undefined
    },
    setUser: (user: UserModel | undefined) => {
      user ? AsyncStorage.setItem("user", JSON.stringify(user)) : AsyncStorage.removeItem("user")
    },
    getDisband: async () => {
      const disband = await AsyncStorage.getItem("disband")
      if (disband)
        return JSON.parse(disband)
      return undefined
    },
    setDisband: (disband: Disband) => {
      disband ? AsyncStorage.setItem("disband", JSON.stringify(disband)) : AsyncStorage.removeItem("disband")
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