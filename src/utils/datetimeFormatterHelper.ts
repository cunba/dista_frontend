import Moment from 'moment';
import 'moment/locale/es'
import { LocaleConfig } from 'react-native-calendars';


export const dateFormat = (date: Date, format: string = 'YYYY-MM-DD') => {
    return Moment.utc(date.toUTCString()).format(format)
}

export const getDateParse = (date: Date) => {
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    return year + '-' + month + '-' + day;
}

export const timeFormatter = (hour: number, minutes: number) => {
    return (hour < 10 ? `0${hour}` : `${hour}`) + ":" + (minutes < 10 ? `0${minutes}` : `${minutes}`)
}

export const timeDifferenceIn = (unit: "minutes" | "hours" | "days", from: string, to: string) => {
    Moment.locale("es")
    const moment1 = Moment(to, "HH:mm")
    const moment2 = Moment(from, "HH:mm")
    const difference = moment1.diff(moment2, unit ? unit : "minutes")
    return difference
}

export const timeDifferenceUnixDate = (unit: "minutes" | "hours" | "days", from: string, to: string) => {
    Moment.locale("es")
    const moment1 = Moment(to, 'x')
    const moment2 = Moment(from, 'x')
    const difference = moment1.diff(moment2, unit ? unit : "minutes", true)
    return difference
}

export const now = (format?: string) => {
    Moment.locale("es")
    return Moment.utc(new Date().toUTCString()).format(format ? format : "DD/MM/yyyy HH:mm:ss")
}

export const dateFormatter = (day: number, month: number, year: number) => {
    let date = new Date()
    date.setFullYear(year, month - 1, day)
    return Moment.utc(new Date().toUTCString()).format("DD/MM/yyyy");
}


export const parseDate = (year?: number, month?: number, day?: number, hour?: number, minutes?: number, seconds?: number) => {
    const date = new Date()
    if (year && month && day) {
        date.setFullYear(year, month - 1, day)
        if (hour) date.setHours(hour, minutes ? minutes : 0, seconds ? seconds : 0)
        return date?.toUTCString()
    }
    return undefined
}


export const dateFromString = (text: string): Date => {
    const date = new Date()
    date.setTime(Date.parse(text))
    return date
}

export const localTimeString = (date: Date): string => {
    return date.getHours().toString().padStart(2, '0') + ':' + date.getMinutes().toString().padStart(2, '0')
}

export const getWeekDayString = (weekDay: number): string => {
    switch (weekDay) {
        case 0:
            return "MON"
        case 1:
            return "TUE"
        case 2:
            return "WED"
        case 3:
            return "THU"
        case 4:
            return "FRI"
        case 5:
            return "SAT"
        case 6:
            return "SUN"

        default:
            return "SUN"
    }
}

export const getWeekDayFullString = (weekDay: number): string => {
    switch (weekDay) {
        case 0:
            return "monday"
        case 1:
            return "tuesday"
        case 2:
            return "wednesday"
        case 3:
            return "thursday"
        case 4:
            return "friday"
        case 5:
            return "saturday"
        case 6:
            return "sunday"

        default:
            return "monday"
    }
}

export const getMonthText = (date: Date) => {
    switch (date.getMonth()) {
        case 0:
            return LocaleConfig.locales[LocaleConfig.defaultLocale].monthNames![0]
        case 1:
            return LocaleConfig.locales[LocaleConfig.defaultLocale].monthNames![1]
        case 2:
            return LocaleConfig.locales[LocaleConfig.defaultLocale].monthNames![2]
        case 3:
            return LocaleConfig.locales[LocaleConfig.defaultLocale].monthNames![3]
        case 4:
            return LocaleConfig.locales[LocaleConfig.defaultLocale].monthNames![4]
        case 5:
            return LocaleConfig.locales[LocaleConfig.defaultLocale].monthNames![5]
        case 6:
            return LocaleConfig.locales[LocaleConfig.defaultLocale].monthNames![6]
        case 7:
            return LocaleConfig.locales[LocaleConfig.defaultLocale].monthNames![7]
        case 8:
            return LocaleConfig.locales[LocaleConfig.defaultLocale].monthNames![8]
        case 9:
            return LocaleConfig.locales[LocaleConfig.defaultLocale].monthNames![9]
        case 10:
            return LocaleConfig.locales[LocaleConfig.defaultLocale].monthNames![10]
        case 11:
            return LocaleConfig.locales[LocaleConfig.defaultLocale].monthNames![11]
    }
}