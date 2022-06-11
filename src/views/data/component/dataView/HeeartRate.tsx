import { COLORS } from 'config/Colors'
import i18n from 'infrastructure/localization/i18n'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { Divider, Title } from 'react-native-paper'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { dateFormat, timeFormatter } from 'utils/datetimeFormatterHelper'
import { dataViewStyle } from 'views/data/DataViewStyle'

export interface HeartRateProps {
    dataHeartRate?: number
    dateHeartRate?: number
    loading: boolean
}

export const HeartRate = (props: HeartRateProps) => {
    let width = props.dataHeartRate ? (170 * (props.dataHeartRate - 40) / 110) : undefined

    const getTimeComment = () => {
        const today = new Date()
        const measureDate = props.dateHeartRate ? new Date(props.dateHeartRate) : undefined

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
                <Title>{i18n.t('data.heartRate.title').toUpperCase()}</Title>
                <Text style={dataViewStyle.ambientTextDate}>{getTimeComment()}</Text>
            </View>
            <Divider />
            <View style={style.dataContainer}>
                <View style={style.measureContainer}>
                    <FontAwesome5 name='heartbeat' color={COLORS.LightCoral} size={50} />
                    <Title style={style.title}>{props.dataHeartRate ? props.dataHeartRate : '--'} BPM</Title>
                </View>
                <View >
                    <LinearGradient
                        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                        colors={[COLORS.blueTermometer, COLORS.greenTermometer, COLORS.yellowTermometer, COLORS.orangeTermometer, COLORS.redTermometer]}
                        style={style.bar}
                    >
                        <View style={{ width: width, alignItems: 'flex-end' }}>
                            <FontAwesome size={10} name={'heart'} color={COLORS.text} />
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