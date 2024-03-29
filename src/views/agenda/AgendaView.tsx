import { DrawerActions, useRoute } from '@react-navigation/native';
import { Event } from 'client/disheap';
import Toolbar, { IconProps } from 'components/Toolbar/Toolbar';
import { COLORS } from 'config/Colors';
import { commonStyles, stylesRicyclerList } from 'config/Styles';
import i18n from 'infrastructure/localization/i18n';
import { FunctionalView } from 'infrastructure/views/FunctionalView';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Dimensions, RefreshControl, ScrollView, Text, View } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { Swipeable } from 'react-native-gesture-handler';
import { DataProvider, LayoutProvider, RecyclerListView } from 'recyclerlistview';
import { dispatch } from 'RootNavigation';
import { dateFormat } from 'utils/datetimeFormatterHelper';
import { getMonthText } from 'utils/utils';
import { AgendaViewModel } from 'viewmodels/agenda/AgendaViewModel';
import XDate from 'xdate';
import { ROUTES } from '../../config/Constants';
import { navigate } from '../../RootNavigation';
import { agendaStyles } from './AgendaStyles';
import { RenderItem } from './component/RenderItem';

export const AgendaView: FunctionalView<AgendaViewModel> = observer(({ vm }) => {
    const route = useRoute()

    const [startDay, setStartDay] = useState(new XDate(new Date()))
    const [firstDay, setFirstDay] = useState(new Date())
    const [selected, setSelected] = useState(new Date())
    const [refresh, setRefresh] = useState(false)
    const [calendarOpened, setCalendarOpened] = useState(true)
    const [scroll, setScroll] = useState<any>()
    const [month, setMonth] = useState(new Date(vm.dateFrom).getMonth() + 1)
    const [year, setYear] = useState(new Date(vm.dateFrom).getFullYear())
    const [refDate, setRef] = useState<Swipeable>()
    const [dataSource, setDataSource] = useState(
        new DataProvider((r1, r2) => {
            return r1 !== r2;
        })
    )

    useEffect(() => {
        vm.setDateFrom()
        vm.constructorFunctions()
    }, [])

    useEffect(() => {
        refreshItems()
    }, [route.params!])

    useEffect(() => {
        vm.dateSelected = dateFormat(selected)
        vm.markedDatesToJson()
    }, [selected])

    const layoutProvider = new LayoutProvider(
        index => {
            return 0
        },
        (type, dim) => {
            dim.height = 90
            dim.width = Dimensions.get('window').width
        },
    )

    const getDataSource = (): DataProvider => {
        return dataSource.cloneWithRows(vm.agendaArray.has(dateFormat(selected)) ? vm.agendaArray.get(dateFormat(selected))!.events : [])
    }

    const onPressEvent = (item: Event) => {
        vm.setEventPressed(item)
        navigate(ROUTES.SHOW_EVENT, { event: item })
    }

    const renderItem = (type: any, item: Event) => {
        return (
            <RenderItem
                item={item}
                onPressEvent={() => onPressEvent(item)}
            />
        )
    }

    const renderSwipeRightDay = (progress: any, dragX: any) => {
        return (
            <View style={{ width: '100%', backgroundColor: 'transparent' }}>
            </View>
        )
    }

    const renderSwipeLeftDay = (progress: any, dragX: any) => {
        return (
            <View style={{ width: '100%', backgroundColor: 'transparent' }}>
            </View>
        )
    }


    const onSwipeLeftOpen = () => {
        refDate?.close()
        setSelected(new Date(selected.valueOf() - 86400000))
        if ((selected.getMonth() + 1) === month && selected.getFullYear() === year) onMonthChange([{ month: month, year: year }])
    }
    const onSwipeRightOpen = () => {
        refDate?.close()
        setSelected(new Date(selected.valueOf() + 86400000))
    }

    const renderDate = () => {
        return (
            <>
                <Swipeable
                    renderRightActions={(progress, dragX) => renderSwipeRightDay(progress, dragX)}
                    renderLeftActions={(progress, dragX) => renderSwipeLeftDay(progress, dragX)}

                    onSwipeableRightOpen={() => {
                        selected.getDay() === 0 ?
                            refDate?.close()
                            :
                            onSwipeRightOpen()
                    }}

                    onSwipeableLeftOpen={() => {
                        selected.getDay() === 1 ?
                            refDate?.close()
                            :
                            onSwipeLeftOpen()
                    }}

                    ref={(ref) => setRef(ref!)}

                    containerStyle={{ width: '100%', height: '100%' }}
                >
                    <View style={agendaStyles.recyclerListViewContainer}>
                        {vm.agendaArray?.has(dateFormat(selected)) && vm.agendaArray.get(dateFormat(selected))!.events.length > 0 ?
                            <RecyclerListView
                                ref={(c) => { setScroll(c) }}
                                showsVerticalScrollIndicator={false}
                                layoutProvider={layoutProvider}
                                dataProvider={getDataSource()}
                                rowRenderer={renderItem}
                                style={stylesRicyclerList.recyclerListView}
                                renderAheadOffset={Dimensions.get('window').height * 0.55}
                                scrollViewProps={{
                                    refreshControl: (
                                        <RefreshControl
                                            refreshing={refresh}
                                            onRefresh={refreshItems}
                                        />
                                    )
                                }}
                            >
                            </RecyclerListView>
                            :
                            <ScrollView
                                contentContainerStyle={stylesRicyclerList.recyclerListViewContainer}
                                refreshControl={
                                    <RefreshControl
                                        refreshing={refresh}
                                        onRefresh={refreshItems}
                                    />
                                }
                            >
                                <Text style={stylesRicyclerList.emptyList}>{i18n.t('agenda.empty')}</Text>
                            </ScrollView>
                        }
                    </View>
                </Swipeable>
            </>
        )
    }

    const refreshItems = async () => {
        setRefresh(true)
        await vm.refreshEvents(selected)
        setRefresh(false)
    }

    const onMonthChange = (months: any) => {
        if (months[0].month === month && months[0].year === year) {
            vm.dateTo = vm.dateFrom
            if (month === 2) {
                vm.dateFrom = new Date(year - 1, 11, 1, 0, 0, 0, 0)
                setYear(year - 1)
                setMonth(12)
            }
            else if (month === 1) {
                vm.dateFrom = new Date(year - 1, 10, 1, 0, 0, 0, 0)
                setYear(year - 1)
                setMonth(11)
            }
            else {
                vm.dateFrom = new Date(year, month - 3, 1, 0, 0, 0, 0)
                setMonth(month - 2)
            }

            vm.constructorFunctions()
        }
    }

    const iconLeftProps: IconProps = {
        onPress: () => dispatch(DrawerActions.openDrawer()),
        name: 'menu-fold',
        type: 'AntDesign'
    }

    const iconRightProps: IconProps = {
        onPress: () => { navigate(ROUTES.ADD_EVENT, { date: selected }) },
        name: 'plus',
        type: 'AntDesign'
    }

    return (
        <>
            <Toolbar
                isIconLeft={true}
                iconLeft={iconLeftProps}

                color={COLORS.button}
                title={i18n.t('agenda.title').toUpperCase()}
                textStyle={commonStyles.titleToolbar}

                isIconRight={true}
                iconRight={iconRightProps}
            />
            <View style={agendaStyles.date}>
                {!calendarOpened ?
                    null
                    :
                    <Text style={agendaStyles.dateText}>{getMonthText(selected)} {selected.getFullYear()}</Text>
                }
            </View>
            <Agenda
                selected={dateFormat(firstDay)}
                selectedDay={new XDate(selected)}
                onDayPress={(date) => setSelected(new Date(date.timestamp))}
                futureScrollRange={1}
                topDay={startDay}
                onVisibleMonthsChange={onMonthChange}
                renderEmptyData={renderDate}
                hideKnob={false}
                allowSelectionOutOfRange={true}
                onCalendarToggled={(calendarOpened) => setCalendarOpened(!calendarOpened)}
                showClosingKnob={false}
                firstDay={1}
                animateScroll={false}
                markedDates={vm.markedDatesToAgenda}
                markingType={'dot'}
                theme={{
                    selectedDayBackgroundColor: 'transparent',
                    selectedDayTextColor: COLORS.text
                }}
            />
        </>
    )
})