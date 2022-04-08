import { COLORS } from 'config/Colors';
import React, { useState } from 'react';
import { Calendar } from 'react-native-calendars';
import { DateData } from 'react-native-calendars/src/types';
import { dateFormat } from '../../utils/datetimeFormatterHelper';

export enum Type {
    PERIOD = 'period',
    SINGLE = 'single',
    DOTTED = 'dotted'
}

export interface CalendarProps {
    markingType?: Type
    onDayPress?: (date: Date) => void
    color?: string
    textColor?: string
    daySelected?: Date
    markedDates?: any
}

export const SigningCalendar = (props?: CalendarProps) => {
    const [daySelected, setDaySelected] = useState(props?.daySelected)

    const handleDateClick = (date: DateData) => {
        if (props?.onDayPress) {
            props?.onDayPress(new Date(date.timestamp))
            setDaySelected(new Date(date.timestamp))
        }
    }

    const renderSingle = () => <Calendar
        onDayPress={handleDateClick}
        firstDay={1}
        maxDate={dateFormat(new Date(), 'YYYY-MM-DD')}
        markedDates={daySelected != undefined ? { [dateFormat(daySelected, 'YYYY-MM-DD')]: { selected: true } } : { [dateFormat(new Date(), 'YYYY-MM-DD')]: { selected: true } }}
        theme={theme}
    />


    const renderPeriod = () => <Calendar
        markingType={'period'}
        firstDay={1}
        maxDate={dateFormat(new Date(), 'YYYY-MM-DD')}
        markedDates={props?.markedDates}
        onDayPress={handleDateClick}
        theme={theme}
    />

    const renderDotted = () => <Calendar
        markingType={'period'}
        markedDates={props?.markedDates}
        onDayPress={handleDateClick}
        theme={theme}
    />

    const theme = {
        selectedDayBackgroundColor: COLORS.touchables,

        selectedDayTextColor: 'white'
    }

    const options = () => {
        switch (props?.markingType) {
            case Type.PERIOD: return renderPeriod()
            case Type.SINGLE: return renderSingle()
            case Type.DOTTED: return renderDotted()
            default: return renderSingle()
        }
    }

    return options()
}