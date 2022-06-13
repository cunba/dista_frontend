import i18n from "infrastructure/localization/i18n";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import BouncyCheckboxGroup, { ICheckboxButton } from "react-native-bouncy-checkbox-group";
import { timetableStyles } from "../TimetableStyles";

export interface AddDayTimetableProps {
    weekdays: ICheckboxButton[]
    onChange: (selectedItem: ICheckboxButton) => void
    onCloseModal: () => void
    onPressOk: () => void
}

export const AddDayTimetable = (props: AddDayTimetableProps) => {

    return (
        <>
            <Text style={timetableStyles.title}>{i18n.t('timetable.selectDay')}</Text>
            <BouncyCheckboxGroup
                data={props.weekdays}
                onChange={props.onChange}
                style={{ flexDirection: 'column' }}
            />
            <View style={timetableStyles.containerOkCancel}>
                <TouchableOpacity
                    style={timetableStyles.modalCancelContainer}
                    onPress={props.onCloseModal}>
                    <Text style={timetableStyles.textButton}>{i18n.t("cancel")}</Text>
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