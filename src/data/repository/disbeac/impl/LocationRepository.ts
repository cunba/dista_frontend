import { LocationDTO } from "client/disbeac";
import { LoginRepository } from "data/repository/LoginRepository";
import DisbeacApiClient, { DisbeacApi } from "infrastructure/data/DisbeacApiClient";
import { DisbeacBaseRepository } from "infrastructure/data/repository/DisbeacBaseRepository";
import { SessionStoreFactory } from "infrastructure/data/SessionStoreFactory";
import ILocationApi from "../ILocationApi";

export class LocationRepository extends DisbeacBaseRepository<ILocationApi> {

    static tries = 0

    constructor() {
        super(DisbeacApi.LocationApi, false)
    }

    async getLast1ByDateBetweenAndDisbeacId(minDate: number, maxDate: number, disbeacId: string) {
        try {
            const client = await DisbeacApiClient.clientFor<ILocationApi>(DisbeacApi.LocationApi)
            const result = await client.getLast1LocationByDateBetweenAndDisbeacId(minDate, maxDate, disbeacId)
            LocationRepository.tries = 0
            return result
        } catch (e) {
            if (e && LocationRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const token = await new LoginRepository().login(credentials!.email!, credentials!.password!)
                SessionStoreFactory.getSessionStore().setToken(token.token)
                LocationRepository.tries++
                this.getLast1ByDateBetweenAndDisbeacId(minDate, maxDate, disbeacId)
            } else {
                LocationRepository.tries = 0
                throw e
            }
        }
    }

    async getByDateBetweenAndDisbeacId(minDate: number, maxDate: number, disbeacId: string) {
        try {
            const client = await DisbeacApiClient.clientFor<ILocationApi>(DisbeacApi.LocationApi)
            const result = await client.getLocationsByDateBetweenAndDisbeacId(minDate, maxDate, disbeacId)
            LocationRepository.tries = 0
            return result
        } catch (e) {
            if (e && LocationRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const token = await new LoginRepository().login(credentials!.email!, credentials!.password!)
                SessionStoreFactory.getSessionStore().setToken(token.token)
                LocationRepository.tries++
                this.getByDateBetweenAndDisbeacId(minDate, maxDate, disbeacId)
            } else {
                LocationRepository.tries = 0
                throw e
            }
        }
    }

    async save(locationDTO: LocationDTO) {
        try {
            const client = await DisbeacApiClient.clientFor<ILocationApi>(DisbeacApi.LocationApi)
            const result = await client.saveLocation(locationDTO)
            LocationRepository.tries = 0
            return result
        } catch (e) {
            if (e && LocationRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const token = await new LoginRepository().login(credentials!.email!, credentials!.password!)
                SessionStoreFactory.getSessionStore().setToken(token.token)
                LocationRepository.tries++
                this.save(locationDTO)
            } else {
                LocationRepository.tries = 0
                throw e
            }
        }
    }

    async deleteByDisbeacId(disbeacId: string) {
        try {
            const client = await DisbeacApiClient.clientFor<ILocationApi>(DisbeacApi.LocationApi)
            const result = await client.deleteLocationsByDisbeacId(disbeacId)
            LocationRepository.tries = 0
            return result
        } catch (e) {
            if (e && LocationRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const token = await new LoginRepository().login(credentials!.email!, credentials!.password!)
                SessionStoreFactory.getSessionStore().setToken(token.token)
                LocationRepository.tries++
                this.deleteByDisbeacId(disbeacId)
            } else {
                LocationRepository.tries = 0
                throw e
            }
        }
    }
}