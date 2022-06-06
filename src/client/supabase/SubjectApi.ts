import axios from 'axios';
import { API } from '../config/Constants'

export class SubjectApi {

    constructor() { }

    async getById(id: string) {
        return axios.get(API.BASE_URL + `/subjects?id=eq.${id}&select=*`,
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

    async getByName(name: string) {
        return axios.get(API.BASE_URL + `/subjects?name=eq.${name}&select=*`,
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

    async getBySchoolYearId(schoolYearId: string) {
        return axios.get(API.BASE_URL + `/subjects?school_year_id=eq.${schoolYearId}&select=*`,
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
        return axios.get(API.BASE_URL + `/subjects?&select=*`,
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