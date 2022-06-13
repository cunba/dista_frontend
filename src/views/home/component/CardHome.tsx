import { Icon } from "native-base"
import React from "react"
import { Text } from "react-native"
import { Card } from "react-native-paper"
import { homeStyles } from "../HomeStyles"

export interface CardHomeProps {
    onPress: () => void
    title: string
    color: string
    iconStyle: any
    iconName: string
    iconDirectory: 'AntDesign' | 'Entypo' | 'EvilIcons' | 'Feather' | 'FontAwesome' | 'FontAwesome5' | 'Foundation' | 'Ionicons' | 'MaterialCommunityIcons' | 'MaterialIcons' | 'Octicons' | 'SimpleLineIcons' | 'Zocial'
}

export const CardHome = (props: CardHomeProps) => {

    return (
        <Card elevation={10} mode={"elevated"} style={homeStyles.card} onPress={props.onPress}>
            <Text style={[homeStyles.title, {color: props.color}]}>{props.title}</Text>
            <Icon
                name={props.iconName}
                type={props.iconDirectory}
                style={props.iconStyle}
            />
        </Card>
    )
}