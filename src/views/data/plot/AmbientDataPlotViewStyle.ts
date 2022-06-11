import { COLORS } from "config/Colors";
import { SIZES } from "config/Sizes";
import { StyleSheet } from "react-native";

export const ambientDataPlotViewStyle = StyleSheet.create({
    temperatureCard: {
        width: '100%',
        backgroundColor: COLORS.background,
        justifyContent: 'center',
        alignItems: 'center'
    },
    pressureHumidityCard: {
        width: '100%',
        backgroundColor: COLORS.background,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    cardContent: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20
    },
    title: {
        fontSize: SIZES.title
    },
    dataSelected: {
        marginVertical: 10
    },
    text: {
        marginBottom: -30, color: 'grey'
    }
})