import { Subject } from "client/disheap/models/Subject";
import i18n from "infrastructure/localization/i18n";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import DropDownPicker, { ItemType, ValueType } from "react-native-dropdown-picker";
import { DataTimetable } from "viewmodels/TimetableViewModel";
import { timetableStyles } from "../TimetableStyles";
import { RenderChild, RenderChildProps } from "./RenderChild";


export interface AddViewProps {
    openPicker: boolean
    setOpenPicker: React.Dispatch<React.SetStateAction<boolean>>
    subjectId: ValueType
    setSubjectId: React.Dispatch<any>
    subjects: ItemType[]
    loading: boolean
    newData: any[]
    onPressPlus: () => void
    onPressMinus: () => void
    renderChild: RenderChildProps
}

export const AddView = (props: AddViewProps) => {

    return (
        <View style={timetableStyles.addContainer}>
            <View style={timetableStyles.containerInput}>
                <Text style={timetableStyles.addText}>{i18n.t('timetable.title.subject')}:</Text>
                <DropDownPicker
                    open={props.openPicker}
                    setOpen={props.setOpenPicker}
                    value={props.subjectId}
                    setValue={props.setSubjectId}
                    multiple={false}
                    items={props.subjects}
                    listMode={'MODAL'}
                    placeholder={i18n.t('timetable.title.subject.select')}
                    modalTitle={i18n.t('timetable.title.subject.select')}
                    loading={props.loading}
                    searchable={true}
                    containerStyle={{ width: '70%' }}
                    style={{ height: '100%', borderColor: 'grey' }}
                    placeholderStyle={{ color: 'grey' }}
                    dropDownContainerStyle={{ borderColor: 'grey' }}
                />
            </View>
            <View style={timetableStyles.containerInput}>
                <View style={{ flexDirection: 'row', width: 200, height: 50 }}>
                    <Text style={timetableStyles.addText}>{i18n.t('timetable.title')}:</Text>
                    {props.newData.length > 0 ?
                        props.newData.map((item: DataTimetable, index: number) => {
                            return (<RenderChild item={item} removeTime={props.renderChild.removeTime} onPressRemove={props.renderChild.onPressRemove}/>)
                        })
                        :
                        null
                    }
                </View>
                <View style={[timetableStyles.timeButtonsContainer, props.newData.length < 0 ? { justifyContent: 'flex-start' } : null]}>
                    <TouchableOpacity style={timetableStyles.timeAdd} onPress={props.onPressPlus}>
                        <Text style={[timetableStyles.addText, { fontWeight: 'bold' }]}>+</Text>
                    </TouchableOpacity>
                    {props.newData.length > 0 ?
                        <TouchableOpacity style={timetableStyles.timeRemove} onPress={props.onPressMinus}>
                            <Text style={[timetableStyles.addText, { fontWeight: 'bold' }]}>-</Text>
                        </TouchableOpacity>
                        : null
                    }
                </View>
            </View>
        </View>
    )
}