import { IconProps, Toolbar } from "components/Toolbar";
import { COLORS } from "config/Colors";
import { commonStyles } from "config/Styles";
import { DataToPlot } from "data/model/DataToPlot";
import i18n from "infrastructure/localization/i18n";
import { FunctionalView } from "infrastructure/views/FunctionalView";
import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { RefreshControl } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { back } from "RootNavigation";
import { VictoryChart, VictoryCursorContainer, VictoryLine, VictoryTheme } from "victory-native";
import { AmbientDataViewModel } from "viewmodels/data/AmbientDataViewModel";


export const AmbientDataView: FunctionalView<AmbientDataViewModel> = observer(({ vm }) => {
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        onRefresh()
    }, [])

    const onRefresh = async () => {
        setLoading(true)
        await vm.constructorFunctions()
        setLoading(false)
    }

    const getData = async () => {
        const data: DataToPlot[] = []
        vm.dayDataTemperature?.map(item => {
            data.push(new DataToPlot(item))
        })
        return data
    }

    const renderPlot = () => {
        return (
            <VictoryChart
                theme={VictoryTheme.material}
                containerComponent={
                    <VictoryCursorContainer
                    // cursorLabel={({ datum }) => `${round(datum.x, 2)}, ${round(datum.y, 2)}`}
                    />
                }
            >
                <VictoryLine
                    style={{
                        data: { stroke: COLORS.text },
                        parent: { border: '1px solid black' }
                    }}
                    data={vm.dayDataTemperature}
                    interpolation='natural'
                    x={'date'}
                    y={'data'}
                    scale={{ x: 'time', y: 'linear' }}

                />
            </VictoryChart>
        )
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
                style={{ paddingTop: 15, paddingHorizontal: 10 }}
                refreshControl={(
                    <RefreshControl
                        refreshing={loading}
                        onRefresh={onRefresh}
                    />
                )}
            >
                {vm.finishGetTemperature ?
                    renderPlot()
                    :
                    <></>
                }
            </ScrollView>
        </>
    )
})