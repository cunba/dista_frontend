import { COLORS } from 'config/Colors';
import { Body, Header, Icon, Left, Right } from 'native-base';
import React from 'react';
import { StatusBar, StyleSheet, Text, TouchableOpacity } from 'react-native';

export interface IconProps {
    type: "AntDesign" | "Entypo" | "EvilIcons" | "Feather" | "FontAwesome" | "FontAwesome5" | "Foundation" | "Ionicons" | "MaterialCommunityIcons" | "MaterialIcons" | "Octicons" | "SimpleLineIcons" | "Zocial" | undefined,
    name: string,
    style?: any,
    onPress: () => void
}

export interface ToolbarProps {
    title?: string;
    color?: string;
    textStyle?: any;
    iconLeft?: IconProps
    isIconLeft: boolean
    isIconRight: boolean
    iconRight?: IconProps
}

export const Toolbar = (props: ToolbarProps) => {
    return (
        <>
            <Header style={props.color ? { backgroundColor: props.color, elevation: 3 } : styles.headerHome} noShadow>

                <Left style={styles.position}>
                    {props.isIconLeft ?
                        <TouchableOpacity
                            onPress={() => props.iconLeft!.onPress()}>
                            <Icon type={props.iconLeft!.type} name={props.iconLeft!.name ? props.iconLeft!.name : "left"} style={props.iconLeft!.style ? props.iconLeft?.style : { color: 'white' }} />
                        </TouchableOpacity>
                        : null
                    }
                </Left>
                <Body style={styles.textPosition}>
                    <Text style={props.textStyle}>{props.title} </Text>
                </Body>
                <Right style={styles.position}>
                    {props.isIconRight ?
                        <TouchableOpacity
                            onPress={() => props.iconRight!.onPress()}>
                            <Icon type={props.iconRight!.type} name={props.iconRight!.name} style={props.iconRight!.style ? props.iconRight!.style : { color: 'white' }} />
                        </TouchableOpacity>
                        : null
                    }
                </Right>

            </Header>
        </>
    );
};

export default Toolbar;

const styles = StyleSheet.create({
    headerHome: {

        backgroundColor: 'transparent',

    },
    position: {
        paddingTop: 5,
        maxWidth: 50,
    },
    textPosition: {
        paddingTop: 5,
        alignItems: 'center',
    },
});