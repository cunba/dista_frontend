import { DrawerActions } from "@react-navigation/native"
import Toolbar, { IconProps } from "components/Toolbar/Toolbar"
import { COLORS } from "config/Colors"
import i18n from "infrastructure/localization/i18n"
import { observer } from 'mobx-react'
import React, { useEffect } from "react"
import { StatusBar, Text, View } from "react-native"
import { Card, Divider } from "react-native-paper"
import Fontisto from 'react-native-vector-icons/Fontisto'
import { dispatch } from "RootNavigation"
import { ROUTES } from '../../config/Constants'
import { commonStyles } from '../../config/Styles'
import { FunctionalView } from "../../infrastructure/views/FunctionalView"
import { navigate } from '../../RootNavigation'
import { HomeViewModel } from "../../viewmodels/HomeViewModel"
import { CardHome } from "./component/CardHome"
import { homeStyles } from './HomeStyles'

export const HomeView: FunctionalView<HomeViewModel> = observer(({ vm }) => {
    /*
    const isDarkMode = useColorScheme() === 'dark';
    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,

    };
    */

    useEffect(() => {
        vm.getTodaysEvents()
    }, [])

    const navigation = (item: string) => {
        switch (item) {
            case 'agenda':
                navigate(ROUTES.AGENDA, null)
                break
            case 'timetable':
                navigate(ROUTES.TIMETABLE, null)
                break
            case 'data':
                navigate(ROUTES.DATA, null)
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
            case 'psycology':
                navigate(ROUTES.PSYCOLOGY, null)
                break
            case 'academy':
                navigate(ROUTES.ACADEMY, null)
                break
            case 'settings':
                navigate(ROUTES.SETTINGS, null)
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
            <View style={{ paddingHorizontal: 15 }}>
                <Card mode={"outlined"} style={homeStyles.eventsContainer}>
                    <Card.Title title={i18n.t('home.event.title')} style={commonStyles.title} />
                    <Divider />
                    <Card.Content>
                        {vm.todaysEvents.length > 0 ?
                            vm.todaysEvents.map(event => {
                                return (<Text style={{paddingTop: 20}}>- {event.name}</Text>)
                            })
                            :
                            <Text style={{paddingTop: 20}}>{i18n.t('home.noEvents')}</Text>
                        }
                    </Card.Content>
                </Card>
                <View style={homeStyles.container}>
                    <CardHome
                        title={i18n.t('data.title')}
                        onPress={() => navigation('data')}
                        iconDirectory='Entypo'
                        iconName='line-graph'
                        iconStyle={{ alignSelf: 'center', color: COLORS.redTermometer, fontSize: 70 }}
                        color={COLORS.text}
                    />
                    <CardHome
                        title={i18n.t('timetable.title')}
                        onPress={() => navigation('timetable')}
                        iconDirectory='AntDesign'
                        iconName='table'
                        iconStyle={{ alignSelf: 'center', color: COLORS.touchables, fontSize: 70 }}
                        color={COLORS.text}
                    />
                    <CardHome
                        title={i18n.t('agenda.title')}
                        onPress={() => navigation('agenda')}
                        iconDirectory='AntDesign'
                        iconName='calendar'
                        iconStyle={{ alignSelf: 'center', color: COLORS.CGBlue, fontSize: 70 }}
                        color={COLORS.text}
                    />
                </View>
                <View style={homeStyles.container}>
                    <CardHome
                        title={i18n.t('tasks.title')}
                        onPress={() => navigation('timetable')}
                        iconDirectory='MaterialCommunityIcons'
                        iconName='format-list-checkbox'
                        iconStyle={{ alignSelf: 'center', color: COLORS.OperaMauve, fontSize: 70 }}
                        color={COLORS.text}
                    />
                    <CardHome
                        title={i18n.t('additional.title')}
                        onPress={() => navigation('timetable')}
                        iconDirectory='MaterialCommunityIcons'
                        iconName='fountain-pen-tip'
                        iconStyle={{ alignSelf: 'center', color: 'grey', fontSize: 55 }}
                        color={COLORS.text}
                    />
                    <CardHome
                        title={i18n.t('tips.title')}
                        onPress={() => navigation('timetable')}
                        iconDirectory='Foundation'
                        iconName='clipboard-pencil'
                        iconStyle={{ alignSelf: 'center', color: COLORS.MaximumYellowRed, fontSize: 70 }}
                        color={COLORS.text}
                    />
                </View>
                <View style={homeStyles.container}>
                    <Card elevation={10} mode={"elevated"} style={homeStyles.card} onPress={() => navigation('timetable')}>
                        <Text style={homeStyles.title}>{i18n.t('psycology.title')}</Text>
                        <Fontisto
                            name="person"
                            size={55}
                            color={COLORS.text}
                            style={{ alignSelf: 'center', paddingTop: 10 }}
                        />
                    </Card>
                    <CardHome
                        title={i18n.t('academy.title')}
                        onPress={() => navigation('timetable')}
                        iconDirectory='FontAwesome5'
                        iconName='chalkboard-teacher'
                        iconStyle={{ alignSelf: 'center', paddingTop: 10, color: COLORS.orangeTermometer, fontSize: 55 }}
                        color={COLORS.text}
                    />
                    <CardHome
                        title={i18n.t('settings.title')}
                        onPress={() => navigation('timetable')}
                        iconDirectory='AntDesign'
                        iconName='setting'
                        iconStyle={{ alignSelf: 'center', paddingTop: 5, color: COLORS.primaryDark, fontSize: 60 }}
                        color={COLORS.text}
                    />
                </View>
            </View>
        </>
    )
})