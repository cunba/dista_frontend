import { Platform } from "react-native"

export const APP = "Disheap"

export enum ROUTES {
    LOGIN = "Login",
    HOME = "Home",
    RECOVERY = "Recovery",
    SEND_EMAIL = "SendEmail",
    SIGN_UP = "SignUp",
    AGENDA = "Agenda",
    ADD_EVENT = "AddEvent",
    SHOW_EVENT = "ShowEvent",
    TIMETABLE = "Timetable",
    HOMEWORK = "Homework",
    STUDY_TIPS = "StudyTips",
    COMPLEMENTARY_THINGS = "ComplementaryThings",
    DATA = "Data",
    AMBIENT_DATA = "AmbientDataPlot",
    HEART_RATE = "HeartRatePlot"

}

export enum API {
    BASE_URL = 'https://uoyzjppprhafosltufac.supabase.co/rest/v1',
    BASE_URL_USER = 'https://uoyzjppprhafosltufac.supabase.co/auth/v1',
    APIKEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MTY3MDY0NCwiZXhwIjoxOTU3MjQ2NjQ0fQ.I2dt2qM5vBw3F0zpciAZ0Ru8ibisaDqj3x6g2EvvAeE',
    AUTHORIZATION = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MTY3MDY0NCwiZXhwIjoxOTU3MjQ2NjQ0fQ.I2dt2qM5vBw3F0zpciAZ0Ru8ibisaDqj3x6g2EvvAeE'
}

export const isAndroid = Platform.OS === 'android'
export const isiOS = !isAndroid

export const PHOTO_ALBUM_NAME = APP
export const SHARED_PREFERENCES_PACKAGE_NAME = APP.toLowerCase() + "_preferences"
export const VERSION = "0.0.1"

export const REQUEST_TRIES_LIMIT = 3
export const REQUEST_RETRY_DELAY = 60
export const RELOAD_TIMEOUT = 5000

export const MINUTES_TO_URGENT = 30
export const MAX_PHOTOS = 10