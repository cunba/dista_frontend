import { DrawerActions } from "@react-navigation/native"
import Toolbar, { IconProps, ToolbarProps } from "components/Toolbar/Toolbar"
import { COLORS } from "config/Colors"
import i18n from "infrastructure/localization/i18n"
import { observer } from 'mobx-react'
import React from "react"
import { StatusBar, Text, View } from "react-native"
import { Card, Divider } from "react-native-paper"
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import Foundation from 'react-native-vector-icons/Foundation'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { dispatch } from "RootNavigation"
import { ROUTES } from '../../config/Constants'
import { commonStyles } from '../../config/Styles'
import { FunctionalView } from "../../infrastructure/views/FunctionalView"
import { navigate } from '../../RootNavigation'
import { HomeViewModel } from "../../viewmodels/HomeViewModel"
import { homeStyles } from './HomeStyles'

export const HomeView: FunctionalView<HomeViewModel> = observer(({ vm }) => {
    /*
    const isDarkMode = useColorScheme() === 'dark';
    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,

    };
    */

    const navigation = (item: string) => {
        switch (item) {
            case 'calendar':
                navigate(ROUTES.AGENDA, null)
                break
            case 'timetable':
                navigate(ROUTES.TIMETABLE, null)
                break
            case 'homework':
                navigate(ROUTES.HOMEWORK, null)
                break
            case 'tips':
                navigate(ROUTES.STUDY_TIPS, null)
                break
            case 'complementary':
                navigate(ROUTES.COMPLEMENTARY_THINGS, null)
                break
        }
    }

    const iconLeftProps: IconProps = {
        onPress: () => dispatch(DrawerActions.openDrawer()),
        name: 'menu-fold',
        type: 'AntDesign'
    }

    return (
        <>
            <StatusBar animated={false}
                backgroundColor={COLORS.primaryDark}
                barStyle={'default'}
                showHideTransition={'fade'}
                hidden={false}
            />
            <Toolbar
                isIconLeft={true}
                iconLeft={iconLeftProps}

                color={COLORS.button}
                title={i18n.t('home.title').toUpperCase()}
                textStyle={commonStyles.titleToolbar}

                isIconRight={false}
            />
            <Card mode={"outlined"} style={homeStyles.eventsContainer}>
                <Text style={commonStyles.title}>{i18n.t('home.event.title')}</Text>
                <Divider style={{ width: '85%' }} />
                <Text>Deberes de inglés</Text>
            </Card>
            <View style={homeStyles.container}>
                <Card elevation={10} mode={"elevated"} style={homeStyles.card} onPress={() => navigation('timetable')}>
                    <Text style={homeStyles.title}>{i18n.t('data.title')}</Text>
                    <Entypo
                        name="line-graph"
                        size={70}
                        color={COLORS.text}
                        style={{ alignSelf: 'center' }}
                    />
                </Card>
                <Card elevation={10} mode={"elevated"} style={homeStyles.card} onPress={() => navigation('timetable')}>
                    <Text style={homeStyles.title}>{i18n.t('timetable.title')}</Text>
                    <AntDesign
                        name="table"
                        size={70}
                        color={COLORS.text}
                        style={{ alignSelf: 'center' }}
                    />
                </Card>
                <Card elevation={10} mode={"elevated"} style={homeStyles.card} onPress={() => navigation('calendar')}>
                    <Text style={homeStyles.title}>{i18n.t('agenda.title')}</Text>
                    <AntDesign
                        name="calendar"
                        size={70}
                        color={COLORS.text}
                        style={{ alignSelf: 'center' }}
                    />
                </Card>
            </View>
            <View style={commonStyles.container}>
                <Card elevation={10} mode={"elevated"} style={homeStyles.card} onPress={() => navigation('timetable')}>
                    <Text style={homeStyles.title}>{i18n.t('tasks.title')}</Text>
                    <MaterialCommunityIcons
                        name="format-list-checkbox"
                        size={70}
                        color={COLORS.text}
                        style={{ alignSelf: 'center' }}
                    />
                </Card>
                <Card elevation={10} mode={"elevated"} style={homeStyles.card} onPress={() => navigation('timetable')}>
                    <Text style={homeStyles.title}>{i18n.t('additional.title')}</Text>
                    <MaterialCommunityIcons
                        name="fountain-pen-tip"
                        size={50}
                        color={COLORS.text}
                        style={{ alignSelf: 'center' }}
                    />
                </Card>
                <Card elevation={10} mode={"elevated"} style={homeStyles.card} onPress={() => navigation('timetable')}>
                    <Text style={homeStyles.title}>{i18n.t('tips.title')}</Text>
                    <Foundation
                        name="clipboard-pencil"
                        size={55}
                        color={COLORS.text}
                        style={{ alignSelf: 'center' }}
                    />
                </Card>
            </View>
        </>
    )
})