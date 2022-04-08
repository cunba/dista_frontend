import axios from 'axios';
import { API } from '../config/Constants'

export class EventTypeApi {

    constructor() { }

    async getById(id: string) {
        return axios.get(API.BASE_URL + `/events_type?id=eq.${id}&select=*`,
            {
                headers: {
                    'apikey': API.APIKEY,
                    'Content-Type': 'application/json',
                    'Authorization': API.AUTHORIZATION
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
        return axios.get(API.BASE_URL + `/events_type?&select=*`,
            {
                headers: {
                    'apikey': API.APIKEY,
                    'Content-Type': 'application/json',
                    'Authorization': API.AUTHORIZATION
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