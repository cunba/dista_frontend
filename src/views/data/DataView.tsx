import { DrawerActions } from "@react-navigation/native";
import { IconProps, Toolbar } from "components/Toolbar";
import { COLORS } from "config/Colors";
import { commonStyles } from "config/Styles";
import i18n from "infrastructure/localization/i18n";
import { FunctionalView } from "infrastructure/views/FunctionalView";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { RefreshControl, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Card } from "react-native-paper";
import Svg from "react-native-svg";
import { dispatch } from "RootNavigation";
import { Bar } from "victory-native";
import { DataViewModel } from "viewmodels/data/DataViewModel";
import { Temperature } from "./component/Temperature";

export const DataView: FunctionalView<DataViewModel> = observer(({ vm }) => {
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        onRefresh()
    }, [])

    const onRefresh = () => {
        setLoading(true)
        vm.constructorFunctions()
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

                color={COLORS.button}
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
                <Card onPress={() => { }} style={{ height: 150 }}>
                    <Card.Content style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: '100%' }}>
                        <Temperature
                            data={vm.lastTemperature?.data}
                        />
                        <View />
                        <View />
                    </Card.Content>
                </Card>
                <Card onPress={() => { }} style={{ height: 150, marginTop: 15 }}>
                    <Card.Content>

                    </Card.Content>
                </Card>
                <Card onPress={() => { }} style={{ height: 150, marginTop: 15 }}>
                    <Card.Content>

                    </Card.Content>
                </Card>
                <Card onPress={() => { }} style={{ height: 150, marginTop: 15 }}>
                    <Card.Content>

                    </Card.Content>
                </Card>
                <Card onPress={() => { }} style={{ height: 150, marginTop: 15 }}>
                    <Card.Content>

                    </Card.Content>
                </Card>

            </ScrollView>
        </>
    )
})