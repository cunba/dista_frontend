import { COLORS } from "config/Colors";
import { SIZES } from "config/Sizes";
import { Dimensions, StyleSheet } from "react-native";

export const timetableStyles = StyleSheet.create({
    headerStyle: {
        backgroundColor: COLORS.touchables
    },
    container: {
        flex: 1,
        backgroundColor: "#F8F8F8"
    },
    addContainer: {
        height: Dimensions.get('window').height * 0.2,
        width: '100%',
        backgroundColor: COLORS.touchables
    },
    textinput: {
        fontSize: SIZES.text,
        width: 50,
        height: 20,
        color: COLORS.text,
        paddingLeft: 20,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: COLORS.background
    },
    containerInput: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '85%',
        alignSelf: 'center',
        height: 40,
        marginVertical: 10
    },
    addText: {
        fontSize: SIZES.text,
        color: COLORS.textButtons,
    },
    timeAdd: {
        height: 20,
        width: 40,
        backgroundColor: 'green',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    timeRemove: {
        height: 20,
        width: 40,
        backgroundColor: 'red',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
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
    containerAdd: {
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 60,
        position: 'relative',
        borderRadius: 2,
        backgroundColor: COLORS.background,
        marginTop: '70%',
    },
    title: {
        textAlign: 'left',
        width: '100%',
        color: COLORS.text,
        fontSize: SIZES.text,
        padding: 10
    },
    text: {
        textAlign: 'left',
        fontSize: SIZES.text_button,
        color: COLORS.text,
        paddingBottom: 10,
        paddingHorizontal: '10%'
    },
    containerOkCancel: {
        flexDirection: 'row',
        width: '100%',
        height: 50,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopColor: 'grey',
        borderTopWidth: 1,
        marginTop: 10
    },
    textButton: {
        textAlign: 'center',
        fontSize: SIZES.text_button,
        color: COLORS.text
    },
    modalCancelContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('window').width / 2 - 60,
        height: '100%',
        borderRightColor: 'grey',
        borderRightWidth: 1
    },
    modalOkContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('window').width / 2 - 60,
        height: '100%'
    },
    timeButtonsContainer: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 55
    },
    timesContainer: {
        backgroundColor: '#BADCD3',
        width: 65,
        height: 55,
        borderRadius: 5,
        marginLeft: 10,
        justifyContent: 'center',
        alignItems: 'center'
    }
})