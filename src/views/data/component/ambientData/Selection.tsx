import { COLORS } from "config/Colors"
import i18n from "infrastructure/localization/i18n"
import React from "react"
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native"

export interface SelectionProps {
    daySelected: boolean
    weekSelected: boolean
    monthSelected: boolean
    onPress: (option: string) => void
}

export const Selection = (props: SelectionProps) => {

    return (
        <View style={style.container}>
            <View style={style.touchablesContainer}>
                <TouchableOpacity
                    style={[style.touchable, { backgroundColor: props.daySelected ? COLORS.primaryDark : 'transparent' }]}
                    onPress={() => props.onPress('day')}
                >
                    <Text style={{color: props.daySelected ? COLORS.textButtons : COLORS.text}}>{i18n.t('data.daySelected')}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[style.touchable, { backgroundColor: props.weekSelected ? COLORS.primaryDark : 'transparent' }]}
                    onPress={() => props.onPress('week')}
                >
                    <Text style={{color: props.weekSelected ? COLORS.textButtons : COLORS.text}}>{i18n.t('data.weekSelected')}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[style.touchable, { backgroundColor: props.monthSelected ? COLORS.primaryDark : 'transparent' }]}
                    onPress={() => props.onPress('month')}
                >
                    <Text style={{color: props.monthSelected ? COLORS.textButtons : COLORS.text}}>{i18n.t('data.monthSelected')}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    touchable: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        borderBottomRightRadius: 20,
        paddingHorizontal: 10,
        width: (Dimensions.get('screen').width - 40) / 3
    },
    touchablesContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.backBackground,
        borderRadius: 20
    },
    container: {
        paddingHorizontal: 20,
        paddingTop: 10,
        height: 40,
        backgroundColor: COLORS.background
    }
})