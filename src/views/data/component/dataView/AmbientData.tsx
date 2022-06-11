import i18n from "infrastructure/localization/i18n"
import React from "react"
import { Text, View } from "react-native"
import { Divider, Title } from "react-native-paper"
import { dateFormat, timeFormatter } from "utils/datetimeFormatterHelper"
import { dataViewStyle } from "views/data/DataViewStyle"
import { Humidity } from "./Humidity"
import { Pressure } from "./Pressure"
import { Temperature } from "./Temperature"

export interface AmbientDataProps {
    dataTemperature?: number
    dateTemperature?: number
    dataHumidity?: number
    dateHumidity?: number
    dataPressure?: number
    datePressure?: number
    loading: boolean
}

export const AmbientData = (props: AmbientDataProps) => {

    const getTimeComment = () => {
        const today = new Date()
        const measureDate = props.dateTemperature ? new Date(props.dateTemperature) : undefined

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
                <Title>{i18n.t('data.ambient.title').toUpperCase()}</Title>
                <Text style={dataViewStyle.ambientTextDate}>{getTimeComment()}</Text>
            </View>
            <Divider />
            <View style={dataViewStyle.ambientDataContainer}>
                <Temperature
                    data={props.dataTemperature}
                    date={props.dateTemperature} />
                <Humidity
                    data={props.dataHumidity}
                    date={props.dateHumidity} />
                <Pressure
                    data={props.dataPressure}
                    date={props.datePressure} />
            </View>
        </>
    )
}