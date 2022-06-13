import { COLORS } from "config/Colors";
import { DateInterval } from "data/model/DateInterval";
import { LocaleConfig } from "react-native-calendars";

export function hexToRgb(hex: string | undefined) {
    if (hex !== undefined) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        if (result) {
            var r = parseInt(result[1], 16);
            var g = parseInt(result[2], 16);
            var b = parseInt(result[3], 16);
            return 'rgba(' + r + "," + g + "," + b + ', 0.3)';
        }
    }
    return COLORS.background;
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

export const getDateToSearch = (date: Date) => {
    const milisecondsDay = 86400000
    const today = new Date(date.setHours(0, 0, 0, 0))

    // Day
    const minDayValue = today.getTime()
    const maxDayValue = minDayValue + milisecondsDay

    // Week
    const dayWeek = today.getDay()
    const minWeekValue = today.getTime() - milisecondsDay * dayWeek
    const maxWeekValue = minWeekValue + milisecondsDay * 7

    // Month
    const day = today.getDate()
    const minMonthValue = today.getTime() - milisecondsDay * day
    let maxMonthValue = 0

    switch (today.getMonth()) {
        case 0: case 2: case 4: case 6: case 7: case 9: case 11:
            maxMonthValue = minMonthValue + milisecondsDay * 31
            break

        case 2:
            maxMonthValue = minMonthValue + milisecondsDay * 28
            break

        case 1: case 3: case 5: case 8: case 10:
            maxMonthValue = minMonthValue + milisecondsDay * 30
            break
    }

    return new DateInterval(minDayValue, maxDayValue, minWeekValue, maxWeekValue, minMonthValue, maxMonthValue)
}