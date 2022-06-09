import { DataToPlot } from "data/model/DataToPlot";
import React from "react";
import { VictoryChart, VictoryLine, VictoryTheme, VictoryTooltip, VictoryVoronoiContainer } from "victory-native";

export interface LinePlotProps {
    lineColor: string
    onTouchStart: () => void
    onTouchEnd: () => void
    setDataSelected: (data: any) => void
    setDateSelected:(date: any) => void
    data: DataToPlot[]
    minData: number
    maxData: number
    minDate: number
    maxDate: number
}

export const LinePlot = (props: LinePlotProps) => {
    let data = props.data

    const filterData = () => {
        console.log(data)
        const maxPoints = 288
        if (data.length > maxPoints) {
            const k = Math.ceil(data.length / maxPoints);
            return data.filter(
                (d, i) => ((i % k) === 0)
            );
        }
        return data;
    }

    const printLabel = (datum: any) => {
        props.setDataSelected(datum.data)
        props.setDateSelected(datum.date)
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
            minDomain={{ x: props.minDate, y: Math.trunc(props.minData - 1) }}
            maxDomain={{ x: props.maxDate, y: Math.trunc(props.maxData + 1) }}
            height={300}
        >
            <VictoryLine
                samples={288}
                style={{
                    data: { stroke: props.lineColor },
                    parent: { border: `1px solid black` }
                }}
                data={filterData()}
                interpolation='natural'
                x={'date'}
                y={'data'}
                scale={{ x: 'time', y: 'linear' }}
            />
        </VictoryChart>
    )
}