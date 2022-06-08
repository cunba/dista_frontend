import { DrawerActions } from "@react-navigation/native";
import { IconProps, Toolbar } from "components/Toolbar";
import { COLORS } from "config/Colors";
import { ROUTES } from "config/Constants";
import { commonStyles } from "config/Styles";
import i18n from "infrastructure/localization/i18n";
import { FunctionalView } from "infrastructure/views/FunctionalView";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { RefreshControl, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Card, Divider, Title } from "react-native-paper";
import { dispatch, navigate } from "RootNavigation";
import { dateFormat, timeFormatter } from "utils/datetimeFormatterHelper";
import { DataViewModel } from "viewmodels/data/DataViewModel";
import { Humidity } from "./component/Humidity";
import { Pressure } from "./component/Pressure";
import { Temperature } from "./component/Temperature";
import { dataViewStyle } from "./DataViewStyle";

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

    const getTimeComment = () => {
        const today = new Date()
        const measureDate = vm.lastOxygen ? new Date(vm.lastPressure!.date!) : undefined

        if (measureDate) {
            if (today.getDate() === measureDate?.getDate()) {
                return i18n.t('data.dateMessage.today') + timeFormatter(measureDate.getHours(), measureDate.getMinutes())
            } else {
                return i18n.t('data.dateMessage') + dateFormat(measureDate, 'DD/MM/yyyy HH:mm')
            }
        } else {
            return loading ? '' : i18n.t('data.dateMessage.noDate')
        }
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
                        <View style={dataViewStyle.ambientTitleContainer}>
                            <Title>{i18n.t('data.ambient.title').toUpperCase()}</Title>
                            <Text style={dataViewStyle.ambientTextDate}>{getTimeComment()}</Text>
                        </View>
                        <Divider />
                        <View style={dataViewStyle.ambientDataContainer}>
                            <Temperature
                                data={vm.lastTemperature?.data}
                                date={vm.lastTemperature?.date}
                            />
                            <Humidity
                                data={vm.lastHumidity?.data}
                                date={vm.lastHumidity?.date}
                            />
                            <Pressure
                                data={vm.lastPressure?.data}
                                date={vm.lastPressure?.date}
                            />
                        </View>
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