import React, { useEffect, useState } from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    StatusBar,
} from 'react-native';
import { Header, Left, Body, Right, Icon } from 'native-base';
import { COLORS } from 'config/Colors';

const Colors = {
    background: '#BCC4DB',
    b1: '#C0A9B0',
    b2: '#7880B5',
    b3: '#69852C9',
    b4: '#6BBAEC',
    b5: '#00b33c',
    b6: '#ff3333',
    inputsColor: 'black',
    cardColor: 'white',
    headerColor: COLORS.button,
    blackWithOpacity: 'rgba(0, 0, 0, 0.85)',
    whiteWithOpacity: 'rgba(255, 255, 255, 0.6)',
    backgroundColorLogin: 'rgba(245, 245, 245, 0.7)',
    error: 'rgba(223, 38, 38, 0.74)',
    buttonsColor: 'rgba(0, 0, 0, 0.85)',
    separator: '#CED0CE',
    confirmButtonColor: '#DD6B55',
    backgroundConfirmButton: '#ff4d4d',
    inputsEditModalTheme: 'red',
};
const styles = StyleSheet.create({
    header: {
        height: 58,
        alignItems: 'center',
        backgroundColor: Colors.headerColor,
        flexDirection: 'row',
    },
    headerHome: {

        backgroundColor: 'transparent',

    },
    textHeader: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    position: {
        paddingTop: 5,
        maxWidth: 50,
    },
    textPosition: {
        paddingTop: 5,
        alignItems: 'center',
    },
    imageHeaderMenu: {
        width: 25,
        height: 25,
        marginRight: 5

    },
    avatar: {
        backgroundColor: Colors.blackWithOpacity,
    },
});

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
