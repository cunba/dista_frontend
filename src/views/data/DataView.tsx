import { DrawerActions } from "@react-navigation/native";
import { IconProps, Toolbar } from "components/Toolbar";
import { COLORS } from "config/Colors";
import { ROUTES } from "config/Constants";
import { commonStyles } from "config/Styles";
import i18n from "infrastructure/localization/i18n";
import { FunctionalView } from "infrastructure/views/FunctionalView";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { RefreshControl } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Card } from "react-native-paper";
import { dispatch, navigate } from "RootNavigation";
import { DataViewModel } from "viewmodels/data/DataViewModel";
import { AmbientData } from "./component/dataView/AmbientData";
import { HeartRate } from "./component/dataView/HeeartRate";
import { Oxygen } from "./component/dataView/Oxygen";

export const DataView: FunctionalView<DataViewModel> = observer(({ vm }) => {
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        onRefresh()
    }, [])

    const onRefresh = async () => {
        setLoading(true)
        await vm.constructorFunctions()
        setLoading(false)
    }

    const iconLeftProps: IconProps = {
        onPress: () => dispatch(DrawerActions.openDrawer()),
        name: 'menu-fold',
        type: 'AntDesign'
    }

    return (
        <>
            <Toolbar
                isIconLeft={true}
                iconLeft={iconLeftProps}

                color={COLORS.touchables}
                title={i18n.t('data.title').toUpperCase()}
                textStyle={commonStyles.titleToolbar}

                isIconRight={false}
            />
            <ScrollView
                style={{ paddingTop: 15, paddingHorizontal: 10 }}
                refreshControl={(
                    <RefreshControl
                        refreshing={loading}
                        onRefresh={onRefresh}
                    />
                )}
            >
                <Card onPress={() => { navigate(ROUTES.AMBIENT_DATA, null) }} style={{ height: 200 }}>
                    <Card.Content>
                        <AmbientData
                            dataTemperature={vm.lastTemperature?.data}
                            dateTemperature={vm.lastTemperature?.date}
                            dataHumidity={vm.lastHumidity?.data}
                            dateHumidity={vm.lastHumidity?.date}
                            dataPressure={vm.lastPressure?.data}
                            datePressure={vm.lastPressure?.date}
                            loading={loading}
                        />
                    </Card.Content>
                </Card>
                <Card onPress={() => { navigate(ROUTES.HEART_RATE, null) }} style={{ height: 130, marginTop: 15 }}>
                    <Card.Content>
                        <HeartRate
                            dataHeartRate={vm.lastHeartRate?.data}
                            dateHeartRate={vm.lastHeartRate?.date}
                            loading={loading}
                        />
                    </Card.Content>
                </Card>
                <Card onPress={() => { navigate(ROUTES.OXYGEN, null) }} style={{ height: 130, marginTop: 15 }}>
                    <Card.Content>
                        <Oxygen
                            dataOxygen={vm.lastOxygen?.data}
                            dateOxygen={vm.lastOxygen?.date}
                            loading={loading}
                        />
                    </Card.Content>
                </Card>

            </ScrollView>
        </>
    )
})