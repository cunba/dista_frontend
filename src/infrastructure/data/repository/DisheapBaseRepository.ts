import DisheapApiClient, { DisheapApi } from "../DisheapApiClient"

export class DisheapBaseRepository<T> {

    isMocked: boolean
    api: DisheapApi

    constructor(api: DisheapApi, mocked: boolean) {
        this.isMocked = mocked
        this.api = api
    }

    get apiClient() {
        return DisheapApiClient.clientFor<T>(this.api, this.isMocked)
    }
}