import i18n from "infrastructure/localization/i18n";
import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import BouncyCheckboxGroup, { ICheckboxButton } from "react-native-bouncy-checkbox-group";
import DatePicker from "react-native-date-picker";
import { timetableStyles } from "../TimetableStyles";
import { AddDayTimetable, AddDayTimetableProps } from "./AddDayTimetable";
import { AddEndTimeTimetable, AddEndTimeTimetableProps } from "./AddEndTimeTimetable";
import { AddStartTimeTimetable, AddStartTimeTimetableProps } from "./AddStartTimeTimetable";

export interface ModalTimetableProps {
    addDay: boolean
    addStartTime: boolean
    addEndTime: boolean
    plus: boolean
    onRequestClose: () => void
    addDayTimetableProps: AddDayTimetableProps
    addStartTimeProps: AddStartTimeTimetableProps
    addEndTimeProps: AddEndTimeTimetableProps
}

export const ModalTimetable = (props: ModalTimetableProps) => {
    return (
        <Modal animationType={'fade'} transparent={true} visible={props.plus} onRequestClose={props.onRequestClose} >
            <View style={timetableStyles.alertContainer} />
            <View style={timetableStyles.containerAdd}>
                {props.addDay ?
                    <AddDayTimetable
                        onChange={props.addDayTimetableProps.onChange}
                        onCloseModal={props.addDayTimetableProps.onCloseModal}
                        onPressOk={props.addDayTimetableProps.onPressOk}
                        weekdays={props.addDayTimetableProps.weekdays}
                    />
                    :
                    props.addStartTime ?
                    <AddStartTimeTimetable
                        onDateChange={props.addStartTimeProps.onDateChange}
                        onPressCancel={props.addStartTimeProps.onPressCancel}
                        onPressOk={props.addStartTimeProps.onPressOk}
                        startTime={props.addStartTimeProps.startTime}
                    />
                        :
                        props.addEndTime ?
                            <AddEndTimeTimetable
                                endTime={props.addEndTimeProps.endTime}
                                onDateChange={props.addEndTimeProps.onDateChange}
                                onPressCancel={props.addEndTimeProps.onPressCancel}
                                onPressOk={props.addEndTimeProps.onPressOk}
                            />
                            :
                            null
                }
            </View>
        </Modal>
    )
}