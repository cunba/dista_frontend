import { COLORS } from 'config/Colors'
import { LightningToShow } from 'data/model/LightningToShow'
import i18n from 'infrastructure/localization/i18n'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Divider, Title } from 'react-native-paper'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { dateFormat, timeFormatter } from 'utils/datetimeFormatterHelper'
import { VictoryPie } from 'victory-native'
import { dataViewStyle } from 'views/data/DataViewStyle'

export interface LightningProps {
    data?: LightningToShow
    loading: boolean
}

export const Lightning = (props: LightningProps) => {

    const getTimeComment = () => {
        const today = new Date()
        const measureDate = props.data?.date ? new Date(props.data!.date) : undefined

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
                <Title>{i18n.t('data.lightning.title').toUpperCase()}</Title>
                <Text style={dataViewStyle.ambientTextDate}>{getTimeComment()}</Text>
            </View>
            <Divider />
            <View style={style.dataContainer}>
                <View style={style.measureContainer}>
                    <MaterialCommunityIcons name='lightbulb-on' color={COLORS.MaximumYellowRed} size={50} />
                    <Title style={style.title}>{props.data?.data ? props.data?.data : '--'} K</Title>
                </View>
                <View >
                    <VictoryPie
                        colorScale={[COLORS.blueTermometer, COLORS.greenTermometer, COLORS.redTermometer]}
                        data={props.data ? [props.data!.blueLightningToPie, props.data!.greenLightningToPie, props.data!.redLightningToPie] : []}
                        height={180}
                        width={180}
                    />
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
        height: 100
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