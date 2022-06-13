import { DrawerActions } from "@react-navigation/native";
import { Subject } from "client/disheap/models/Subject";
import { TimetableDTO } from "client/disheap/models/TimetableDTO";
import Toolbar, { IconProps } from "components/Toolbar/Toolbar";
import { COLORS } from "config/Colors";
import { commonStyles } from "config/Styles";
import { SessionStoreFactory } from "infrastructure/data/SessionStoreFactory";
import i18n from "infrastructure/localization/i18n";
import { FunctionalView } from "infrastructure/views/FunctionalView";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Alert, Text, View } from 'react-native';
import { ICheckboxButton } from "react-native-bouncy-checkbox-group";
import DropDownPicker, { ItemType, ValueType } from "react-native-dropdown-picker";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Divider } from "react-native-paper";
import TimeTableView, { genTimeBlock } from "react-native-timetable";
import { dispatch } from "RootNavigation";
import { timeFormatter } from "utils/datetimeFormatterHelper";
import { getWeekDayFullString, getWeekDayString } from "utils/utils";
import { TimetableViewModel } from "viewmodels/TimetableViewModel";
import { DataTimetable } from '../../viewmodels/TimetableViewModel';
import { AddDayTimetableProps } from "./component/AddDayTimetable";
import { AddEndTimeTimetableProps } from "./component/AddEndTimeTimetable";
import { AddStartTimeTimetableProps } from "./component/AddStartTimeTimetable";
import { AddView, AddViewProps } from "./component/AddView";
import { ModalTimetable } from "./component/ModalTimetable";
import { RenderChildProps } from "./component/RenderChild";
import { timetableStyles } from "./TimetableStyles";

