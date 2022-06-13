import { useRoute } from "@react-navigation/native"
import { IconProps, Toolbar } from "components/Toolbar"
import { COLORS } from "config/Colors"
import { commonStyles } from "config/Styles"
import i18n from "infrastructure/localization/i18n"
import { FunctionalView } from "infrastructure/views/FunctionalView"
import { observer } from "mobx-react-lite"
import React, { useEffect } from "react"
import { Text, TextInput, View } from "react-native"
import { back } from "RootNavigation"
import { dateFormat } from "utils/datetimeFormatterHelper"
import { ShowEventViewModel } from "viewmodels/agenda/ShowEventViewModel"
import { signUpStyles } from "views/signUp/SignUpStyles"
import { agendaStyles } from "./AgendaStyles"

export const ShowEventView: FunctionalView<ShowEventViewModel> = observer(({ vm }) => {
    const route = useRoute()

    const iconLeftProps: IconProps = {
        onPress: () => back(),
        name: 'left',
        type: 'AntDesign'
    }

    useEffect(() => {
        vm.setEventPressed(route.params!.event)
    }, [route.params!.event])

    return (
        <>
            <Toolbar
                isIconLeft={true}
                iconLeft={iconLeftProps}

                color={COLORS.button}
                title={i18n.t('showEvent.title').toUpperCase()}
                textStyle={commonStyles.titleToolbar}

                isIconRight={false}
            />
            {vm.eventPressed ?

                <View style={[commonStyles.container, {paddingTop: 30}]}>
                    <View style={signUpStyles.containerInput}>
                        <View style={[commonStyles.labelContainer, { elevation: 0.1 }]}>
                            <Text style={{ fontSize: 10 }}>{i18n.t('addEvent.name.label')}</Text>
                        </View>
                        <TextInput
                            value={vm.eventPressed?.name}
                            autoCompleteType="off"
                            autoCorrect={false}
                            style={agendaStyles.textinput}
                            editable={false}
                        />
                    </View>
                    <View style={[signUpStyles.containerInput, { marginTop: 10 }]}>
                        <View style={[commonStyles.labelContainer, { elevation: 0.1 }]}>
                            <Text style={{ fontSize: 10 }}>{i18n.t('addEvent.date.label')}</Text>
                        </View>
                        <TextInput
                            value={dateFormat(new Date(vm.eventPressed!.startDate!), "DD/MM/YYYY") + ' ' + dateFormat(new Date(vm.eventPressed!.startDate!), 'HH:mm') + ' - ' + dateFormat(new Date(vm.eventPressed!.endDate!), 'HH:mm')}
                            autoCompleteType="off"
                            autoCorrect={false}
                            style={agendaStyles.textinput}
                            editable={false}
                        />
                    </View>
                    <View style={[signUpStyles.containerInput, { marginTop: 10 }]}>
                        <View style={[commonStyles.labelContainer, { elevation: 0.1 }]}>
                            <Text style={{ fontSize: 10 }}>{i18n.t('addEvent.notes.label')}</Text>
                        </View>
                        <TextInput
                            value={vm.eventPressed?.notes}
                            style={agendaStyles.commentInput}
                            multiline={true}
                            textAlignVertical={'top'}
                            editable={false}
                        />
                    </View>
                </View>
                :
                null
            }
        </>
    )
})