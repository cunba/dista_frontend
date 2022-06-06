import { DrawerActions } from "@react-navigation/native";
import { IconProps, Toolbar } from "components/Toolbar";
import { COLORS } from "config/Colors";
import { commonStyles } from "config/Styles";
import i18n from "infrastructure/localization/i18n";
import { FunctionalView } from "infrastructure/views/FunctionalView";
import { observer } from "mobx-react-lite";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Card } from "react-native-paper";
import { dispatch } from "RootNavigation";
import { DataViewModel } from "viewmodels/data/DataViewModel";

export const DataView: FunctionalView<DataViewModel> = observer(({ vm }) => {

    const iconLeftProps: IconProps = {
        onPress: () => dispatch(DrawerActions.openDrawer()),
        name: 'menu-fold',
        type: 'AntDesign'
    }

    return (
        <>
            <Toolbar
                isIconLeft={true}
                iconLeft={iconLeftProps}

                color={COLORS.button}
                title={i18n.t('data.title').toUpperCase()}
                textStyle={commonStyles.titleToolbar}

                isIconRight={false}
            />
            <ScrollView style={{ paddingTop: 15, paddingHorizontal: 10 }}>
                <Card onPress={() => { }} style={{ height: 150 }}>
                    <Card.Content >

                    </Card.Content>
                </Card>
                <Card onPress={() => { }} style={{ height: 150, marginTop: 15 }}>
                    <Card.Content>

                    </Card.Content>
                </Card>
                <Card onPress={() => { }} style={{ height: 150, marginTop: 15 }}>
                    <Card.Content>

                    </Card.Content>
                </Card>
                <Card onPress={() => { }} style={{ height: 150, marginTop: 15 }}>
                    <Card.Content>

                    </Card.Content>
                </Card>
                <Card onPress={() => { }} style={{ height: 150, marginTop: 15 }}>
                    <Card.Content>

                    </Card.Content>
                </Card>

            </ScrollView>
        </>
    )
})