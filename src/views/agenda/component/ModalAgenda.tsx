import React from "react"
import { Modal, View } from "react-native"
import { AddEndTimeTimetable, AddEndTimeTimetableProps } from "views/timetable/component/AddEndTimeTimetable"
import { AddStartTimeTimetable, AddStartTimeTimetableProps } from "views/timetable/component/AddStartTimeTimetable"
import { timetableStyles } from "views/timetable/TimetableStyles"
import { AddDate, AddDateProps } from "./AddDate"

export interface ModalAgendaProps {
    visible: boolean
    onRequestClose: () => void
    addDate: boolean
    addStartTime: boolean
    addEndTime: boolean
    addStartTimeProps: AddStartTimeTimetableProps
    addEndTimeProps: AddEndTimeTimetableProps
    addDateProps: AddDateProps
}

export const ModalAgenda = (props: ModalAgendaProps) => {
    return (
        <Modal animationType={'fade'} transparent={true} visible={props.visible} onRequestClose={props.onRequestClose} >
            <View style={timetableStyles.alertContainer} />
            <View style={timetableStyles.containerAdd}>
                {props.addDate ?
                    <AddDate
                        onDateChange={props.addDateProps.onDateChange}
                        onPressCancel={props.addDateProps.onPressCancel}
                        onPressOk={props.addDateProps.onPressOk}
                        startDate={props.addDateProps.startDate}
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