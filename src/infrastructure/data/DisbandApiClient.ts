import { BaseAPI, Configuration, ConfigurationParameters } from "client/disband"
import { NotImplementedException } from "infrastructure/exceptions/NotImplementedException"
import { SessionStoreFactory } from "./SessionStoreFactory"

export enum DisbandApi {
    AlarmApi,
    AmbientNoiseApi,
    DisbandApi,
    HeartRateApi,
    HumidityApi,
    LightningApi,
    OxygenApi,
    PressureApi,
    TemperatureApi
}

export default class DisbandApiClient {

    private static apis = new Map<DisbandApi, BaseAPI>()

    private static mockApis = new Map<DisbandApi, BaseAPI>()

    private static clientConfig(token?: string | undefined): Configuration {
        const params: ConfigurationParameters = {}
        if (token) {
            params.apiKey = `Bearer ${token}`
            params.accessToken = token
        }
        params.headers = { "Accept": "application/json", "Content-Type": "application/json" }
        return new Configuration(params)
    }

    public static async clientFor<T>(type: DisbandApi, mock: boolean = false) {
        const api = mock ? DisbandApiClient.mockApis.get(type) : DisbandApiClient.apis.get(type)
        const constuctor = api?.constructor as any
        const token = await SessionStoreFactory.getSessionStore().getToken() ? await SessionStoreFactory.getSessionStore().getToken() : undefined
        if (constuctor) {
            return new constuctor(this.clientConfig(token!)) as T
        }
        else
            throw new NotImplementedException()
    }

    public static register(key: DisbandApi, customApi: BaseAPI, mock: boolean = false) {
        mock ? DisbandApiClient.mockApis.set(key, customApi) : DisbandApiClient.apis.set(key, customApi)
    }
}