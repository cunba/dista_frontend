import { COLORS } from "config/Colors";
import { commonStyles, formStyles } from "config/Styles";
import i18n from "infrastructure/localization/i18n";
import { FunctionalView } from "infrastructure/views/FunctionalView";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ActivityIndicator } from "react-native-paper";
import { LoginViewModel } from "viewmodels/LoginViewModel";
import { loginStyles } from "views/login/LoginStyles";
import { AuthContext } from "../../App";
import { ROUTES } from '../../config/Constants';
import { navigate } from '../../RootNavigation';

export const LoginView: FunctionalView<LoginViewModel> = observer(({ vm }) => {
    const [showSpinner, setShowSpinner] = useState(false)
    const [hideErrorMessage, setHideErrorMessage] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    const { signIn } = React.useContext(AuthContext)

    const doLogin = async () => {
        if (verifyInput()) {
            setShowSpinner(true)
            try {
                await signIn(vm.email, vm.password);
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
                setErrorMessage(i18n.t('login.error.noEmail'));
                break;
            case 2:
                setErrorMessage(i18n.t('login.error.noPassword'));
                break;
            case 3:
                setErrorMessage(i18n.t('login.error.credentialsError'));
                break;
            case 4:
                setErrorMessage(i18n.t('login.error.defaultError'));
                break
            case 5:
                setErrorMessage(i18n.t('login.error.noUserameNoPassword'));
        }
    }

    const recover = () => {
        navigate(ROUTES.SEND_EMAIL, null)
    }

    const signUp = () => {
        navigate(ROUTES.SIGN_UP, null)
    }

    return (
        <>
            <View style={formStyles.container}>
                <Text style={formStyles.title}>{i18n.t('login.title')}</Text>
                <TextInput
                    value={vm.email}
                    autoCompleteType="off"
                    autoCorrect={false}
                    placeholder={i18n.t('login.email.label')}
                    placeholderTextColor="grey"
                    onChangeText={(user: any) => vm.setEmail(user)}
                    style={formStyles.textinput}
                />
                <TextInput
                    value={vm.password}
                    autoCompleteType="off"
                    autoCorrect={false}
                    placeholder={i18n.t('login.password.label')}
                    placeholderTextColor="grey"
                    secureTextEntry={true}
                    onChangeText={(password: any) => vm.setPassword(password)}
                    style={formStyles.textinput}
                />
                <TouchableOpacity onPress={recover}>
                    <Text style={[loginStyles.textRecover, { textDecorationLine: 'underline' }]}>
                        {i18n.t('login.recover_password')}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ flexDirection: 'row', paddingBottom: 20 }} onPress={signUp}>
                    <Text style={commonStyles.text}>{i18n.t('login.sign_up')}</Text>
                    <Text style={[commonStyles.text, { textDecorationLine: 'underline' }]}>{i18n.t('login.here')}</Text>
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
                    <TouchableOpacity style={formStyles.button} onPress={doLogin} >
                        <Text style={commonStyles.textButton}>{i18n.t('login.button')}</Text>
                    </TouchableOpacity>
                }
            </View>
        </>
    )
})