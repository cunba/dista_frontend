import axios from "axios";
import { API } from "config/Constants";
import { UserFlat } from 'data/model/User';
import { SessionStoreFactory } from '../infrastructure/data/SessionStoreFactory';

export class UserApi {

    constructor() { }

    async signUp(user: UserFlat) {
        return axios.post(API.BASE_URL_USER + '/signup',
            {
                email: user.email,
                password: user.password,
                data: {
                    name: user.name,
                    surname: user.surname,
                    birthday: user.birthday,

                }
            },
            {
                headers: {
                    'apikey': API.APIKEY,
                    'Content-Type': 'application/json'
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

    async signIn(email: string, password: string) {
        return axios.post(API.BASE_URL_USER + '/token?grant_type=password',
            {
                email: email,
                password: password
            },
            {
                headers: {
                    'apikey': API.APIKEY,
                    'Content-Type': 'application/json'
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

    async passwordRecover(email: string) {
        return axios.post(API.BASE_URL_USER + '/recover',
            {
                email: email
            },
            {
                headers: {
                    'apikey': API.APIKEY,
                    'Content-Type': 'application/json'
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

    async updateUser(user: UserFlat) {
        return axios.put(API.BASE_URL_USER + '/user',
            {
                email: user.email,
                password: user.password,
                data: {
                    name: user.name,
                    surname: user.surname,
                    birthday: user.birthday,

                }
            },
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

    async getUser() {
        return axios.get(API.BASE_URL_USER + '/user',
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
}