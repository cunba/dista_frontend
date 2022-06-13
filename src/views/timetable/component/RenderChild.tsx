import i18n from "infrastructure/localization/i18n"
import React from "react"
import { Text, TouchableOpacity } from "react-native"
import { Divider } from "react-native-paper"
import { timeFormatter } from "utils/datetimeFormatterHelper"
import { getWeekDayFullString } from "utils/utils"
import { DataTimetable } from "viewmodels/TimetableViewModel"
import { timetableStyles } from "../TimetableStyles"

export interface RenderChildProps {
    item?: DataTimetable
    removeTime: DataTimetable
    onPressRemove: (item: any) => void
}

export const RenderChild = (props: RenderChildProps) => {
    const startTime = new Date(props.item!.startTime)
    const endTime = new Date(props.item!.endTime)

    return (
        <TouchableOpacity style={[timetableStyles.timesContainer, props.item === props.removeTime ? { backgroundColor: '#93B9AF' } : null]} onPress={() => props.onPressRemove(props.item)}>
            <Text>{i18n.t(getWeekDayFullString(startTime.getDay() - 1))}</Text>
            <Divider style={{ height: 2, width: '100%' }} />
            <Text>{timeFormatter(startTime.getHours(), startTime.getMinutes())}</Text>
            <Text>{timeFormatter(endTime.getHours(), endTime.getMinutes())}</Text>
        </TouchableOpacity>
    )
}