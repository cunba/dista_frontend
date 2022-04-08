import { COLORS } from "config/Colors";
import { SIZES } from "config/Sizes";
import { SigningType } from "data/model/Signing";
import i18n from "infrastructure/localization/i18n";
import React from "react";
import { Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import BouncyCheckboxGroup, { ICheckboxButton } from "react-native-bouncy-checkbox-group";
import { CalendarProps, SigningCalendar } from '../Calendar/SigningCalendar';

export enum AlertType {
    MENU = "menu",
    MESSAGE = 'message',
    DELETE = 'delete',
    CALENDAR = "calendar",
    MODIFY = "modify"
}

export enum AnimationType {
    NONE = 'none',
    SLIDE = 'slide',
    FADE = 'fade'
}

export enum PresentationStyle {
    FULL_SCREEN = 'fullScreen',
    PAGE_SHEET = 'pageSheet',
    FORM_SHEET = 'formSheet',
    OVER_FULL_SCREEN = 'overFullScreen'
}

export interface AlertItems {
    text?: string,
    color?: string,
    onPress?: () => void,
    bgColor?: string,
    style?: any,
}

export interface Observations {
    observation?: any,
    checked?: boolean
    onPress?: () => void
}

export interface AlertProps {
    onPress?: (onPress?: any) => void,
    onPressOk?: () => void,
    type: AlertType,
    bgColor?: string,
    options?: AlertItems[]
    color?: string,
    title?: string,
    visible: boolean,
    animationType?: AnimationType,
    presentationStyle?: PresentationStyle,
    onRequestClose: () => void,
    calendar?: CalendarProps,
    message?: string,
    checked?: SigningType,
    observations?: Observations[]
}

export interface JsMap<T> {
    [key: string]: T
}

export const defaultOptions: AlertProps = {
    type: AlertType.MESSAGE,
    color: COLORS.text,
    onPress: () => { console.log('Pressed') },
    visible: false,
    onRequestClose: () => { console.log('Close') },
    animationType: AnimationType.NONE,
    bgColor: COLORS.appBackground,
    options: [
        {
            text: 'Alert',
            color: COLORS.text,
            onPress: () => { console.log('Alert') },
            bgColor: 'transparent'
        },
        {
            text: 'Cancel',
            color: COLORS.text,
            onPress: () => { console.log('Cancel') },
            bgColor: 'transparent'
        }
    ]
}

export const AlertPopUp = (config?: AlertProps) => {
    const styles = StyleSheet.create({
        title: {
            textAlign: 'center',
            color: COLORS.text,
            fontSize: SIZES.text,
            padding: 10
        },
        alertContainer: {
            justifyContent: 'center',
            alignContent: 'center',
            backgroundColor: 'black',
            width: '100%',
            height: '100%',
            opacity: 0.7,
            position: 'absolute'
        },
        calendarContainer: {
            justifyContent: 'center',
            alignContent: 'center',
            height: Dimensions.get('window').height,
            width: Dimensions.get('window').width,
            padding: 40,
            position: 'relative'
        },
        containerOptions: {
            display: "flex",
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            width: '100%',
            paddingVertical: '4%',
            borderTopColor: COLORS.text,
            borderTopWidth: 1,
            borderBottomLeftRadius: 2,
            borderBottomRightRadius: 2
        },
        containerAlertMessage: {
            display: "flex",
            justifyContent: 'center',
            alignItems: 'center',
            margin: '15%',
            height: 'auto',
            position: 'relative',
            borderRadius: 2,
            backgroundColor: COLORS.appBackground,
            marginTop: '70%',
        },
        containerModify: {
            display: "flex",
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: 20,
            position: 'relative',
            borderRadius: 2,
            backgroundColor: COLORS.appBackground,
            marginTop: '70%',
        },
        containerDelete: {
            display: "flex",
            justifyContent: 'center',
            alignItems: 'center',
            margin: 20,
            height: 160,
            position: 'relative',
            borderRadius: 2,
            backgroundColor: COLORS.appBackground,
            marginTop: '70%',
        },
        containerAlertNoMessage: {
            display: "flex",
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: '15%',
            marginHorizontal: '30%',
            position: 'relative',
            borderRadius: 5,
            backgroundColor: COLORS.appBackground,
            marginTop: '70%',
        },
        text: {
            textAlign: 'left',
            fontSize: SIZES.text_button,
            color: COLORS.text,
            paddingBottom: 10,
            paddingHorizontal: '10%'
        },
        textButton: {
            textAlign: 'center',
            fontSize: SIZES.text_button,
            color: COLORS.text,
            paddingHorizontal: 20,
            paddingBottom: 5
        },
        textInOut: {
            textAlign: 'center',
            fontSize: SIZES.text_button,
            color: COLORS.text,
            textDecorationLine: 'none'
        },
        containerInOut: {
            flex: 1,
            width: '100%',
            paddingHorizontal: '15%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        containerOkCancel: {
            flexDirection: 'row',
            width: '100%',
            height: 50,
            justifyContent: 'space-around',
            alignItems: 'center',
            borderTopColor: 'grey',
            borderTopWidth: 1,
        },
        containerObservations: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            marginBottom: 5
        }
    })

    const props = config ? config : defaultOptions
    const lines = props.observations! !== undefined ? Math.trunc(props.observations!.length/6 + 1) : 0
    const data = [
        {
            id: 0,
            text: i18n.t('in'),
            fillColor: COLORS.button,
            unfillColor: 'transparent',
            textStyle: styles.textInOut,
            size: 20
        }, {
            id: 1,
            text: i18n.t('out'),
            fillColor: COLORS.button,
            unfillColor: 'transparent',
            textStyle: styles.textInOut,
            size: 20
        }
    ]

    const renderMessage = () => <Modal animationType={props.animationType} transparent={true} visible={props.visible} onRequestClose={props.onRequestClose} >
        <View style={styles.alertContainer} />
        <View style={styles.containerAlertMessage}>
            <Text style={styles.title}>{props.title}</Text>
            <Text style={styles.text}>{props.message}</Text>
            <View style={styles.containerOptions}>
                {props.options?.map((item, index) => {
                    return (<TouchableOpacity
                        key={'item-' + index}
                        style={{
                            backgroundColor: item.bgColor,
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingRight: 0,
                            paddingLeft: 0
                        }}
                        onPress={item.onPress}>
                        <Text style={{ color: item.color, fontSize: SIZES.text_button, }}>{item.text}</Text>
                    </TouchableOpacity>)
                })}
            </View>
        </View>
    </Modal>

    const renderDelete = () => <Modal animationType={props.animationType} transparent={true} visible={props.visible} onRequestClose={props.onRequestClose} >
        <View style={styles.alertContainer} />
        <View style={styles.containerDelete}>
            <Text style={styles.title}>{props.title}</Text>
            <Text style={styles.text}>{props.message}</Text>
            <View style={styles.containerOkCancel}>
                <TouchableOpacity
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '50%',
                        height: '100%',
                        borderRightColor: 'grey',
                        borderRightWidth: 1
                    }}
                    onPress={props.onRequestClose}>
                    <Text style={styles.textButton}>{i18n.t("cancel")}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '50%',
                        height: '100%'
                    }}
                    onPress={props.onPressOk}>
                    <Text style={styles.textButton}>{i18n.t("delete")}</Text>
                </TouchableOpacity>
            </View>
        </View>
    </Modal>

    const renderMenu = () => <Modal animationType={props.animationType} transparent={true} visible={props.visible} onRequestClose={props.onRequestClose} >
        <View style={styles.alertContainer} />
        <View style={styles.containerAlertNoMessage}>
            {props.options?.map((item, index) => {
                return (<TouchableOpacity
                    key={'item-' + index}
                    style={{
                        backgroundColor: item.bgColor,
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: SIZES.padding_bottons,
                        paddingRight: 0,
                        paddingLeft: 0,
                    }}
                    onPress={item.onPress}>
                    <Text style={{ color: item.color, fontSize: SIZES.text, }}>{item.text}</Text>
                </TouchableOpacity>)
            })}
        </View>
    </Modal>

    const renderCalendar = () => <Modal animationType={props.animationType} visible={props.visible} onRequestClose={props.onRequestClose} transparent={true}>
        <View style={styles.alertContainer} />
        <View style={styles.calendarContainer}>
            <SigningCalendar {...props.calendar!} />
            <View style={{ backgroundColor: COLORS.appBackground, flexDirection: 'row', justifyContent: 'flex-end' }} >
                <TouchableOpacity style={{ alignItems: 'flex-end' }} onPress={props.onRequestClose}>
                    <Text style={styles.textButton}>{i18n.t("cancel")}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ alignItems: 'flex-end' }} onPress={props.onPressOk}>
                    <Text style={styles.textButton}>{i18n.t("ok")}</Text>
                </TouchableOpacity>
            </View>
        </View>
    </Modal>

    const renderModify = () => <Modal animationType={props.animationType} transparent={true} visible={props.visible} onRequestClose={props.onRequestClose} >
        <View style={styles.alertContainer} />
        <View style={[styles.containerModify, {height: 140 + lines * 75}]}>
            <Text style={styles.title}>{i18n.t("modify.title")}</Text>
            <BouncyCheckboxGroup
                data={data}
                initial={props.checked === SigningType.IN ? 0 : 1}
                onChange={(selectedItem: ICheckboxButton) => {
                    selectedItem.id === 0 ? props.onPress!(SigningType.IN) : props.onPress!(SigningType.OUT)
                }}
                style={styles.containerInOut}
            />
            <View style={styles.containerObservations}>
                {props.observations?.map((item, index) => {
                    return (<TouchableOpacity
                        key={'item-' + index}
                        style={[
                            {
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: (Dimensions.get('window').width - 60) / props.observations!.length,
                                padding: 10,
                            },
                            item.checked ?
                                {
                                    borderWidth: 1,
                                    borderColor: '#AFB4B1',
                                    backgroundColor: '#DAE2DD'
                                }
                                :
                                {}
                        ]}
                        onPress={item.onPress}>
                        {item.observation}
                    </TouchableOpacity>)
                })}
            </View>
            <View style={styles.containerOkCancel}>
                <TouchableOpacity
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '50%',
                        height: '100%',
                        borderRightColor: 'grey',
                        borderRightWidth: 1
                    }}
                    onPress={props.onRequestClose}>
                    <Text style={styles.textButton}>{i18n.t("cancel")}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '50%',
                        height: '100%'
                    }}
                    onPress={props.onPressOk}>
                    <Text style={styles.textButton}>{i18n.t("ok")}</Text>
                </TouchableOpacity>
            </View>
        </View>
    </Modal >

    const options = () => {
        switch (props.type) {
            case AlertType.CALENDAR: return renderCalendar()
            case AlertType.MESSAGE: return renderMessage()
            case AlertType.DELETE: return renderDelete()
            case AlertType.MENU: return renderMenu()
            case AlertType.MODIFY: return renderModify()
            default: return renderMessage()
        }
    }

    return options()
}