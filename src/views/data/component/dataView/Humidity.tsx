import { COLORS } from "config/Colors";
import { Measure } from "data/model/Measure";
import i18n from "infrastructure/localization/i18n";
import React from "react";
import { Text, View } from "react-native";
import { Title } from "react-native-paper";
import Svg, { Circle, Text as SVGText } from "react-native-svg";

export const Humidity = (props?: Measure) => {
    const size = 85
    const strokeWidth = 10
    const radius = (size - strokeWidth) / 2;
    const circum = radius * 2 * Math.PI;
    const svgProgress = props?.data ? 100 - props.data : 100

    return (
        <View style={{ margin: 10, justifyContent: 'space-between', alignItems: 'center', height: 120 }}>
            <Text>{i18n.t('data.humidity.title').toUpperCase()}</Text>
            <Svg width={size} height={size}>
                {/* Background Circle */}
                <Circle
                    stroke={COLORS.backBackground}
                    fill="none"
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    {...{ strokeWidth }}
                />

                {/* Progress Circle */}
                <Circle
                    stroke={COLORS.CGBlue}
                    fill="none"
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    strokeDasharray={`${circum} ${circum}`}
                    strokeDashoffset={radius * Math.PI * 2 * (svgProgress / 100)}
                    strokeLinecap="round"
                    transform={`rotate(-90, ${size / 2}, ${size / 2})`}
                    {...{ strokeWidth }}
                />

                {/* Text */}
                {props?.data ?
                    <SVGText
                        fontSize={23}
                        x={size / 2}
                        y={size / 2 + 5}
                        textAnchor="middle"
                        fill={COLORS.text}
                        fontFamily={'Teko-Light'}
                    >
                        {props.data + '%'}
                    </SVGText>
                    :
                    <SVGText
                        fontSize={23}
                        x={size / 2}
                        y={size / 2 + 5}
                        textAnchor="middle"
                        fill={COLORS.text}
                    >
                        {'- %'}
                    </SVGText>
                }
            </Svg>
        </View>
    )
}