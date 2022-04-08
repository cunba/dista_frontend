import Toolbar, { IconProps } from "components/Toolbar/Toolbar";
import { COLORS } from "config/Colors";
import { commonStyles, formStyles } from "config/Styles";
import i18n from "infrastructure/localization/i18n";
import { FunctionalView } from "infrastructure/views/FunctionalView";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { Alert, Text, TextInput, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ActivityIndicator } from "react-native-paper";
import { back } from "RootNavigation";
import { SendEmailViewModel } from "viewmodels/SendEmailViewModel";

export const SendEmailView: FunctionalView<SendEmailViewModel> = observer(({ vm }) => {
    const [showSpinner, setShowSpinner] = useState(false)
    const [hideErrorMessage, setHideErrorMessage] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [hideToolbar, setHideToolbar] = useState(false)

    const doRecover = () => {
        if (verifyInput()) {
            setShowSpinner(true)
            vm.passwordRecover()
            setHideToolbar(true)
            Alert.alert(i18n.t("recovery.email.alert"))
            setHideErrorMessage(false);
            setShowSpinner(false)
        }
    }

    const verifyInput = () => {
        if (vm.email === '') {
            setErrorMessage(i18n.t('login.error.noEmail'));
            setHideErrorMessage(false);
            return false;
        }
        else {
            return true
        }
    }

    const iconLeftProps: IconProps = {
        onPress: () => back(),
        name: 'left',
        type: 'AntDesign'
    }

    return (
        <>
            {
                !hideToolbar ?
                    <Toolbar
                        isIconLeft={true}
                        iconLeft={iconLeftProps}
                        isIconRight={false}
                        color={COLORS.button}
                    />
                    :
                    <></>
            }
            <View style={[formStyles.container, { justifyContent: 'flex-start', paddingTop: 20 }]}>
                <Text style={formStyles.title}>{i18n.t('recovery.title')}</Text>
                <TextInput
                    value={vm.email}
                    autoCompleteType="off"
                    autoCorrect={false}
                    placeholder={i18n.t('login.email.label')}
                    placeholderTextColor="grey"
                    onChangeText={user => vm.setEmail(user)}
                    style={formStyles.textinput}
                />

                {!hideErrorMessage ? (
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ marginBottom: 5, color: 'red' }}>
                            {errorMessage}
                        </Text>
                    </View>
                ) : null}

                {showSpinner ?
                    <ActivityIndicator style={commonStyles.spinner} size='large' animating={true} color={COLORS.button} />
                    :
                    <TouchableOpacity style={[formStyles.button, { marginTop: 10 }]} onPress={doRecover} >
                        <Text style={commonStyles.textButton}>{i18n.t('recovery.button')}</Text>
                    </TouchableOpacity>
                }
            </View>
        </>
    )
})