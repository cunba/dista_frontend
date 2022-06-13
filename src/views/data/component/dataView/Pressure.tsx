import { Measure } from "data/model/Measure";
import { View } from "native-base";
import React from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import LinearGradient from "react-native-linear-gradient"
import { StyleSheet, Text } from "react-native";
import i18n from "infrastructure/localization/i18n";
import { COLORS } from "config/Colors";
import { Divider } from "react-native-paper";

export const Pressure = (props?: Measure) => {
    let height = props?.data ? (120 * (props.data - 955) / 100) : undefined

    const getComment = () => {
        if (props?.data) {
            if (props.data > 1035) {
                return i18n.t('data.high')
            }
            if (props.data <= 1035 && props.data > 990) {
                return i18n.t('data.medium')
            }
            if (props.data <= 990) {
                return i18n.t('data.low')
            }
        }
        return i18n.t('noData')
    }

    return (
        <View style={style.container}>
            <View style={style.textContainer}>
                <Text>{i18n.t('data.pressure.title').toUpperCase()}</Text>
                {props?.data ?
                    <View style={{ justifyContent: 'space-evenly', alignItems: 'center' }}>
                        <Text style={style.text}>{props?.data}</Text>
                        <Text style={[style.text, { marginTop: -15 }]}>hPa</Text>
                    </View>
                    :
                    <View style={{ justifyContent: 'space-evenly', alignItems: 'center' }}>
                        <Text style={style.text}>-</Text>
                        <Text style={[style.text, { marginTop: -15 }]}>hPa</Text>
                    </View>
                }
                <Text>{getComment()}</Text>
            </View>
            <View style={style.bar}>
                <View style={[{ height: height }, style.barProgress]}>
                </View>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        width: 'auto',
        height: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'transparent'
    },
    bar: {
        width: 10,
        height: 120,
        borderRadius: 2,
        marginLeft: 10,
        justifyContent: 'flex-end',
        backgroundColor: COLORS.backBackground
    },
    barProgress: {
        backgroundColor: COLORS.OperaMauve,
        borderBottomRightRadius: 2,
        borderBottomLeftRadius: 2
    },
    textContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 120
    },
    text: {
        fontFamily: 'Teko-Light',
        fontSize: 30
    }
})