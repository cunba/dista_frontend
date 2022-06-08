import i18n from "infrastructure/localization/i18n"
import React, { useState } from "react"
import { RefreshControl, Text, View } from "react-native"
import { ScrollView, Swipeable } from "react-native-gesture-handler"
import { RecyclerListView } from "recyclerlistview"
import { dateFormat } from "utils/datetimeFormatterHelper"

export interface RenderDayProps {
    onSwipeLeftOpen: () => void
    onSwipeRightOpen: () => void
    calendarOpened: boolean
    daySelected: Date
    refresh: boolean
    onRefresh: () => void
}

export const RenderDay = (props: RenderDayProps) => {
    const [refDate, setRef] = useState<Swipeable>()

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

    return (
        (props.calendarOpened ?
            <>
                <Swipeable
                    renderRightActions={(progress, dragX) => renderSwipeRightDay(progress, dragX)}
                    renderLeftActions={(progress, dragX) => renderSwipeLeftDay(progress, dragX)}

                    onSwipeableRightOpen={() => {
                        props.daySelected.getDay() === 0 || dateFormat(props.daySelected) === dateFormat(new Date()) ?
                            refDate?.close()
                            :
                            props.onSwipeRightOpen()
                    }}

                    onSwipeableLeftOpen={() => {
                        props.daySelected.getDay() === 1 ?
                            refDate?.close()
                            :
                            props.onSwipeLeftOpen()
                    }}

                    ref={(ref) => setRef(ref!)}

                    containerStyle={{ width: '100%', height: '100%', backgroundColor: color.appBackgroundSecond }}
                >
                    <View style={calendarStyles.recyclerListViewContainer}>
                        {vm.agendaArray?.has(dateFormat(props.daySelected)) && vm.agendaArray.get(dateFormat(props.daySelected))!.signings.length > 0 ?
                            <RecyclerListView
                                ref={(c) => { setScroll(c) }}
                                showsVerticalScrollIndicator={false}
                                layoutProvider={layoutProvider}
                                dataProvider={getDataSource()}
                                rowRenderer={renderSigning}
                                style={stylesRicyclerList.recyclerListView}
                                renderAheadOffset={Dimensions.get('window').height * 0.55}
                                scrollViewProps={{
                                    refreshControl: (
                                        <RefreshControl
                                            refreshing={props.refresh}
                                            onRefresh={props.onRefresh}
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
                                        refreshing={props.refresh}
                                        onRefresh={props.onRefresh}
                                    />
                                }
                            >
                                <Text style={[stylesRicyclerList.emptyList, { color: color.text }]}>{i18n.t('emptySignings')}</Text>
                            </ScrollView>
                        }
                    </View>
                </Swipeable>
            </>
            :
            <></>
        )
    )
}
