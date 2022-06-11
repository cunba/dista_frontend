import { IconProps, Toolbar } from "components/Toolbar";
import { COLORS } from "config/Colors";
import { commonStyles } from "config/Styles";
import i18n from "infrastructure/localization/i18n";
import { FunctionalView } from "infrastructure/views/FunctionalView";
import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { RefreshControl, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Card, Title } from "react-native-paper";
import { back } from "RootNavigation";
import { dateFormat, timeFormatter } from "utils/datetimeFormatterHelper";
import { HeartRatePlotViewModel } from "viewmodels/data/HeartRatePlotViewModel";
import { ambientDataPlotViewStyle } from "./AmbientDataPlotViewStyle";
import { Selection } from "./component/ambientData/Selection";
import { LinePlot } from "./component/LinePlot";

export const HeartRatePlotView: FunctionalView<HeartRatePlotViewModel> = observer(({ vm }) => {
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
        vm.setFinishGetHeartRate(false)
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
                <Card style={ambientDataPlotViewStyle.temperatureCard}>
                    <Card.Content>
                        <Selection
                            daySelected={daySelected}
                            weekSelected={weekSelected}
                            monthSelected={monthSelected}
                            onPress={onPressMenu}
                        />
                    </Card.Content>
                    <Card.Content style={ambientDataPlotViewStyle.cardContent}>
                        <Title style={ambientDataPlotViewStyle.title}>{i18n.t('data.heartRate.title').toUpperCase()}</Title>
                        <Title style={ambientDataPlotViewStyle.dataSelected}>{dataSelected} BPM</Title>
                        {vm.finishGetHeartRate && daySelected && vm.dayData ?
                            <>
                                <Text style={ambientDataPlotViewStyle.text}>{dateFormat(new Date(vm.dateInterval!.maxDay!), 'DD/MM/YYYY')} {dateSelected}</Text>
                                <LinePlot
                                    data={vm.dayData!.measures!}
                                    lineColor={COLORS.LightCoral}
                                    maxDate={vm.dateInterval!.maxDay!}
                                    minDate={vm.dateInterval!.minDay!}
                                    minData={(vm.dayData!.minMeasure! - 48)}
                                    maxData={(vm.dayData!.maxMeasure! + 48)}
                                    onTouchEnd={() => { setScroll(true); setDataSelected('--'); setDateSelected('') }}
                                    onTouchStart={() => setScroll(false)}
                                    setDataSelected={(data) => setDataSelected(data)}
                                    setDateSelected={(date) => setDateSelected(timeFormatter(new Date(date).getHours(), new Date(date).getMinutes()))}
                                />
                            </>
                            :
                            vm.finishGetHeartRate && weekSelected && vm.weekData ?
                                <>
                                    <Text style={ambientDataPlotViewStyle.text}>{dateSelected}</Text>
                                    <LinePlot
                                        data={vm.weekData!.measures!}
                                        lineColor={COLORS.LightCoral}
                                        maxDate={vm.dateInterval!.maxWeek!}
                                        minDate={vm.dateInterval!.minWeek!}
                                        minData={0}
                                        maxData={120}
                                        onTouchEnd={() => { setScroll(true); setDataSelected('--'); setDateSelected('') }}
                                        onTouchStart={() => setScroll(false)}
                                        setDataSelected={(data) => setDataSelected(data)}
                                        setDateSelected={(date) => setDateSelected(dateFormat(new Date(date), 'DD/MM/YYYY HH:mm'))}
                                    />
                                </>
                                :
                                vm.finishGetHeartRate && monthSelected && vm.monthData ?
                                    <>
                                        <Text style={ambientDataPlotViewStyle.text}>{dateSelected}</Text>
                                        <LinePlot
                                            data={vm.monthData!.measures!}
                                            lineColor={COLORS.LightCoral}
                                            maxDate={vm.dateInterval!.maxMonth!}
                                            minDate={vm.dateInterval!.minMonth!}
                                            minData={0}
                                            maxData={120}
                                            onTouchEnd={() => { setScroll(true); setDataSelected('--'); setDateSelected('') }}
                                            onTouchStart={() => setScroll(false)}
                                            setDataSelected={(data) => setDataSelected(data)}
                                            setDateSelected={(date) => setDateSelected(dateFormat(new Date(date), 'DD/MM/YYYY HH:mm'))}
                                        />
                                    </>
                                    :
                                    <>
                                        <Text style={ambientDataPlotViewStyle.text}> </Text>
                                        <LinePlot
                                            data={[]}
                                            lineColor={COLORS.orangeTermometer}
                                            maxDate={daySelected ? vm.dateInterval!.maxDay! : weekSelected ? vm.dateInterval!.maxWeek! : vm.dateInterval.maxMonth!}
                                            minDate={daySelected ? vm.dateInterval!.minDay! : weekSelected ? vm.dateInterval!.minWeek! : vm.dateInterval.minMonth!}
                                            minData={0}
                                            maxData={120}
                                            onTouchEnd={() => { }}
                                            onTouchStart={() => setScroll(false)}
                                            setDataSelected={(data) => { }}
                                            setDateSelected={(date) => { }}
                                        />
                                    </>
                        }
                    </Card.Content>
                </Card>
            </ScrollView>
        </>
    )
})