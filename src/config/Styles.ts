import { Dimensions, StyleSheet } from 'react-native';
import { COLORS } from './Colors';
import { SIZES } from './Sizes';

export const stylesRicyclerList = StyleSheet.create({
    recyclerListViewContainer: {
        flex: 6,
        paddingTop: 10,
    },
    emptyList: {
        paddingTop: 20,
        textAlign: 'center',
        fontSize: SIZES.text,
        color: COLORS.text,
    },
    recyclerListView: {
        maxHeight: Dimensions.get('window').height * 0.67
    },
    rowCellContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 40
    },
    rowCellContainerCalendar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '95%',
        paddingLeft: '10%'
    },
    dateCell: {
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    title: {
        fontSize: SIZES.h1,
        fontWeight: 'bold',
        color: COLORS.text,
        paddingTop: 10
    },
    location: {
        flexDirection: "row",
        marginLeft: -4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    typeCell: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        width: 80
    },
    card: {
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 10,
        height: 70,
        width: "90%",
        flexDirection: 'row',
        // backgroundColor: COLORS.background,
        alignSelf: "center",
    },
    containerOptions: {
        width: '18%',
        height: 70,
        marginVertical: 10,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export const formStyles = StyleSheet.create({
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
        height: 50,
        color: COLORS.text,
        paddingLeft: 20,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 10
    },
    button: {
        textAlign: 'center',
        fontSize: SIZES.text_button,
        width: 300,
        paddingVertical: 10,
        backgroundColor: COLORS.touchables,
        borderRadius: 3
    }
})

export const commonStyles = StyleSheet.create({
    container: {    
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: COLORS.background,
        paddingTop: 10
    },
    spinner: {
        paddingBottom: 15,
        backgroundColor: 'white',
    },
    title: {
        textAlign: 'center',
        fontSize: SIZES.title,
        color: COLORS.text,
        width: '100%',
        marginTop: -10
    },
    titleToolbar: {
        textAlign: 'center',
        fontSize: 25,
        color: COLORS.textButtons
    },
    text: {
        textAlign: 'center',
        fontSize: SIZES.text,
        color: COLORS.text,
    },
    textButton: {
        textAlign: 'center',
        fontSize: SIZES.text_button,
        color: COLORS.textButtons,
    },
    textInOut: {
        textAlign: 'center',
        fontSize: SIZES.text,
        color: COLORS.text,
        paddingBottom: 5,
    },
    containerOptions: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingLeft: 60,
        paddingRight: 60,
        paddingTop: 30,
    },
    containerInOut: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    containerRadioButtonIn: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: 'auto',
    },
    containerRadioButtonOut: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: 'auto',
        marginRight: -7
    },
})