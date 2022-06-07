import { Measure } from "data/model/disband/Measure";
import { Title, View } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";
import LinearGradient from 'react-native-linear-gradient'
import { Circle } from "react-native-svg";

export const Temperature = (props?: Measure) => {
    return (
        <View style={style.container}>
            <LinearGradient
                colors={['purple', 'red', 'orange', 'yellow', 'green', 'blue']}
                style={style.bar}
            >
                
            </LinearGradient>
            <View>
                <Title style={{fontFamily: 'Teko-Light'}}>{props?.data?.toString()} ºC</Title>
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
        height: '100%',
        borderRadius: 2,
        // borderColor: 'grey',
        // borderWidth: 0.5
    },
    textContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})