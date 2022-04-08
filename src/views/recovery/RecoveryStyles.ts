import { COLORS } from 'config/Colors';
import { SIZES } from 'config/Sizes';
import { StyleSheet } from 'react-native';

export const recoveryStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.background,
    },
    title: {
        textAlign: 'center',
        fontSize: SIZES.title,
        color: COLORS.text,
        paddingBottom: 20
    },
    textinput: {
        fontSize: SIZES.text,
        width: 300,
        color: COLORS.text,
        paddingLeft: 20,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 10
    },
    textRecover: {
        textAlign: 'center',
        fontSize: SIZES.text,
        paddingTop: 10,
        paddingBottom: 20,
        color: COLORS.text
    },
    button: {
        textAlign: 'center',
        fontSize: SIZES.text_button,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: COLORS.touchables
    }
})