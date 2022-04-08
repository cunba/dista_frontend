import { COLORS } from "config/Colors";
import { SIZES } from "config/Sizes";
import { Dimensions, StyleSheet } from "react-native";

export const agendaStyles = StyleSheet.create({
    recyclerListViewContainer: {
        paddingTop: 10,
        justifyContent: 'center',
        alignContent: 'center',
        flexDirection: 'column',
        width: '100%',
        maxHeight: Dimensions.get('window').height * 0.55,
        minHeight: 80
    },
    date: {
        height: 25,
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: COLORS.background
    },
    dateText: {
        textAlign: 'center',
        fontSize: SIZES.text_button,
        color: '#455665',
        width: '100%',
        /* paddingTop: 10, */
        /* backgroundColor: COLORS.background */
    },
    switch: {
        alignSelf: 'flex-end',
        flexDirection: 'row',
        paddingRight: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inOutSwitchText: {
        textAlign: 'center',
        fontSize: SIZES.text,
        color: COLORS.textButtons
    },
    title: {
        alignSelf: 'flex-start',
        textAlign: 'center',
        color: COLORS.text,
        fontSize: 17,
        padding: 10,
        paddingLeft: 20
    },
    alertContainer: {
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: 'black',
        width: '100%',
        height: '100%',
        opacity: 0.7,
        position: 'absolute'
    },
    containerOkCancel: {
        flexDirection: 'row',
        width: '100%',
        height: 50,
        justifyContent: 'space-around',
        alignItems: 'center',
        borderTopColor: 'grey',
        borderTopWidth: 1,
    },
    textButton: {
        textAlign: 'center',
        fontSize: SIZES.text_button,
        color: COLORS.text,
        paddingHorizontal: 20,
        paddingBottom: 5
    },
    containerTimePicker: {
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
        position: 'relative',
        borderRadius: 2,
        backgroundColor: COLORS.background,
        marginTop: '70%',
    }
})