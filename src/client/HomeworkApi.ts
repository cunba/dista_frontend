import axios from 'axios';
import { HomeworkFlat } from 'data/model/Homework';
import { API } from '../config/Constants';
import { SessionStoreFactory } from '../infrastructure/data/SessionStoreFactory';

export class HomeworkApi {

    constructor() { }

    async getById(id: string) {
        return axios.get(API.BASE_URL + `/homeworks?id=eq.${id}&select=*`,
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

    async getByDeadlineAndUser(deadline: Date, userId: string) {
        return axios.get(API.BASE_URL + `/homeworks?deadline=eq.${deadline}&user_id = eq.${userId}&select=*`,
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
        return axios.get(API.BASE_URL + `/homeworks?user_id=eq.${userId}&select=*`,
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
        return axios.get(API.BASE_URL + '/homeworks?&select=*',
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

    async save(homework: HomeworkFlat) {
        return axios.post(API.BASE_URL + '/homeworks',
            homework,
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

    async update(homework: HomeworkFlat, id: string) {
        return axios.put(API.BASE_URL + `/homeworks?id=eq.${id}`,
            homework,
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
        return axios.delete(API.BASE_URL + `/homeworks?id=eq.${id}`,
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