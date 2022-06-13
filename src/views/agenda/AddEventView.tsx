import { Toolbar, ToolbarProps } from "components/Toolbar"
import { COLORS } from "config/Colors"
import { commonStyles, formStyles } from "config/Styles"
import i18n from "infrastructure/localization/i18n"
import { FunctionalView } from "infrastructure/views/FunctionalView"
import { observer } from "mobx-react-lite"
import React, { useEffect, useState } from "react"
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from "react-native"
import { back, navigate } from "RootNavigation"
import { dateFormat, timeFormatter } from "utils/datetimeFormatterHelper"
import { signUpStyles } from "views/signUp/SignUpStyles"
import { AddEndTimeTimetableProps } from "views/timetable/component/AddEndTimeTimetable"
import { AddStartTimeTimetableProps } from "views/timetable/component/AddStartTimeTimetable"
import { AddEventViewModel } from '../../viewmodels/agenda/AddEventViewModel'
import { agendaStyles } from "./AgendaStyles"
import { AddDateProps } from "./component/AddDate"
import { ModalAgenda } from "./component/ModalAgenda"
import { useRoute } from '@react-navigation/native';
import { ROUTES } from "config/Constants"

export const AddEventView: FunctionalView<AddEventViewModel> = observer(({ vm }) => {
    const route = useRoute()
    
    const [visible, setVisible] = useState(false)
    const [addDate, setAddDate] = useState(false)
    const [addEndTime, setAddEndTime] = useState(false)
    const [addStartTime, setAddStartTime] = useState(false)
    const [dateSelected, setDateSelected] = useState(new Date())
    const [startDateSelected, setStartDateSelected] = useState(new Date())
    const [endDateSelected, setEndDateSelected] = useState(new Date())
    const [showSpinner, setShowSpinner] = useState(false)

    useEffect(() => {
        vm.setStartDate(route.params!.date)
        vm.setEndDate(route.params!.date)
        setStartDateSelected(route.params!.date)
        setDateSelected(route.params!.date)
        setEndDateSelected(route.params!.date)
    }, [route.params!.date])

    const onRequestClose = () => {
        setAddDate(false)
        setAddStartTime(false)
        setAddEndTime(false)
        setVisible(false)
    }

    const saveDate = () => {
        vm.setStartDate(startDateSelected)
        vm.setEndDate(endDateSelected)
        onRequestClose()
    }
    
    const save = async () => {
        await vm.saveEvent()
        navigate(ROUTES.AGENDA, {refresh: true})
    }

    const toolbarProps: ToolbarProps = {
        isIconLeft: true,
        iconLeft: {
            onPress: () => back(),
            name: 'left',
            type: 'AntDesign'
        },

        color: COLORS.button,
        title: i18n.t('addEvent.title').toUpperCase(),
        textStyle: commonStyles.titleToolbar,

        isIconRight: false,
    }

    const addDateProps: AddDateProps = {
        onDateChange: (date: Date) => { setDateSelected(date); setStartDateSelected(date); setEndDateSelected(date) },
        onPressCancel: () => onRequestClose(),
        onPressOk: () => { setAddDate(false); setAddStartTime(true) },
        startDate: dateSelected
    }

    const addStartTimeProps: AddStartTimeTimetableProps = {
        onDateChange: (date: Date) => { setStartDateSelected(date) },
        onPressCancel: () => { setAddStartTime(false); setAddDate(true) },
        onPressOk: () => { setAddStartTime(false); setAddEndTime(true) },
        startTime: startDateSelected
    }

    const addEndTimeProps: AddEndTimeTimetableProps = {
        onDateChange: (date: Date) => { setEndDateSelected(date) },
        onPressCancel: () => { setAddEndTime(false); setAddDate(true) },
        onPressOk: saveDate,
        endTime: endDateSelected
    }

    return (
        <>
            <Toolbar {...toolbarProps} />
            <View style={commonStyles.container}>
                <View style={signUpStyles.containerInput}>
                    <View style={[commonStyles.labelContainer, { elevation: 0.1 }]}>
                        <Text style={{ fontSize: 10 }}>{i18n.t('addEvent.name.label')}</Text>
                    </View>
                    <TextInput
                        value={vm.name}
                        autoCompleteType="off"
                        autoCorrect={false}
                        placeholder={i18n.t('addEvent.name.label')}
                        placeholderTextColor="grey"
                        onChangeText={(name: any) => vm.setName(name)}
                        style={agendaStyles.textinput}
                    />
                </View>
                <View style={[signUpStyles.containerInput, { marginTop: 10 }]}>
                    <View style={[commonStyles.labelContainer, { elevation: 0.1 }]}>
                        <Text style={{ fontSize: 10 }}>{i18n.t('addEvent.date.label')}</Text>
                    </View>
                    <TextInput
                        value={dateFormat(dateSelected, "DD/MM/YYYY") + ' ' + timeFormatter(startDateSelected.getHours(), startDateSelected.getMinutes()) + ' - ' + timeFormatter(endDateSelected.getHours(), endDateSelected.getMinutes())}
                        autoCompleteType="off"
                        autoCorrect={false}
                        placeholder={i18n.t('addEvent.date.label')}
                        placeholderTextColor="grey"
                        onChangeText={(name: any) => vm.setName(name)}
                        style={agendaStyles.textinput}
                        onTouchStart={() => { setAddDate(true); setVisible(true) }}
                    />
                </View>
                <View style={[signUpStyles.containerInput, { marginTop: 10 }]}>
                    <View style={[commonStyles.labelContainer, { elevation: 0.1 }]}>
                        <Text style={{ fontSize: 10 }}>{i18n.t('addEvent.notes.label')}</Text>
                    </View>
                    <TextInput
                        value={vm.notes}
                        autoCompleteType="off"
                        autoCorrect={false}
                        placeholder={i18n.t('addEvent.notes.label')}
                        placeholderTextColor="grey"
                        onChangeText={(notes: any) => vm.setNotes(notes)}
                        style={agendaStyles.commentInput}
                        multiline={true}
                        textAlignVertical={'top'}
                    />
                </View>

                {showSpinner ?
                    <ActivityIndicator style={commonStyles.spinner} size='large' animating={true} color={COLORS.button} />
                    :
                    <TouchableOpacity style={formStyles.button} onPress={save} >
                        <Text style={commonStyles.textButton}>{i18n.t('addEvent.save')}</Text>
                    </TouchableOpacity>
                }
            </View>
            <ModalAgenda
                addDate={addDate}
                addEndTime={addEndTime}
                addStartTime={addStartTime}
                onRequestClose={onRequestClose}
                addDateProps={addDateProps}
                addStartTimeProps={addStartTimeProps}
                addEndTimeProps={addEndTimeProps}
                visible={visible}
            />
        </>
    )
})