export const TimetableView: FunctionalView<TimetableViewModel> = observer(({ vm }) => {
    const [add, setAdd] = useState(false)
    const [timetableData, setTimetableData] = useState<DataTimetable[]>([])
    const [openPicker, setOpenPicker] = useState(false)
    const [subjectId, setSubjectId] = useState<ValueType | null>('')
    const [subjects, setSubjects] = useState<ItemType[]>([])
    const [loading, setLoading] = useState(false)
    const [plus, setPlus] = useState(false)
    const [startTime, setStartTime] = useState(new Date())
    const [endTime, setEndTime] = useState(new Date())
    const [addDay, setAddDay] = useState(false)
    const [addStartTime, setAddStartTime] = useState(false)
    const [addEndTime, setAddEndTime] = useState(false)
    const [weekdays, setWeekdays] = useState<ICheckboxButton[]>([])
    const [daySelected, setDaySelected] = useState(10)
    const [newData, setNewData] = useState<DataTimetable[]>([])
    const [removeTime, setRemoveTime] = useState<DataTimetable>()

    useEffect(() => {
        vm.constructorFunctions()
        if (weekdays.length === 0) {
            weekdays.push({ id: 0, size: 15, text: i18n.t('monday'), fillColor: COLORS.touchables, unfillColor: 'transparent', textStyle: { color: COLORS.text, textDecorationLine: 'none' } })
            weekdays.push({ id: 1, size: 15, text: i18n.t('tuesday'), fillColor: COLORS.touchables, unfillColor: 'transparent', textStyle: { color: COLORS.text, textDecorationLine: 'none' } })
            weekdays.push({ id: 2, size: 15, text: i18n.t('wednesday'), fillColor: COLORS.touchables, unfillColor: 'transparent', textStyle: { color: COLORS.text, textDecorationLine: 'none' } })
            weekdays.push({ id: 3, size: 15, text: i18n.t('thursday'), fillColor: COLORS.touchables, unfillColor: 'transparent', textStyle: { color: COLORS.text, textDecorationLine: 'none' } })
            weekdays.push({ id: 4, size: 15, text: i18n.t('friday'), fillColor: COLORS.touchables, unfillColor: 'transparent', textStyle: { color: COLORS.text, textDecorationLine: 'none' } })
        }
    }, [])

    const onPressAdd = async () => {
        setAdd(true)
        setLoading(true)
        vm.dataTimetable.map((item: DataTimetable) => {
            timetableData.push(item)
        })

        vm.allSubjects.map((item: Subject) => {
            const subject: ItemType = { label: item.name, value: item.id }
            subjects.push(subject)
        })
        setLoading(false)
    }

    const onCloseAdd = () => {
        onCloseModal()
        setAdd(false)
        setNewData([])
        setTimetableData([])
        setSubjectId(null)
        setSubjectId('')
        setSubjects([])
        vm.clearNewData()
        setTimetableData([])
        setSubjectId(null)
    }

    const onCloseModal = () => {
        setPlus(false)
        setAddDay(false)
        setAddEndTime(false)
        setAddStartTime(false)
    }

    const onEventPress = (evt: any) => {
        Alert.alert("onEventPress", evt.title);
    };

    const addClassDay = async () => {
        let subject = ''
        onCloseModal()

        const start = genTimeBlock(getWeekDayString(daySelected), startTime.getHours(), startTime.getMinutes())
        const end = genTimeBlock(getWeekDayString(daySelected), endTime.getHours(), endTime.getMinutes())
        const data = new DataTimetable(subject, start, end)
        const newDataTimetable = timetableData
        newDataTimetable.push(data)
        setTimetableData(newDataTimetable)

        data.setId(subjectId!.toString())
        const newDataToPush = newData
        newDataToPush.push(data)
        setNewData(newDataToPush)
        setRemoveTime(data)

        const timetableStart = timeFormatter(startTime.getHours(), startTime.getMinutes())
        const timetableEnd = timeFormatter(endTime.getHours(), endTime.getMinutes())
        const user = await SessionStoreFactory.getSessionStore().getUser()
        const timetable: TimetableDTO = {
            endTime: timetableEnd,
            startTime: timetableStart,
            weekDay: daySelected,
            subjectId: subjectId!.toString(),
            userId: user!.id
        }
        vm.newData.push(timetable)
    }

    const onPressSave = async () => {
        setAdd(false)
        setNewData([])
        setSubjectId(null)
        await vm.saveNewData()
    }

    const removeTimeData = (data: DataTimetable) => {
        const day = (new Date(data.startTime)).getDay()
        const startTime = new Date(data.startTime)
        const timetableStart = timeFormatter(startTime.getHours(), startTime.getMinutes())
        const endTime = new Date(data.endTime)
        const timetableEnd = timeFormatter(endTime.getHours(), endTime.getMinutes())

        newData.map((item: DataTimetable, index: number) => {
            if (item === data) {
                setNewData(newData.splice(index, 1))
            }
        })
        timetableData.map((item: DataTimetable, index: number) => {
            if (item === data) {
                setTimetableData(timetableData.splice(index, 1))
            }
        })
        vm.newData.map((item: TimetableDTO, index: number) => {
            if (item.endTime === timetableEnd && item.startTime === timetableStart && item.weekDay === day) {
                vm.newData.splice(index, 1)
            }
        })

    }

    const renderChild = (item: DataTimetable, index: number) => {
        const startTime = new Date(item.startTime)
        const endTime = new Date(item.endTime)

        return (
            <TouchableOpacity style={[timetableStyles.timesContainer, item === removeTime ? { backgroundColor: '#93B9AF' } : null]} onPress={() => setRemoveTime(item)}>
                <Text>{i18n.t(getWeekDayFullString(startTime.getDay() - 1))}</Text>
                <Divider style={{ height: 2, width: '100%' }} />
                <Text>{timeFormatter(startTime.getHours(), startTime.getMinutes())}</Text>
                <Text>{timeFormatter(endTime.getHours(), endTime.getMinutes())}</Text>
            </TouchableOpacity>
        )
    }

    const iconLeftProps: IconProps = {
        onPress: () => { !add ? dispatch(DrawerActions.openDrawer()) : onCloseAdd() },
        name: !add ? 'menu-fold' : 'close',
        type: 'AntDesign'
    }

    const iconRightProps: IconProps = {
        onPress: () => { !add ? onPressAdd() : onPressSave() },
        name: !add ? 'plus' : 'check',
        type: 'AntDesign'
    }

    const renderChildProps: RenderChildProps = {
        removeTime: removeTime!,
        onPressRemove: (item) => setRemoveTime(item)
    }

    const addDayTimetable: AddDayTimetableProps = {
        onChange: (selectedItem: ICheckboxButton) => setDaySelected(selectedItem.id),
        onCloseModal: () => onCloseModal(),
        onPressOk: () => { if (daySelected !== 10) { setAddDay(false); setAddStartTime(true); } },
        weekdays: weekdays
    }

    const addStartTimeProps: AddStartTimeTimetableProps = {
        onDateChange: (time: Date) => setStartTime(time),
        onPressCancel: () => { setAddStartTime(false); setAddDay(true) },
        onPressOk: () => { setAddStartTime(false); setAddEndTime(true) },
        startTime: startTime
    }

    const addEndTimeProps: AddEndTimeTimetableProps = {
        endTime: endTime,
        onDateChange: (time: Date) => setEndTime(time),
        onPressCancel: () => { setAddEndTime(false); setAddStartTime(true) },
        onPressOk: () => { addClassDay() }
    }

    const addView: AddViewProps = {
        loading: loading,
        newData: newData,
        onPressMinus: () => removeTimeData(removeTime!),
        onPressPlus: () => { setPlus(true); setAddDay(true) },
        openPicker: openPicker,
        setOpenPicker: setOpenPicker,
        setSubjectId: setSubjectId,
        subjectId: subjectId!,
        subjects: subjects,
        renderChild: renderChildProps,
    }

    return (
        <>
            <Toolbar
                isIconLeft={true}
                iconLeft={iconLeftProps}

                color={COLORS.button}
                title={!add ? i18n.t('timetable.title').toUpperCase() : i18n.t('timetable.save')}
                textStyle={commonStyles.titleToolbar}

                isIconRight={!add ? true : newData.length > 0 ? true : false}
                iconRight={iconRightProps}
            />
            <TimeTableView
                events={!add ? vm.dataTimetable : timetableData}
                pivotTime={8}
                pivotEndTime={18}
                numberOfDays={5}
                onEventPress={add ? null : onEventPress}
                headerStyle={timetableStyles.headerStyle}
                formatDateHeader="dddd"
                locale={i18n.language}
            />
            {add ?
                <AddView
                    loading={loading}
                    newData={newData}
                    onPressMinus={() => removeTimeData(removeTime!)}
                    onPressPlus={() => { setPlus(true); setAddDay(true) }}
                    openPicker={openPicker}
                    setOpenPicker={setOpenPicker}
                    setSubjectId={setSubjectId}
                    subjectId={subjectId!}
                    subjects={subjects}
                    renderChild={renderChildProps}
                />
                :
                <></>
            }
            <ModalTimetable
                addDay={addDay}
                addEndTime={addEndTime}
                addStartTime={addStartTime}
                onRequestClose={() => onCloseModal()}
                plus={plus}
                addDayTimetableProps={addDayTimetable}
                addEndTimeProps={addEndTimeProps}
                addStartTimeProps={addStartTimeProps}
            />
        </>
    )
})