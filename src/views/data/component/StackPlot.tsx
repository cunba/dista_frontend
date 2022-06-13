import { COLORS } from "config/Colors";
import { LightningToShow } from "data/model/LightningToShow";
import React from "react";
import { VictoryBar, VictoryChart, VictoryStack, VictoryTheme, VictoryTooltip, VictoryVoronoiContainer } from "victory-native";

export interface LinePlotProps {
    onTouchStart: () => void
    onTouchEnd: () => void
    setDataSelected: (data: any) => void
    setDateSelected: (date: any) => void
    data: LightningToShow[]
    minDate: number
    maxDate: number
}

export const StackPlot = (props: LinePlotProps) => {
    let data = props.data

    const filterData = () => {
        const maxPoints = 24
        if (data.length > maxPoints) {
            const k = Math.ceil(data.length / maxPoints);
            return data.filter(
                (d, i) => ((i % k) === 0)
            );
        }
        return data;
    }

    let dataFiltered = filterData()

    const getBlueData = () => {
        const blueData: any[] = []

        dataFiltered.map(item => {
            blueData.push({ x: new Date(item.blueLightningToPie.x), y: item.blueLightningToPie.y })
        })

        return blueData.sort(orderAsc)
    }

    const getGreenData = () => {
        const greenData: any[] = []

        dataFiltered.map(item => {
            greenData.push({ x: new Date(item.greenLightningToPie.x), y: item.greenLightningToPie.y })
        })

        return greenData.sort(orderAsc)
    }

    const getRedData = () => {
        const redData: any[] = []

        dataFiltered.map(item => {
            redData.push({ x: new Date(item.redLightningToPie.x), y: item.redLightningToPie.y })
        })

        return redData.sort(orderAsc)
    }

    const orderAsc = (a: any, b: any) => {
        if (a.x.getTime() < b.x.getTime()) {
            return -1
        } else if (a.x.getTime() > b.x.getTime()) {
            return 1
        } else {
            return 0
        }
    }

    const printLabel = (datum: any) => {
        props.setDataSelected(Math.trunc(datum._y1))
        props.setDateSelected(datum.x)
        return ' '
    }

    return (
        <VictoryChart
            theme={VictoryTheme.material}
            containerComponent={
                <VictoryVoronoiContainer
                    voronoiDimension="x"
                    onTouchStart={props.onTouchStart}
                    onTouchEnd={props.onTouchEnd}

                    labels={({ datum }) => printLabel(datum)}
                    labelComponent={<VictoryTooltip flyoutHeight={1} flyoutWidth={1} pointerLength={1} pointerWidth={1} />}
                />
            }
            minDomain={{ x: props.minDate, y: 0 }}
            maxDomain={{ x: props.maxDate, y: 7000 }}
            height={300}
        >
            <VictoryStack
                colorScale={[COLORS.blueTermometer, COLORS.greenTermometer, COLORS.redTermometer]}
            >
                <VictoryBar
                    data={getBlueData()}
                    x={'x'}
                    y={'y'}
                    scale={{ x: 'time', y: 'linear' }}
                />
                <VictoryBar
                    data={getGreenData()}
                    x={'x'}
                    y={'y'}
                    scale={{ x: 'time', y: 'linear' }}
                />
                <VictoryBar
                    data={getRedData()}
                    x={'x'}
                    y={'y'}
                    scale={{ x: 'time', y: 'linear' }}
                />
            </VictoryStack>
        </VictoryChart>
    )
}