import { COLORS } from "config/Colors";
import { SIZES } from "config/Sizes";
import { StyleSheet } from "react-native";

export const homeStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.background
    },
    card: {
        alignItems: "center",
        justifyContent: "center",
        textAlign: 'center',
        marginVertical: 10,
        height: 100,
        width: 100,
        flexDirection: 'row',
        backgroundColor: COLORS.background,
        alignSelf: "center",
    },
    title: {
        textAlign: 'center',
        fontSize: SIZES.subtitle,
        color: COLORS.text
    },
    eventsContainer: {
        paddingTop: 10,
        width: '93%',
        height: 200,
        alignSelf: 'center',
        marginTop: 15,
        alignItems: 'center',
        justifyContent: 'center'
    }
})