import { Toolbar, ToolbarProps } from "components/Toolbar"
import { COLORS } from "config/Colors"
import { commonStyles } from "config/Styles"
import i18n from "infrastructure/localization/i18n"
import { FunctionalView } from "infrastructure/views/FunctionalView"
import { observer } from "mobx-react-lite"
import React from "react"
import { TextInput, View } from "react-native"
import { back } from "RootNavigation"
import { dateFormat } from "utils/datetimeFormatterHelper"
import { signUpStyles } from "views/signUp/SignUpStyles"
import { AddEventViewModel } from '../../viewmodels/agenda/AddEventViewModel'
import { agendaStyles } from "./AgendaStyles"

export const AddEventView: FunctionalView<AddEventViewModel> = observer(({ vm }) => {

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

    return (
        <>
            <Toolbar {...toolbarProps} />
            <View style={commonStyles.container}>
                <View style={signUpStyles.containerInput}>
                    {/* <Text style={commonStyles.text}>{i18n.t('addEvent.name.label')}:</Text> */}
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
                <View style={signUpStyles.containerInput}>
                    {/* <Text style={commonStyles.text}>{i18n.t('addEvent.name.label')}:</Text> */}
                    <TextInput
                        value={dateFormat(vm.startDate)}
                        autoCompleteType="off"
                        autoCorrect={false}
                        placeholder={i18n.t('addEvent.name.label')}
                        placeholderTextColor="grey"
                        onChangeText={(name: any) => vm.setName(name)}
                        style={agendaStyles.textinput}
                    />
                </View>
                <View style={signUpStyles.containerInput}>
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
            </View>
        </>
    )
})