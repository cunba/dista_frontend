import { IconProps, Toolbar } from "components/Toolbar"
import { COLORS } from "config/Colors"
import { commonStyles } from "config/Styles"
import i18n from "infrastructure/localization/i18n"
import { FunctionalView } from "infrastructure/views/FunctionalView"
import { observer } from "mobx-react-lite"
import React from "react"
import { Text, TextInput, View } from "react-native"
import { back } from "RootNavigation"
import { AgendaViewModel } from "viewmodels/AgendaViewModel"
import { signUpStyles } from "views/signUp/SignUpStyles"

export const AddEventView: FunctionalView<AgendaViewModel> = observer(({ vm }) => {

    const iconLeftProps: IconProps = {
        onPress: () => back(),
        name: 'left',
        type: 'AntDesign'
    }

    return (
        <>
            <Toolbar
                isIconLeft={true}
                iconLeft={iconLeftProps}

                color={COLORS.button}
                title={i18n.t('addEvent.title').toUpperCase()}
                textStyle={commonStyles.titleToolbar}

                isIconRight={false}
            />
            <View style={commonStyles.container}>
                <View style={signUpStyles.containerInput}>
                    <Text style={commonStyles.text}>{i18n.t('addEvent.name.label')}:</Text>
                    <TextInput
                        value={vm.name}
                        autoCompleteType="off"
                        autoCorrect={false}
                        placeholder={i18n.t('addEvent.name.label')}
                        placeholderTextColor="grey"
                        onChangeText={(name: any) => vm.setName(name)}
                        style={signUpStyles.textinput}
                    />
                </View>
                <TextInput
                    value={vm.notes}
                    autoCompleteType="off"
                    autoCorrect={false}
                    placeholder={i18n.t('addEvent.notes.label')}
                    placeholderTextColor="grey"
                    onChangeText={(notes: any) => vm.setNotes(notes)}
                    style={[signUpStyles.textinput, { height: 100, width: 300 }]}
                    multiline={true}
                />
            </View>
        </>
    )
})