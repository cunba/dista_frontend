import { COLORS } from "config/Colors";
import { Measure } from "data/model/Measure";
import i18n from "infrastructure/localization/i18n";
import { View } from "native-base";
import React from "react";
import { StyleSheet, Text } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from "react-native-vector-icons/FontAwesome";

export const Temperature = (props: Measure) => {
    let height = props.data ? (120 * (props.data + 20) / 70) : undefined

    const getComment = () => {
        if (props.data) {
            if (props.data >= 40) {
                return i18n.t('data.risk')
            }
            if (props.data < 40 && props.data > 33) {
                return i18n.t('data.high')
            }
            if (props.data <= 33 && props.data > 12) {
                return i18n.t('data.medium')
            }
            if (props.data <= 12) {
                return i18n.t('data.low')
            }
        }
        return i18n.t('noData')
    }

    return (
        <View style={style.container}>
            <LinearGradient
                colors={[COLORS.redTermometer, COLORS.orangeTermometer, COLORS.yellowTermometer, COLORS.greenTermometer, COLORS.blueTermometer]}
                style={style.bar}
            >
                <View style={{ height: height }}>
                    <FontAwesome size={12} name={'circle-o'} color={COLORS.text} />
                </View>
            </LinearGradient>
            <View style={style.textContainer}>
                <Text>{i18n.t('data.temperature.title').toUpperCase()}</Text>
                {props.data ?
                    <Text style={style.text}>{props?.data} ºC</Text>
                    :
                    <Text style={style.text}>- ºC</Text>
                }
                <Text>{getComment()}</Text>
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
        marginRight: 10,
        justifyContent: 'flex-end'
        // borderColor: 'grey',
        // borderWidth: 0.5
    },
    textContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 120
    },
    text: {
        fontFamily: 'Teko-Light',
        fontSize: 45
    }
})