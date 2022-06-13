import i18n from "infrastructure/localization/i18n";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import DatePicker from "react-native-date-picker";
import { timetableStyles } from "../TimetableStyles";

export interface AddEndTimeTimetableProps {
    onPressCancel: () => void
    onPressOk: () => void
    endTime: Date
    onDateChange: (time: Date) => void
}

export const AddEndTimeTimetable = (props: AddEndTimeTimetableProps) => {
    return (
        <>
            <Text style={timetableStyles.title}>{i18n.t('timetable.selectTime.end')}</Text>
            <DatePicker
                modal={false}
                date={props.endTime}
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
                    <Text style={timetableStyles.textButton}>{i18n.t("ok")}</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}