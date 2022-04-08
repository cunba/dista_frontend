import axios from 'axios';
import { SessionStoreFactory } from 'infrastructure/data/SessionStoreFactory';
import { API } from '../config/Constants'
import { EventFlat } from '../data/model/Event';

export class EventApi {

    constructor() { }

    async getById(id: string) {
        return axios.get(API.BASE_URL + `/events?id=eq.${id}&select=*`,
            {
                headers: {
                    'apikey': API.APIKEY,
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + await SessionStoreFactory.getSessionStore().getToken()
                }
            })
            .then(response => {
                return response.data
            })
            .catch(err => {
                console.log("error: \n" + err)
                return false
            })
    }

    async getByStartDateAndEndDateAndUser(startDate: Date, endDate: Date, userId: string) {
        return axios.get(API.BASE_URL + `/events?start_date=gte.${startDate}&start_date=lte.${endDate}&user_id = eq.${userId}&select=*`,
            {
                headers: {
                    'apikey': API.APIKEY,
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + await SessionStoreFactory.getSessionStore().getToken()
                }
            })
            .then(response => {
                return response.data
            })
            .catch(err => {
                console.log("error: \n" + err)
                return false
            })
    }

    async getByUser(userId: string) {
        return axios.get(API.BASE_URL + `/events?user_id=eq.${userId}&select=*`,
            {
                headers: {
                    'apikey': API.APIKEY,
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + await SessionStoreFactory.getSessionStore().getToken()
                }
            })
            .then(response => {
                return response.data
            })
            .catch(err => {
                console.log("error: \n" + err)
                return false
            })
    }

    async getAll() {
        return axios.get(API.BASE_URL + '/events?&select=*',
            {
                headers: {
                    'apikey': API.APIKEY,
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + await SessionStoreFactory.getSessionStore().getToken()
                }
            })
            .then(response => {
                return response.data
            })
            .catch(err => {
                console.log("error: \n" + err)
                return false
            })
    }

    async save(event: EventFlat) {
        return axios.post(API.BASE_URL + '/events',
            event,
            {
                headers: {
                    'apikey': API.APIKEY,
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + await SessionStoreFactory.getSessionStore().getToken()
                }
            })
            .then(response => {
                return response.data
            })
            .catch(err => {
                console.log("error: \n" + err)
                return false
            })
    }

    async update(event: EventFlat, id: string) {
        return axios.put(API.BASE_URL + `/events?id=eq.${id}`,
            event,
            {
                headers: {
                    'apikey': API.APIKEY,
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + await SessionStoreFactory.getSessionStore().getToken(),
                    'Prefer': 'return = representation'
                }
            })
            .then(response => {
                return response.data
            })
            .catch(err => {
                console.log("error: \n" + err)
                return false
            })
    }

    async delete(id: string) {
        return axios.delete(API.BASE_URL + `/events?id=eq.${id}`,
            {
                headers: {
                    'apikey': API.APIKEY,
                    'Authorization': 'Bearer ' + await SessionStoreFactory.getSessionStore().getToken()
                }
            })
            .then(response => {
                return response.data
            })
            .catch(err => {
                console.log("error: \n" + err)
                return false
            })
    }
}