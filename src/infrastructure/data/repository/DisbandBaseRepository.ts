import DisbandApiClient, { DisbandApi } from "../DisbandApiClient"

export class DisbandBaseRepository<T> {

    isMocked: boolean
    api: DisbandApi

    constructor(api: DisbandApi, mocked: boolean) {
        this.isMocked = mocked
        this.api = api
    }

    get apiClient() {
        return DisbandApiClient.clientFor<T>(this.api, this.isMocked)
    }
}