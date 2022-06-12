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
    HEART_RATE = "HeartRatePlot",
    OXYGEN = "OxygenPlot",
    LIGHTNING = "LightningPlot"

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