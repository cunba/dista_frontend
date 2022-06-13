import i18n from "infrastructure/localization/i18n";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import DatePicker from "react-native-date-picker";
import { timetableStyles } from "../TimetableStyles";

export interface AddStartTimeTimetableProps {
    startTime: Date
    onDateChange: (time: Date) => void
    onPressCancel: () => void
    onPressOk: () => void
}

export const AddStartTimeTimetable = (props: AddStartTimeTimetableProps) => {
    return (
        <>
            <Text style={timetableStyles.title}>{i18n.t('timetable.selectTime.start')}</Text>
            <DatePicker
                modal={false}
                date={props.startTime}
                onDateChange={props.onDateChange}
                mode={"time"}
                theme={"auto"}
                minuteInterval={5}
            />
            <View style={timetableStyles.containerOkCancel}>
                <TouchableOpacity
                    style={timetableStyles.modalCancelContainer}
                    onPress={props.onPressCancel}>
                    <Text style={timetableStyles.textButton}>{i18n.t("back")}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={timetableStyles.modalOkContainer}
                    onPress={props.onPressOk}>
                    <Text style={timetableStyles.textButton}>{i18n.t("continue")}</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}