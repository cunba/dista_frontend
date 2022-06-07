import { BaseAPI, Configuration, ConfigurationParameters } from "client/disbeac"
import { NotImplementedException } from "infrastructure/exceptions/NotImplementedException"
import { SessionStoreFactory } from "./SessionStoreFactory"

export enum DisbeacApi {
    DisbeacApi,
    LocationApi
}

export default class DisbeacApiClient {

    private static apis = new Map<DisbeacApi, BaseAPI>()

    private static mockApis = new Map<DisbeacApi, BaseAPI>()

    private static clientConfig(token?: string | undefined): Configuration {
        const params: ConfigurationParameters = {}
        if (token) {
            params.apiKey = `Bearer ${token}`
            params.accessToken = token
        }
        params.headers = { "Accept": "application/json", "Content-Type": "application/json" }
        return new Configuration(params)
    }

    public static async clientFor<T>(type: DisbeacApi, mock: boolean = false) {
        const api = mock ? DisbeacApiClient.mockApis.get(type) : DisbeacApiClient.apis.get(type)
        const constuctor = api?.constructor as any
        const token = await SessionStoreFactory.getSessionStore().getToken() ? await SessionStoreFactory.getSessionStore().getToken() : undefined
        if (constuctor) {
            return new constuctor(this.clientConfig(token!)) as T
        }
        else
            throw new NotImplementedException()
    }

    public static register(key: DisbeacApi, customApi: BaseAPI, mock: boolean = false) {
        mock ? DisbeacApiClient.mockApis.set(key, customApi) : DisbeacApiClient.apis.set(key, customApi)
    }
}