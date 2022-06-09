import { IconProps, Toolbar } from "components/Toolbar";
import { COLORS } from "config/Colors";
import { SIZES } from "config/Sizes";
import { commonStyles } from "config/Styles";
import i18n from "infrastructure/localization/i18n";
import { FunctionalView } from "infrastructure/views/FunctionalView";
import { observer } from "mobx-react";
import { View } from "native-base";
import React, { useEffect, useState } from "react";
import { RefreshControl, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Card, Title } from "react-native-paper";
import { back } from "RootNavigation";
import { dateFormat, timeFormatter } from "utils/datetimeFormatterHelper";
import { AmbientDataViewModel } from "viewmodels/data/AmbientDataViewModel";
import { Selection } from "./component/ambientData/Selection";
import { LinePlot } from "./component/LinePlot";

export const AmbientDataView: FunctionalView<AmbientDataViewModel> = observer(({ vm }) => {
    const [loading, setLoading] = useState(false)
    const [scroll, setScroll] = useState(true)
    const [dataSelected, setDataSelected] = useState('--')
    const [dateSelected, setDateSelected] = useState('')
    const [daySelected, setDaySelected] = useState(true)
    const [weekSelected, setWeekSelected] = useState(false)
    const [monthSelected, setMonthSelected] = useState(false)

    useEffect(() => {
        onRefresh()
    }, [])

    const onRefresh = async () => {
        setLoading(true)
        await vm.constructorFunctions()
        setLoading(false)
    }

    const onPressMenu = (option: string) => {
        switch (option) {
            case 'day':
                setWeekSelected(false)
                setMonthSelected(false)
                setDaySelected(true)
                break
            case 'week':
                console.log('press week')
                setDaySelected(false)
                setMonthSelected(false)
                setWeekSelected(true)
                break
            case 'month':
                setDaySelected(false)
                setWeekSelected(false)
                setMonthSelected(true)
                break
            default:
                setWeekSelected(false)
                setMonthSelected(false)
                setDaySelected(true)
        }
    }

    const iconLeftProps: IconProps = {
        onPress: () => back(),
        name: 'left',
        type: 'AntDesign'
    }

    return (
        <>
            <Toolbar
                isIconLeft={true}
                iconLeft={iconLeftProps}

                color={COLORS.touchables}
                title={i18n.t('data.ambient.title').toUpperCase()}
                textStyle={commonStyles.titleToolbar}

                isIconRight={false}
            />
            <ScrollView
                refreshControl={(
                    <RefreshControl
                        refreshing={loading}
                        onRefresh={onRefresh}
                    />
                )}
                scrollEnabled={scroll}
            >

                <Card style={{ width: '100%', backgroundColor: COLORS.background, justifyContent: 'center', alignItems: 'center' }}>
                    <Card.Content>
                        <Selection
                            daySelected={daySelected}
                            weekSelected={weekSelected}
                            monthSelected={monthSelected}
                            onPress={onPressMenu}
                        />
                    </Card.Content>
                    <Card.Content style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 20 }}>
                        <Title style={{ fontSize: SIZES.title }}>{i18n.t('data.temperature.title').toUpperCase()}</Title>
                        <Title style={{ marginVertical: 10 }}>{dataSelected} ºC</Title>
                        <Text style={{marginBottom: -30, color: 'grey'}}>{dateFormat(new Date(vm.maxDate), 'DD/MM/YYYY')} {dateSelected}</Text>
                        {vm.finishGetTemperature ?
                            <LinePlot
                                data={vm.dayDataTemperature!}
                                lineColor={COLORS.orangeTermometer}
                                maxData={vm.maxTemperature!}
                                minData={vm.minTemperature!}
                                maxDate={1653955199000}
                                minDate={1653868800000}
                                onTouchEnd={() => { setScroll(true); setDataSelected('--'); setDateSelected('') }}
                                onTouchStart={() => setScroll(false)}
                                setDataSelected={(data) => setDataSelected(data)}
                                setDateSelected={(date) => setDateSelected(timeFormatter(date.getHours(), date.getMinutes()))}
                            />
                            :
                            <View style={{ height: 300 }}></View>
                        }
                    </Card.Content>
                </Card>
            </ScrollView>
        </>
    )
})