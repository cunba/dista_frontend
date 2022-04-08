import { COLORS } from "config/Colors";
import { commonStyles } from "config/Styles";
import { ICredentials } from "infrastructure/data/SessionStoreFactory";
import i18n from "infrastructure/localization/i18n";
import { FunctionalView } from "infrastructure/views/FunctionalView";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ActivityIndicator } from "react-native-paper";
import { RecoveryViewModel } from "viewmodels/RecoveryViewModel";
import { recoveryStyles } from "views/recovery/RecoveryStyles";
import { AuthContext } from "../../App";

export const RecoveryView: FunctionalView<RecoveryViewModel> = observer(({ vm }) => {
    const [showSpinner, setShowSpinner] = useState(false)
    const [hideErrorMessage, setHideErrorMessage] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    const { signIn } = React.useContext(AuthContext)

    const doRecover = async () => {
        if (verifyInput()) {
            setShowSpinner(true)
            try {
                await signIn({
                    email: vm.email,
                    password: vm.password,
                } as ICredentials);
                setShowSpinner(false);
            } catch (w: any) {
                if (w.status) {
                    selectErrorMessage(3);
                }
                else {
                    selectErrorMessage(4);
                }
            }
            setHideErrorMessage(false);
            setShowSpinner(false)
        }

    }

    const verifyInput = () => {
        if (vm.email === '' && vm.password === '') {
            selectErrorMessage(5)
            setHideErrorMessage(false);
            return false
        }
        else if (vm.email === '') {
            selectErrorMessage(1);
            setHideErrorMessage(false);
            return false;
        }
        else if (vm.password === '') {
            selectErrorMessage(2);
            setHideErrorMessage(false);
            return false;
        }
        else {
            return true
        }
    }

    const selectErrorMessage = (value: number): void => {
        switch (value) {
            case 1:
                setErrorMessage(i18n.t('recovery.error.noEmail'));
                break;
            case 2:
                setErrorMessage(i18n.t('recovery.error.noPassword'));
                break;
            case 3:
                setErrorMessage(i18n.t('recovery.error.credentialsError'));
                break;
            case 4:
                setErrorMessage(i18n.t('recovery.error.defaultError'));
                break
            case 5:
                setErrorMessage(i18n.t('recovery.error.noUserameNoPassword'));
        }
    }

    return (
        <>
            <View style={recoveryStyles.container}>
                <Text style={recoveryStyles.title}>{i18n.t('recovery.title')}</Text>
                <TextInput
                    value={vm.email}
                    autoCompleteType="off"
                    autoCorrect={false}
                    placeholder={i18n.t('recovery.email.label')}
                    placeholderTextColor="grey"
                    onChangeText={user => vm.setEmail(user)}
                    style={recoveryStyles.textinput}
                />
                <TextInput
                    value={vm.password}
                    autoCompleteType="off"
                    autoCorrect={false}
                    placeholder={i18n.t('recovery.password.label')}
                    placeholderTextColor="grey"
                    secureTextEntry={true}
                    onChangeText={password => vm.setPassword(password)}
                    style={recoveryStyles.textinput}
                />
                <TouchableOpacity >
                    <Text style={[recoveryStyles.textRecover, { textDecorationLine: 'underline' }]}>
                        {i18n.t('recovery.recover_password')}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ flexDirection: 'row', paddingBottom: 20 }}>
                    <Text style={commonStyles.text}>{i18n.t('recovery.sign_up')}</Text>
                    <Text style={[commonStyles.text, { textDecorationLine: 'underline' }]}>{i18n.t('recovery.here')}</Text>
                </TouchableOpacity>

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
                    <TouchableOpacity style={recoveryStyles.button} onPress={doRecover} >
                        <Text style={commonStyles.textButton}>{i18n.t('recovery.button')}</Text>
                    </TouchableOpacity>
                }
            </View>
        </>
    )
})