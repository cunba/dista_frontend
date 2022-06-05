import Toolbar, { IconProps } from "components/Toolbar/Toolbar";
import { COLORS } from "config/Colors";
import { ROUTES } from "config/Constants";
import { commonStyles } from "config/Styles";
import { Disorder } from "data/model/Disorder";
import i18n from "infrastructure/localization/i18n";
import { FunctionalView } from "infrastructure/views/FunctionalView";
import React, { useEffect, useState } from "react";
import { Alert, Text, TextInput, View } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import DropDownPicker, { ItemType, ValueType } from "react-native-dropdown-picker";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ActivityIndicator } from "react-native-paper";
import { SignUpViewModel } from "viewmodels/SignUpViewModel";
import { signUpStyles } from "views/signUp/SignUpStyles";
import { observer } from "../../../node_modules/mobx-react-lite";
import { AuthContext } from "../../App";
import { SchoolYearFlat } from '../../data/model/SchoolYear';
import { Study } from '../../data/model/Study';
import { back, navigate } from '../../RootNavigation';

export const SignUpView: FunctionalView<SignUpViewModel> = observer(({ vm }) => {
    const [showSpinner, setShowSpinner] = useState(false)
    const [hideErrorMessage, setHideErrorMessage] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [openSchoolYearPicker, setOpenSchoolYearPicker] = useState(false)
    const [day, setDay] = useState('01')
    const [month, setMonth] = useState('01')
    const [year, setYear] = useState('2022')
    const [loadingStudies, setLoadingStudies] = useState(false)
    const [loadingDisorders, setLoadingDisorders] = useState(false)
    const [openStudiesPicker, setOpenStudiesPicker] = useState(false)
    const [openDisordersPicker, setOpenDisordersPicker] = useState(false)
    const [studyId, setStudyId] = useState<ValueType | null>('')
    const [disorderId, setDisorderId] = useState<ValueType | null>('')
    const [studies, setStudies] = useState<ItemType[]>([])
    const [disorders, setDisorders] = useState<ItemType[]>([])
    const [render, setRender] = useState(0)
    const [renderDisorders, setRenderDisorders] = useState(0)

    const { signUp } = React.useContext(AuthContext)

    useEffect(() => {
        setRender(render + 1)
        setRenderDisorders(renderDisorders + 1)
    }, [])

    const onOpenStudies = () => {
        setOpenDisordersPicker(false)
        setLoadingStudies(true)
        setRender(render + 1)
        if (render === 1) {
            for (let [key, value] of vm.allSchoolYears!) {
                const parent: ItemType = { label: key, value: key }
                studies.push(parent)
                value.map((item: SchoolYearFlat) => {
                    const label = item.school_year + ' ' + key
                    const study: ItemType = { label: label.toString(), value: item.id, parent: key }
                    studies.push(study)
                })
            }
        }
        setLoadingStudies(false)
    }

    useEffect(() => {
        vm.setSchoolYear(studyId!.toString())
    }, [studyId])

    useEffect(() => {
        vm.setDisorder(disorderId!.toString())
    }, [disorderId])

    const doSignUp = async () => {
        const yearNumber = parseInt(year)
        const monthNumber = parseInt(month)
        const dayNumber = parseInt(day)

        if (vm.isValid()) {
            setHideErrorMessage(true)
            if (yearNumber <= new Date().getFullYear() && monthNumber <= 12 && dayNumber <= 31) {
                vm.setBirthday(new Date(parseInt(year), parseInt(month), parseInt(day)))
                if (vm.password === vm.repeatPassword) {
                    if (vm.passwordLength()) {
                        setShowSpinner(true)
                        try {
                            vm.setUser()
                            await signUp(vm.user);
                            setShowSpinner(false);
                            Alert.alert(i18n.t('sign_up.success'))
                            navigate(ROUTES.LOGIN, null)
                        } catch (w: any) {
                            setErrorMessage(i18n.t('sign_up.error.udefined'));
                        }
                        setHideErrorMessage(false);
                        setShowSpinner(false)
                    } else {
                        setErrorMessage(i18n.t('sign_up.error.password_length'));
                        setHideErrorMessage(false);
                    }
                } else {
                    setErrorMessage(i18n.t('sign_up.error.password'));
                    setHideErrorMessage(false);
                }
            } else {
                setErrorMessage(i18n.t('sign_up.error.birthday'));
                setHideErrorMessage(false);
            }
        }
        else {
            setErrorMessage(i18n.t('sign_up.error.fields'));
            setHideErrorMessage(false);
        }

    }

    const onOpenDisordersPicker = () => {
        setOpenStudiesPicker(false)
        setRenderDisorders(renderDisorders + 1)
        if (renderDisorders === 1) {
            setLoadingDisorders(true)
            vm.allDisorders!.map((item: Disorder) => {
                const disorder: ItemType = { label: item.disorder, value: item.id }
                disorders.push(disorder)
            })
            setLoadingDisorders(false)
        }
    }

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
                isIconRight={false}
            />
            <View style={commonStyles.container}>
                <Text style={signUpStyles.title}>{i18n.t('sign_up.title')}</Text>
                <View style={signUpStyles.containerInput}>
                    <Text style={commonStyles.text}>{i18n.t('sign_up.name.label')}:</Text>
                    <TextInput
                        value={vm.name}
                        autoCompleteType="off"
                        autoCorrect={false}
                        placeholder={i18n.t('sign_up.name.label')}
                        placeholderTextColor="grey"
                        onChangeText={(name: any) => vm.setName(name)}
                        style={signUpStyles.textinput}
                    />
                </View>
                <View style={signUpStyles.containerInput}>
                    <Text style={commonStyles.text}>{i18n.t('sign_up.surname.label')}:</Text>
                    <TextInput
                        value={vm.surname}
                        autoCompleteType="off"
                        autoCorrect={false}
                        placeholder={i18n.t('sign_up.surname.label')}
                        placeholderTextColor="grey"
                        onChangeText={(surname: any) => vm.setSurname(surname)}
                        style={signUpStyles.textinput}
                    />
                </View>
                <View style={signUpStyles.containerInput}>
                    <Text style={commonStyles.text}>{i18n.t('sign_up.email.label')}:</Text>
                    <TextInput
                        value={vm.email}
                        autoCompleteType="off"
                        autoCorrect={false}
                        placeholder={i18n.t('sign_up.email.label')}
                        placeholderTextColor="grey"
                        onChangeText={(email: any) => vm.setEmail(email)}
                        style={signUpStyles.textinput}
                    />
                </View>
                <View style={signUpStyles.containerInput}>
                    <Text style={commonStyles.text}>{i18n.t('sign_up.password.label')}:</Text>
                    <TextInput
                        value={vm.password}
                        autoCompleteType="off"
                        autoCorrect={false}
                        placeholder={i18n.t('sign_up.password.label')}
                        placeholderTextColor="grey"
                        secureTextEntry={true}
                        onChangeText={(password: any) => vm.setPassword(password)}
                        style={signUpStyles.textinput}
                    />
                </View>
                <View style={signUpStyles.containerInput}>
                    <Text style={commonStyles.text}>{i18n.t('sign_up.repeat_password.label')}:</Text>
                    <TextInput
                        value={vm.repeatPassword}
                        autoCompleteType="off"
                        autoCorrect={false}
                        placeholder={i18n.t('sign_up.repeat_password.placeholder')}
                        placeholderTextColor="grey"
                        secureTextEntry={true}
                        onChangeText={(password: any) => vm.setRepeatPassword(password)}
                        style={signUpStyles.textinput}
                    />
                </View>
                <View style={signUpStyles.containerInput}>
                    <Text style={commonStyles.text}>{i18n.t('sign_up.birthday.label')}:</Text>
                    <View style={signUpStyles.containerInputDate}>
                        <TextInput
                            value={day}
                            dataDetectorTypes={'calendarEvent'}
                            autoCompleteType="off"
                            autoCorrect={false}
                            placeholder={i18n.t('sign_up.day.label')}
                            placeholderTextColor="grey"
                            onChangeText={(day: any) => setDay(day)}
                            style={[signUpStyles.textinput, { paddingLeft: 5, textAlign: 'center', width: 50 }]}
                            keyboardType="numeric"
                        />
                        <Text style={[commonStyles.title, { paddingTop: 20 }]}>/</Text>
                        <TextInput
                            value={month}
                            dataDetectorTypes={'calendarEvent'}
                            autoCompleteType="off"
                            autoCorrect={false}
                            placeholder={i18n.t('sign_up.month.label')}
                            placeholderTextColor="grey"
                            onChangeText={(month: any) => setMonth(month)}
                            style={[signUpStyles.textinput, { paddingLeft: 5, textAlign: 'center', width: 50 }]}
                            keyboardType="numeric"
                        />
                        <Text style={[commonStyles.title, { paddingTop: 20 }]}>/</Text>
                        <TextInput
                            value={year}
                            dataDetectorTypes={'calendarEvent'}
                            autoCompleteType="off"
                            autoCorrect={false}
                            placeholder={i18n.t('sign_up.year.label')}
                            placeholderTextColor="grey"
                            onChangeText={(year: any) => setYear(year)}
                            style={[signUpStyles.textinput, { paddingLeft: 5, textAlign: 'center', width: 50 }]}
                            keyboardType="numeric"
                        />
                        <Text ></Text>
                    </View>
                </View>
                <View style={signUpStyles.containerInput}>
                    <Text style={commonStyles.text}>{i18n.t('sign_up.studies.label')}:</Text>
                    <DropDownPicker
                        key={'studiesPicker'}
                        open={openStudiesPicker}
                        setOpen={setOpenStudiesPicker}
                        value={studyId}
                        setValue={setStudyId}
                        multiple={false}
                        items={studies}
                        listMode={'MODAL'}
                        placeholder={i18n.t('sign_up.studies.placeholder')}
                        loading={loadingStudies}
                        style={signUpStyles.picker}
                        placeholderStyle={{ color: 'grey' }}
                        dropDownContainerStyle={signUpStyles.pickerContainer}
                        containerStyle={{ width: 200 }}
                        onOpen={onOpenStudies}
                        zIndex={2000}
                        zIndexInverse={1000}
                        categorySelectable={false}
                        listParentContainerStyle={{ borderBottomWidth: 1, borderTopWidth: 1.5 }}
                    />
                </View>
                <View style={signUpStyles.containerChecked}>
                    <BouncyCheckbox
                        isChecked={vm.isDisorder ? true : false}
                        onPress={() => vm.setIsDisorder(!vm.isDisorder!)}
                        fillColor={COLORS.touchables}
                        unfillColor={COLORS.background}
                        text={i18n.t('sign_up.check.label')}
                        textStyle={[commonStyles.text, { textDecorationLine: 'none' }]}
                        size={20}
                    />
                </View>

                {vm.isDisorder ?
                    <View style={signUpStyles.containerInput}>
                        <Text style={commonStyles.text}>{i18n.t('sign_up.disorder.label')}:</Text>
                        <DropDownPicker
                            key={'disorderPicker'}
                            open={openDisordersPicker}
                            setOpen={setOpenDisordersPicker}
                            value={disorderId}
                            setValue={setDisorderId}
                            multiple={false}
                            items={disorders}
                            setItems={setDisorders}
                            listMode={'SCROLLVIEW'}
                            placeholder={i18n.t('sign_up.disorder.placeholder')}
                            loading={loadingDisorders}
                            style={signUpStyles.picker}
                            containerStyle={{ width: 200 }}
                            placeholderStyle={{ color: 'grey' }}
                            dropDownContainerStyle={signUpStyles.pickerContainer}
                            dropDownDirection={'TOP'}
                            onOpen={onOpenDisordersPicker}
                            zIndex={1000}
                            zIndexInverse={2000}
                        />
                    </View>
                    :
                    <></>
                }

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
                    <TouchableOpacity style={signUpStyles.button} onPress={doSignUp} >
                        <Text style={commonStyles.textButton}>{i18n.t('sign_up.title')}</Text>
                    </TouchableOpacity>
                }
            </View>
        </>
    )
})