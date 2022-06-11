import { COLORS } from 'config/Colors'
import i18n from 'infrastructure/localization/i18n'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { Divider, Title } from 'react-native-paper'
import Entypo from 'react-native-vector-icons/Entypo'
import Fontisto from 'react-native-vector-icons/Fontisto'
import { dateFormat, timeFormatter } from 'utils/datetimeFormatterHelper'
import { dataViewStyle } from 'views/data/DataViewStyle'

export interface OxygenProps {
    dataOxygen?: number
    dateOxygen?: number
    loading: boolean
}

export const Oxygen = (props: OxygenProps) => {
    let width = props.dataOxygen ? (170 * (103 - props.dataOxygen) / 100) : undefined

    const getTimeComment = () => {
        const today = new Date()
        const measureDate = props.dateOxygen ? new Date(props.dateOxygen) : undefined

        if (measureDate) {
            if (today.getDate() === measureDate?.getDate()) {
                return i18n.t('data.dateMessage.today') + timeFormatter(measureDate.getHours(), measureDate.getMinutes())
            } else {
                return i18n.t('data.dateMessage') + dateFormat(measureDate, 'DD/MM/yyyy HH:mm')
            }
        } else {
            return props.loading ? '' : i18n.t('data.dateMessage.noDate')
        }
    }

    return (
        <>
            <View style={dataViewStyle.ambientTitleContainer}>
                <Title>{i18n.t('data.oxygen.title').toUpperCase()}</Title>
                <Text style={dataViewStyle.ambientTextDate}>{getTimeComment()}</Text>
            </View>
            <Divider />
            <View style={style.dataContainer}>
                <View style={style.measureContainer}>
                    <Entypo name='drop' color={COLORS.redTermometer} size={50} />
                    <Title style={style.title}>{props.dataOxygen ? props.dataOxygen : '--'} %</Title>
                </View>
                <View >
                    <LinearGradient
                        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                        colors={[COLORS.blueTermometer, COLORS.greenTermometer, COLORS.yellowTermometer, COLORS.orangeTermometer, COLORS.redTermometer]}
                        style={style.bar}
                    >
                        <View style={{ width: width, alignItems: 'flex-end' }}>
                            <Fontisto size={9} name={'blood-drop'} color={COLORS.text} />
                        </View>
                    </LinearGradient>
                </View>
            </View>
        </>
    )
}

const style = StyleSheet.create({
    bar: {
        width: 170,
        borderRadius: 2,
        height: 10
    },
    dataContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 80
    },
    measureContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        marginLeft: 10,
        fontFamily: 'Teko-Light',
        fontSize: 25,
        paddingTop: 10
    }
})