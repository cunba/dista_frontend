import { BaseAPI, Configuration, ConfigurationParameters } from "client/disheap"
import { NotImplementedException } from "infrastructure/exceptions/NotImplementedException"
import { SessionStoreFactory } from "./SessionStoreFactory"

export enum DisheapApi {
    DisorderApi,
    EventApi,
    HomeworkApi,
    SchoolYearApi,
    SubjectApi,
    TimetableApi,
    UserApi,
    LoginApi
}

export default class DisheapApiClient {

    private static apis = new Map<DisheapApi, BaseAPI>()

    private static mockApis = new Map<DisheapApi, BaseAPI>()

    private static clientConfig(token?: string | undefined): Configuration {
        const params: ConfigurationParameters = {}
        if (token) {
            params.apiKey = `Bearer ${token}`
            params.accessToken = token
        }
        params.headers = { "Accept": "application/json", "Content-Type": "application/json" }
        return new Configuration(params)
    }

    public static async clientFor<T>(type: DisheapApi, mock: boolean = false) {
        const api = mock ? DisheapApiClient.mockApis.get(type) : DisheapApiClient.apis.get(type)
        const constuctor = api?.constructor as any
        const token = await SessionStoreFactory.getSessionStore().getToken() ? await SessionStoreFactory.getSessionStore().getToken() : undefined
        if (constuctor) {
            return new constuctor(this.clientConfig(token!)) as T
        }
        else
            throw new NotImplementedException()
    }

    public static register(key: DisheapApi, customApi: BaseAPI, mock: boolean = false) {
        mock ? DisheapApiClient.mockApis.set(key, customApi) : DisheapApiClient.apis.set(key, customApi)
    }
}