import { StyleSheet } from "react-native";


export const dataViewStyle = StyleSheet.create({
    ambientDataContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100%',
        marginTop: -15
    },
    ambientTitleContainer: {
        marginTop: -5,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    ambientTextDate: {
        color: 'grey',
        fontSize: 12,
        marginLeft: 10
    }
})