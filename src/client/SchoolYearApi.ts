import axios from 'axios';
import { API } from '../config/Constants'

export class SchoolYearApi {

    constructor() { }

    async getById(id: string) {
        return axios.get(API.BASE_URL + `/school_years?id=eq.${id}&select=*`,
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

    async getByStudyId(studyId: string) {
        return axios.get(API.BASE_URL + `/school_years?study_id=eq.${studyId}&select=*`,
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
        return axios.get(API.BASE_URL + `/school_years?&select=*`,
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