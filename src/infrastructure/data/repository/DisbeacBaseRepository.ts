import DisbeacApiClient, { DisbeacApi } from "../DisbeacApiClient"

export class DisbeacBaseRepository<T> {

    isMocked: boolean
    api: DisbeacApi

    constructor(api: DisbeacApi, mocked: boolean) {
        this.isMocked = mocked
        this.api = api
    }

    get apiClient() {
        return DisbeacApiClient.clientFor<T>(this.api, this.isMocked)
    }
}