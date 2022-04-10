import { IconProps, Toolbar } from "components/Toolbar"
import { COLORS } from "config/Colors"
import { commonStyles } from "config/Styles"
import i18n from "infrastructure/localization/i18n"
import { FunctionalView } from "infrastructure/views/FunctionalView"
import { observer } from "mobx-react-lite"
import { Title } from "native-base"
import React, { useEffect } from "react"
import { Text, View } from "react-native"
import { back } from "RootNavigation"
import { AgendaViewModel } from "viewmodels/AgendaViewModel"

export const ShowEventView: FunctionalView<AgendaViewModel> = observer(({ vm }) => {

    const iconLeftProps: IconProps = {
        onPress: () => back(),
        name: 'left',
        type: 'AntDesign'
    }

    useEffect(() => {
        console.log(vm.eventPressed)
    }, [])

    return (
        <>
            <Toolbar
                isIconLeft={true}
                iconLeft={iconLeftProps}

                color={COLORS.button}
                title={i18n.t('showEvent.title').toUpperCase()}
                textStyle={commonStyles.titleToolbar}

                isIconRight={false}
            />
            <View style={[commonStyles.container, { flex: 1, backgroundColor: COLORS.background }]}>
                <Title style={commonStyles.title}>{vm.eventPressed!.name}</Title>
                <Text>{vm.eventPressed!.notes}</Text>
            </View>
        </>
    )
})