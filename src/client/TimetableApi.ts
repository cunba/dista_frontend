import axios from 'axios';
import { API } from '../config/Constants';
import { TimetableFlat } from '../data/model/Timetable';
import { SessionStoreFactory } from '../infrastructure/data/SessionStoreFactory';

export class TimetableApi {

    constructor() { }

    async getById(id: string) {
        return axios.get(API.BASE_URL + `/timetables?id=eq.${id}&select=*`,
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

    async getByWeekDayAndUser(weekDay: number, userId: string) {
        return axios.get(API.BASE_URL + `/timetables?week_day=eq.${weekDay}&user_id = eq.${userId}&select=*`,
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
        return axios.get(API.BASE_URL + `/timetables?user_id=eq.${userId}&select=*`,
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
        return axios.get(API.BASE_URL + '/timetables?&select=*',
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

    async save(timetable: TimetableFlat) {
        return axios.post(API.BASE_URL + '/timetables',
            timetable,
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

    async update(timetable: TimetableFlat, id: string) {
        return axios.put(API.BASE_URL + `/timetables?id=eq.${id}`,
            timetable,
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
        return axios.delete(API.BASE_URL + `/timetables?id=eq.${id}`,
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