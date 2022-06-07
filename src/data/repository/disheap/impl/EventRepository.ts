import { EventDTO } from "client/disheap";
import { LoginRepository } from "data/repository/LoginRepository";
import DisheapApiClient, { DisheapApi } from "infrastructure/data/DisheapApiClient";
import { DisheapBaseRepository } from "infrastructure/data/repository/DisheapBaseRepository";
import { SessionStoreFactory } from "infrastructure/data/SessionStoreFactory";
import IEventApi from "../IEventApi";

export class EventRepository extends DisheapBaseRepository<IEventApi> {
    
    static tries = 0

    constructor() {
        super(DisheapApi.EventApi, false)
    }

    async getByStartDateBetweenAndUserId(minDate: number, maxDate: number, userId: string) {
        try {
            const client = await DisheapApiClient.clientFor<IEventApi>(DisheapApi.DisorderApi)
            const result = await client.getEventsByStartDateBetweenAndUserId(minDate, maxDate, userId)
            EventRepository.tries = 0
            return result
        } catch (e) {
            if (e && EventRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const token = await new LoginRepository().login(credentials!.email!, credentials!.password!)
                SessionStoreFactory.getSessionStore().setToken(token.token)
                EventRepository.tries++
                this.getByStartDateBetweenAndUserId(minDate, maxDate, userId)
            } else {
                EventRepository.tries = 0
                throw e
            }
        }
    }

    async getById(id: string) {
        try {
            const client = await DisheapApiClient.clientFor<IEventApi>(DisheapApi.DisorderApi)
            const result = await client.getEventById(id)
            EventRepository.tries = 0
            return result
        } catch (e) {
            if (e && EventRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const token = await new LoginRepository().login(credentials!.email!, credentials!.password!)
                SessionStoreFactory.getSessionStore().setToken(token.token)
                EventRepository.tries++
                this.getById(id)
            } else {
                EventRepository.tries = 0
                throw e
            }
        }
    }

    async save(eventDTO: EventDTO) {
        try {
            const client = await DisheapApiClient.clientFor<IEventApi>(DisheapApi.DisorderApi)
            const result = await client.saveEvent(eventDTO)
            EventRepository.tries = 0
            return result
        } catch (e) {
            if (e && EventRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const token = await new LoginRepository().login(credentials!.email!, credentials!.password!)
                SessionStoreFactory.getSessionStore().setToken(token.token)
                EventRepository.tries++
                this.save(eventDTO)
            } else {
                EventRepository.tries = 0
                throw e
            }
        }
    }

    async update(id: string, eventDTO: EventDTO) {
        try {
            const client = await DisheapApiClient.clientFor<IEventApi>(DisheapApi.DisorderApi)
            const result = await client.updateEvent(id, eventDTO)
            EventRepository.tries = 0
            return result
        } catch (e) {
            if (e && EventRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const token = await new LoginRepository().login(credentials!.email!, credentials!.password!)
                SessionStoreFactory.getSessionStore().setToken(token.token)
                EventRepository.tries++
                this.update(id, eventDTO)
            } else {
                EventRepository.tries = 0
                throw e
            }
        }
    }

    async delete(id: string) {
        try {
            const client = await DisheapApiClient.clientFor<IEventApi>(DisheapApi.DisorderApi)
            const result = await client.deleteEvent(id)
            EventRepository.tries = 0
            return result
        } catch (e) {
            if (e && EventRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const token = await new LoginRepository().login(credentials!.email!, credentials!.password!)
                SessionStoreFactory.getSessionStore().setToken(token.token)
                EventRepository.tries++
                this.delete(id)
            } else {
                EventRepository.tries = 0
                throw e
            }
        }
    }

    async deleteByUserId(userId: string) {
        try {
            const client = await DisheapApiClient.clientFor<IEventApi>(DisheapApi.DisorderApi)
            const result = await client.deleteEventsByUserId(userId)
            EventRepository.tries = 0
            return result
        } catch (e) {
            if (e && EventRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const token = await new LoginRepository().login(credentials!.email!, credentials!.password!)
                SessionStoreFactory.getSessionStore().setToken(token.token)
                EventRepository.tries++
                this.deleteByUserId(userId)
            } else {
                EventRepository.tries = 0
                throw e
            }
        }
    }
}