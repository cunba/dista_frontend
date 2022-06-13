import { Event } from 'client/disheap/models/Event'
import { stylesRicyclerList } from "config/Styles"
import React from "react"
import { Text, View } from "react-native"
import { Card, Title } from "react-native-paper"
import { dateFormat } from "utils/datetimeFormatterHelper"

export interface RenderItemProps {
    onPressEvent: () => void
    item: Event
}

export const RenderItem = (props: RenderItemProps) => {

    return (
        <Card elevation={3} mode={"elevated"} style={stylesRicyclerList.card}
            onPress={props.onPressEvent}
        >
            <Card.Content style={stylesRicyclerList.rowCellContainerCalendar}>
                <Title style={stylesRicyclerList.title}>{props.item.name}</Title>
                <View >
                    <Text >{dateFormat(new Date(props.item.startDate!), 'HH:mm')}</Text>
                    <Text style={{ textAlign: 'center' }}>-</Text>
                    <Text >{dateFormat(new Date(props.item.endDate!), 'HH:mm')}</Text>
                </View>
            </Card.Content>
        </Card>
    )
}
