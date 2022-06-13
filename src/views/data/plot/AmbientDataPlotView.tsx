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
import { AmbientDataPlotViewModel } from "viewmodels/data/AmbientDataPlotViewModel";
import { ambientDataPlotViewStyle } from "./AmbientDataPlotViewStyle";
import { Selection } from "../component/ambientData/Selection";
import { LinePlot } from "../component/LinePlot";

export const AmbientDataPlotView: FunctionalView<AmbientDataPlotViewModel> = observer(({ vm }) => {
    const [loading, setLoading] = useState(false)
    const [scroll, setScroll] = useState(true)
    const [dataSelectedTemperature, setDataSelectedTemperature] = useState('--')
    const [dateSelectedTemperature, setDateSelectedTemperature] = useState('')
    const [dataSelectedPressure, setDataSelectedPressure] = useState('--')
    const [dateSelectedPressure, setDateSelectedPressure] = useState('')
    const [dataSelectedHumidity, setDataSelectedHumidity] = useState('--')
    const [dateSelectedHumidity, setDateSelectedHumidity] = useState('')
    const [daySelected, setDaySelected] = useState(true)
    const [weekSelected, setWeekSelected] = useState(false)
    const [monthSelected, setMonthSelected] = useState(false)

    useEffect(() => {
        onRefresh()
    }, [])

    const onRefresh = async () => {
        setLoading(true)
        vm.setFinishGetHumidity(false)
        vm.setFinishGetPressure(false)
        vm.setFinishGetTemperature(false)
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

                {/* Temperature */}

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
                        <Title style={ambientDataPlotViewStyle.title}>{i18n.t('data.temperature.title').toUpperCase()}</Title>
                        <Title style={ambientDataPlotViewStyle.dataSelected}>{dataSelectedTemperature} ºC</Title>
                        {vm.finishGetTemperature && daySelected && vm.dayDataTemperature ?
                            <>
                                <Text style={ambientDataPlotViewStyle.text}>{dateFormat(new Date(vm.dateInterval!.maxDay!), 'DD/MM/YYYY')} {dateSelectedTemperature}</Text>
                                <LinePlot
                                    data={vm.dayDataTemperature!.measures!}
                                    lineColor={COLORS.orangeTermometer}
                                    maxDate={vm.dateInterval!.maxDay!}
                                    minDate={vm.dateInterval!.minDay!}
                                    minData={vm.dayDataTemperature!.minMeasure!}
                                    maxData={vm.dayDataTemperature!.maxMeasure!}
                                    onTouchEnd={() => { setScroll(true); setDataSelectedTemperature('--'); setDateSelectedTemperature('') }}
                                    onTouchStart={() => setScroll(false)}
                                    setDataSelected={(data) => setDataSelectedTemperature(data)}
                                    setDateSelected={(date) => setDateSelectedTemperature(timeFormatter(new Date(date).getHours(), new Date(date).getMinutes()))}
                                />
                            </>
                            :
                            vm.finishGetTemperature && weekSelected && vm.weekDataTemperature ?
                                <>
                                    <Text style={ambientDataPlotViewStyle.text}>{dateSelectedTemperature}</Text>
                                    <LinePlot
                                        data={vm.weekDataTemperature!.measures!}
                                        lineColor={COLORS.orangeTermometer}
                                        maxDate={vm.dateInterval!.maxWeek!}
                                        minDate={vm.dateInterval!.minWeek!}
                                        minData={vm.weekDataTemperature!.minMeasure!}
                                        maxData={vm.weekDataTemperature!.maxMeasure!}
                                        onTouchEnd={() => { setScroll(true); setDataSelectedTemperature('--'); setDateSelectedTemperature('') }}
                                        onTouchStart={() => setScroll(false)}
                                        setDataSelected={(data) => setDataSelectedTemperature(data)}
                                        setDateSelected={(date) => setDateSelectedTemperature(dateFormat(new Date(date), 'DD/MM/YYYY HH:mm'))}
                                    />
                                </>
                                :
                                vm.finishGetTemperature && monthSelected && vm.monthDataTemperature ?
                                    <>
                                        <Text style={ambientDataPlotViewStyle.text}>{dateSelectedTemperature}</Text>
                                        <LinePlot
                                            data={vm.monthDataTemperature!.measures!}
                                            lineColor={COLORS.orangeTermometer}
                                            maxDate={vm.dateInterval!.maxMonth!}
                                            minDate={vm.dateInterval!.minMonth!}
                                            minData={vm.monthDataTemperature!.minMeasure!}
                                            maxData={vm.monthDataTemperature!.maxMeasure!}
                                            onTouchEnd={() => { setScroll(true); setDataSelectedTemperature('--'); setDateSelectedTemperature('') }}
                                            onTouchStart={() => setScroll(false)}
                                            setDataSelected={(data) => setDataSelectedTemperature(data)}
                                            setDateSelected={(date) => setDateSelectedTemperature(dateFormat(new Date(date), 'DD/MM/YYYY HH:mm'))}
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
                                            minData={20}
                                            maxData={10}
                                            onTouchEnd={() => { }}
                                            onTouchStart={() => setScroll(false)}
                                            setDataSelected={(data) => { }}
                                            setDateSelected={(date) => { }}
                                        />
                                    </>
                        }
                    </Card.Content>
                </Card>

                {/* Humidity */}

                <Card style={ambientDataPlotViewStyle.pressureHumidityCard}>
                    <Card.Content style={ambientDataPlotViewStyle.cardContent}>
                        <Title style={ambientDataPlotViewStyle.title}>{i18n.t('data.humidity.title').toUpperCase()}</Title>
                        <Title style={ambientDataPlotViewStyle.dataSelected}>{dataSelectedHumidity} %</Title>
                        {vm.finishGetHumidity && daySelected && vm.dayDataHumidity ?
                            <>
                                <Text style={ambientDataPlotViewStyle.text}>{dateFormat(new Date(vm.dateInterval!.maxDay!), 'DD/MM/YYYY')} {dateSelectedHumidity}</Text>
                                <LinePlot
                                    data={vm.dayDataHumidity!.measures!}
                                    lineColor={COLORS.CGBlue}
                                    maxDate={vm.dateInterval!.maxDay!}
                                    minDate={vm.dateInterval!.minDay!}
                                    minData={vm.dayDataHumidity!.minMeasure!}
                                    maxData={vm.dayDataHumidity!.maxMeasure!}
                                    onTouchEnd={() => { setScroll(true); setDataSelectedHumidity('--'); setDateSelectedHumidity('') }}
                                    onTouchStart={() => setScroll(false)}
                                    setDataSelected={(data) => setDataSelectedHumidity(data)}
                                    setDateSelected={(date) => setDateSelectedHumidity(timeFormatter(new Date(date).getHours(), new Date(date).getMinutes()))}
                                />
                            </>
                            :
                            vm.finishGetHumidity && weekSelected && vm.weekDataHumidity ?
                                <>
                                    <Text style={ambientDataPlotViewStyle.text}>{dateSelectedHumidity}</Text>
                                    <LinePlot
                                        data={vm.weekDataHumidity!.measures!}
                                        lineColor={COLORS.CGBlue}
                                        maxDate={vm.dateInterval!.maxWeek!}
                                        minDate={vm.dateInterval!.minWeek!}
                                        minData={vm.weekDataHumidity!.minMeasure!}
                                        maxData={vm.weekDataHumidity!.maxMeasure!}
                                        onTouchEnd={() => { setScroll(true); setDataSelectedHumidity('--'); setDateSelectedHumidity('') }}
                                        onTouchStart={() => setScroll(false)}
                                        setDataSelected={(data) => setDataSelectedHumidity(data)}
                                        setDateSelected={(date) => setDateSelectedHumidity(dateFormat(new Date(date), 'DD/MM/YYYY HH:mm'))}
                                    />
                                </>
                                :
                                vm.finishGetHumidity && monthSelected && vm.monthDataHumidity ?
                                    <>
                                        <Text style={ambientDataPlotViewStyle.text}>{dateSelectedHumidity}</Text>
                                        <LinePlot
                                            data={vm.monthDataHumidity!.measures!}
                                            lineColor={COLORS.CGBlue}
                                            maxDate={vm.dateInterval!.maxMonth!}
                                            minDate={vm.dateInterval!.minMonth!}
                                            minData={vm.monthDataHumidity!.minMeasure!}
                                            maxData={vm.monthDataHumidity!.maxMeasure!}
                                            onTouchEnd={() => { setScroll(true); setDataSelectedHumidity('--'); setDateSelectedHumidity('') }}
                                            onTouchStart={() => setScroll(false)}
                                            setDataSelected={(data) => setDataSelectedHumidity(data)}
                                            setDateSelected={(date) => setDateSelectedHumidity(dateFormat(new Date(date), 'DD/MM/YYYY HH:mm'))}
                                        />
                                    </>
                                    :
                                    <>
                                        <Text style={ambientDataPlotViewStyle.text}> </Text>
                                        <LinePlot
                                            data={[]}
                                            lineColor={COLORS.CGBlue}
                                            maxDate={daySelected ? vm.dateInterval!.maxDay! : weekSelected ? vm.dateInterval!.maxWeek! : vm.dateInterval.maxMonth!}
                                            minDate={daySelected ? vm.dateInterval!.minDay! : weekSelected ? vm.dateInterval!.minWeek! : vm.dateInterval.minMonth!}
                                            minData={20}
                                            maxData={10}
                                            onTouchEnd={() => { }}
                                            onTouchStart={() => setScroll(false)}
                                            setDataSelected={(data) => { }}
                                            setDateSelected={(date) => { }}
                                        />
                                    </>
                        }
                    </Card.Content>
                </Card>

                {/* Pressure */}

                <Card style={ambientDataPlotViewStyle.pressureHumidityCard}>
                    <Card.Content style={ambientDataPlotViewStyle.cardContent}>
                        <Title style={ambientDataPlotViewStyle.title}>{i18n.t('data.pressure.title').toUpperCase()}</Title>
                        <Title style={ambientDataPlotViewStyle.dataSelected}>{dataSelectedPressure} hPa</Title>
                        {vm.finishGetPressure && daySelected && vm.dayDataPressure ?
                            <>
                                <Text style={ambientDataPlotViewStyle.text}>{dateFormat(new Date(vm.dateInterval!.maxDay!), 'DD/MM/YYYY')} {dateSelectedPressure}</Text>
                                <LinePlot
                                    data={vm.dayDataPressure!.measures!}
                                    lineColor={COLORS.OperaMauve}
                                    maxDate={vm.dateInterval!.maxDay!}
                                    minDate={vm.dateInterval!.minDay!}
                                    minData={vm.dayDataPressure!.minMeasure!}
                                    maxData={vm.dayDataPressure!.maxMeasure!}
                                    onTouchEnd={() => { setScroll(true); setDataSelectedPressure('--'); setDateSelectedPressure('') }}
                                    onTouchStart={() => setScroll(false)}
                                    setDataSelected={(data) => setDataSelectedPressure(data)}
                                    setDateSelected={(date) => setDateSelectedPressure(timeFormatter(new Date(date).getHours(), new Date(date).getMinutes()))}
                                />
                            </>
                            :
                            vm.finishGetPressure && weekSelected && vm.weekDataPressure ?
                                <>
                                    <Text style={ambientDataPlotViewStyle.text}>{dateSelectedPressure}</Text>
                                    <LinePlot
                                        data={vm.weekDataPressure!.measures!}
                                        lineColor={COLORS.OperaMauve}
                                        maxDate={vm.dateInterval!.maxWeek!}
                                        minDate={vm.dateInterval!.minWeek!}
                                        minData={vm.weekDataPressure!.minMeasure!}
                                        maxData={vm.weekDataPressure!.maxMeasure!}
                                        onTouchEnd={() => { setScroll(true); setDataSelectedPressure('--'); setDateSelectedPressure('') }}
                                        onTouchStart={() => setScroll(false)}
                                        setDataSelected={(data) => setDataSelectedPressure(data)}
                                        setDateSelected={(date) => setDateSelectedPressure(dateFormat(new Date(date), 'DD/MM/YYYY HH:mm'))}
                                    />
                                </>
                                :
                                vm.finishGetPressure && monthSelected && vm.monthDataPressure ?
                                    <>
                                        <Text style={ambientDataPlotViewStyle.text}>{dateSelectedPressure}</Text>
                                        <LinePlot
                                            data={vm.monthDataPressure!.measures!}
                                            lineColor={COLORS.OperaMauve}
                                            maxDate={vm.dateInterval!.maxMonth!}
                                            minDate={vm.dateInterval!.minMonth!}
                                            minData={vm.monthDataPressure!.minMeasure!}
                                            maxData={vm.monthDataPressure!.maxMeasure!}
                                            onTouchEnd={() => { setScroll(true); setDataSelectedPressure('--'); setDateSelectedPressure('') }}
                                            onTouchStart={() => setScroll(false)}
                                            setDataSelected={(data) => setDataSelectedPressure(data)}
                                            setDateSelected={(date) => setDateSelectedPressure(dateFormat(new Date(date), 'DD/MM/YYYY HH:mm'))}
                                        />
                                    </>
                                    :
                                    <>
                                        <Text style={ambientDataPlotViewStyle.text}> </Text>
                                        <LinePlot
                                            data={[]}
                                            lineColor={COLORS.OperaMauve}
                                            maxDate={daySelected ? vm.dateInterval!.maxDay! : weekSelected ? vm.dateInterval!.maxWeek! : vm.dateInterval.maxMonth!}
                                            minDate={daySelected ? vm.dateInterval!.minDay! : weekSelected ? vm.dateInterval!.minWeek! : vm.dateInterval.minMonth!}
                                            minData={20}
                                            maxData={10}
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