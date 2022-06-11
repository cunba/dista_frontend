/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
//https://www.npmjs.com/package/react-native-qrcode-scanner-plus
//TODO: remove when PR is merged: https://github.com/mastermoo/react-native-action-button/issues/339

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AlarmsApi, AmbientNoisesApi, DisbandsApi, HeartRateApi, HumidityApi, LightningsApi, OxygenApi, PressureApi, TemperaturesApi } from 'client/disband';
import { DisbeacsApi, LocationsApi } from 'client/disbeac';
import { DisordersApi, EventsApi, HomeworksApi, JwtResponse, LoginApi, SchoolYearsApi, SubjectsApi, TimetablesApi, UserDTO, UsersApi } from 'client/disheap';
import { COLORS } from 'config/Colors';
import { SIZES } from 'config/Sizes';
import { commonStyles } from 'config/Styles';
import { DisbandRepository } from 'data/repository/disband/impl/DisbandRepository';
import { UserRepository } from 'data/repository/disheap/impl/UserRepository';
import { LoginRepository } from 'data/repository/LoginRepository';
import DisbandApiClient, { DisbandApi } from 'infrastructure/data/DisbandApiClient';
import DisbeacApiClient, { DisbeacApi } from 'infrastructure/data/DisbeacApiClient';
import DisheapApiClient, { DisheapApi } from 'infrastructure/data/DisheapApiClient';
import { ICredentials } from 'infrastructure/data/ICredentials';
import { SessionStoreFactory } from 'infrastructure/data/SessionStoreFactory';
import { Title } from 'native-base';
import React, { useCallback, useEffect, useState } from 'react';
import { Dimensions, NativeModules, StyleSheet, Text, View } from 'react-native';
import { LocaleConfig } from 'react-native-calendars';
import RNLocation, { Location } from "react-native-location";
import { navigationRef } from 'RootNavigation';
import { ShowEventViewModel } from 'viewmodels/agenda/ShowEventViewModel';
import { AmbientDataPlotViewModel } from 'viewmodels/data/AmbientDataPlotViewModel';
import { DataViewModel } from 'viewmodels/data/DataViewModel';
import { HeartRatePlotViewModel } from 'viewmodels/data/HeartRatePlotViewModel';
import { HomeViewModel } from 'viewmodels/HomeViewModel';
import { LoginViewModel } from 'viewmodels/LoginViewModel';
import { RecoveryViewModel } from 'viewmodels/RecoveryViewModel';
import { SendEmailViewModel } from 'viewmodels/SendEmailViewModel';
import { SignUpViewModel } from 'viewmodels/SignUpViewModel';
import { TimetableViewModel } from 'viewmodels/TimetableViewModel';
import { AddEventView } from 'views/agenda/AddEventView';
import { AgendaView } from 'views/agenda/AgendaView';
import { ShowEventView } from 'views/agenda/ShowEventView';
import { AmbientDataPlotView } from 'views/data/plot/AmbientDataPlotView';
import { DataView } from 'views/data/DataView';
import { HeartRatePlotView } from 'views/data/plot/HeartRatePlotView';
import { HomeView } from 'views/home/HomeView';
import { LoginView } from 'views/login/LoginView';
import { RecoveryView } from 'views/recovery/RecoveryView';
import { SendEmailView } from 'views/sendEmail/SendEmailView';
import { SignUpView } from 'views/signUp/SignUpView';
import { TimetableView } from 'views/timetable/TimetableView';
import { isiOS, ROUTES } from './config/Constants';
import i18n from './infrastructure/localization/i18n';
import { navigate } from './RootNavigation';
import { AddEventViewModel } from './viewmodels/agenda/AddEventViewModel';
import { AgendaViewModel } from './viewmodels/agenda/AgendaViewModel';
import DrawerContent from '/components/DrawerContent/DrawerContent';
import { OxygenPlotView } from 'views/data/plot/OxygenPlotView';
import { OxygenPlotViewModel } from 'viewmodels/data/OxygenPlotViewModel';

// Register Disheap api clients
DisheapApiClient.register(DisheapApi.DisorderApi, new DisordersApi)
DisheapApiClient.register(DisheapApi.EventApi, new EventsApi)
DisheapApiClient.register(DisheapApi.HomeworkApi, new HomeworksApi)
DisheapApiClient.register(DisheapApi.SchoolYearApi, new SchoolYearsApi)
DisheapApiClient.register(DisheapApi.SubjectApi, new SubjectsApi)
DisheapApiClient.register(DisheapApi.TimetableApi, new TimetablesApi)
DisheapApiClient.register(DisheapApi.UserApi, new UsersApi)
DisheapApiClient.register(DisheapApi.LoginApi, new LoginApi)

// Register Disbeac Api clients
DisbeacApiClient.register(DisbeacApi.DisbeacApi, new DisbeacsApi)
DisbeacApiClient.register(DisbeacApi.LocationApi, new LocationsApi)

// Register Disband Api clients
DisbandApiClient.register(DisbandApi.AlarmApi, new AlarmsApi)
DisbandApiClient.register(DisbandApi.AmbientNoiseApi, new AmbientNoisesApi)
DisbandApiClient.register(DisbandApi.DisbandApi, new DisbandsApi)
DisbandApiClient.register(DisbandApi.HeartRateApi, new HeartRateApi)
DisbandApiClient.register(DisbandApi.HumidityApi, new HumidityApi)
DisbandApiClient.register(DisbandApi.LightningApi, new LightningsApi)
DisbandApiClient.register(DisbandApi.OxygenApi, new OxygenApi)
DisbandApiClient.register(DisbandApi.PressureApi, new PressureApi)
DisbandApiClient.register(DisbandApi.TemperatureApi, new TemperaturesApi)

export const AuthContext = React.createContext<any>({});

export let geolocation: Location | undefined = undefined

let locale: string = isiOS ? NativeModules.SettingsManager.settings.AppleLocale : NativeModules.I18nManager.localeIdentifier;

if (locale === undefined) {
	// iOS 13 workaround, take first of AppleLanguages array  ["en", "en-NZ"]
	locale = NativeModules.SettingsManager.settings.AppleLanguages[0]
	if (locale == undefined) {
		locale = "es" // default language
	}
}

locale.length > 2 ? i18n.changeLanguage(locale.substring(0, 2)) : i18n.changeLanguage(locale)

LocaleConfig.locales['en'] = {
	monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
	monthNamesShort: ['Jan.', 'Feb.', 'March', 'April', 'May', 'June', 'July', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'],
	dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
	dayNamesShort: ['Sun.', 'Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.']
};

LocaleConfig.locales['es'] = {
	monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
	monthNamesShort: ['Enero', 'Feb.', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Sept.', 'Oct.', 'Nov.', 'Dec.'],
	dayNames: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado'],
	dayNamesShort: ['Dom.', 'Lun.', 'Mar.', 'Mier.', 'Jue.', 'Vier.', 'Sab.']
};

LocaleConfig.defaultLocale = i18n.language === 'es' ? 'es' : 'en'

const LoginScreen = () => <LoginView vm={new LoginViewModel()} />
const SendEmailScreen = () => <SendEmailView vm={new SendEmailViewModel()} />
const RecoveryScreen = () => <RecoveryView vm={new RecoveryViewModel()} />
const SignUpScreen = () => <SignUpView vm={new SignUpViewModel()} />
const HomeScreen = () => <HomeView vm={new HomeViewModel()} />
const TimetableScreen = () => <TimetableView vm={new TimetableViewModel()} />

// Data
const DataScreen = () => <DataView vm={new DataViewModel()} />
const AmbientDataPlotScreen = () => <AmbientDataPlotView vm={new AmbientDataPlotViewModel()} />
const HeartRatePlotScreen = () => <HeartRatePlotView vm={new HeartRatePlotViewModel()} />
const OxygenPlotScreen = () => <OxygenPlotView vm={new OxygenPlotViewModel()} />

// Agenda
const AgendaScreen = () => <AgendaView vm={new AgendaViewModel()} />
const AddEventScreen = () => <AddEventView vm={new AddEventViewModel()} />
const ShowEventScreen = () => <ShowEventView vm={new ShowEventViewModel()} />


const Stack = createStackNavigator();

const Drawer = createDrawerNavigator();
const drawerContent = (props: any) => <DrawerContent {...props} />;

let locationSubscription = undefined

const NavigationDrawer = () => {
	const { width } = Dimensions.get('window');

	return (
		<Drawer.Navigator
			screenOptions={{
				swipeEdgeWidth: width * 0.8,
				headerShown: false
			}}
			initialRouteName={ROUTES.HOME}
			drawerContent={drawerContent}
			backBehavior={'history'}
		>
			<Drawer.Screen
				options={{
					title: i18n.t('home.title'),
				}}
				name={ROUTES.HOME}
				component={HomeScreen}
			/>
			<Drawer.Screen
				options={{
					title: i18n.t('data.title'),
				}}
				name={ROUTES.DATA}
				component={DataScreen}
			/>
			<Drawer.Screen
				options={{
					title: i18n.t('timetable.title'),
				}}
				name={ROUTES.TIMETABLE}
				component={TimetableScreen}
			/>
			<Drawer.Screen
				options={{
					title: i18n.t('agenda.title'),
					swipeEnabled: false
				}}
				name={ROUTES.AGENDA}
				component={AgendaScreen}
			/>
		</Drawer.Navigator>
	);
};


const App = () => {
	const [loading, setLoading] = useState<boolean>(true)

	const loadDataCallback = useCallback(async () => {
		setTimeout(() => { setLoading(false); }, 3000);
	}, []);

	const [state, dispatch] = React.useReducer(
		(prevState: any, action: any) => {
			switch (action.type) {
				case 'RESTORE_TOKEN':
					return {
						...prevState,
						userToken: action.token,
						isLoading: false,
					};
				case 'SIGN_IN':
					return {
						...prevState,
						isSignout: false,
						userToken: action.token,
					};
				case 'SIGN_OUT':
					return {
						...prevState,
						isSignout: true,
						userToken: null,
					};
				case 'SIGN_UP':
					return {
						...prevState,
						isSignout: true,
						userToken: null
					}
			}
		},
		{
			isLoading: true,
			isSignout: false,
			userToken: null,
		},
	);

	useEffect(() => {
		const bootstrapAsync = async () => {
			const isLogged = await SessionStoreFactory.getSessionStore().isLoggedIn()
			const recoverPassword = await SessionStoreFactory.getSessionStore().getRecoverPassword()

			if (isLogged) {
				const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
				let userToken = ''
				if (credentials && credentials.password && credentials.email) {
					const response: JwtResponse = await new LoginRepository().login(credentials.email!, credentials.password!)
					userToken = response.token!
				}
				dispatch({ type: 'RESTORE_TOKEN', token: userToken });
			}

			if (recoverPassword) {
				navigate(ROUTES.RECOVERY, null)
			}
		}
		bootstrapAsync()
	}, []);

	const authContext = React.useMemo(
		() => ({
			signIn: async (email: string, password: string) => {
				const response = await new LoginRepository().login(email, password)
				SessionStoreFactory.getSessionStore().setToken(response.token!);
				SessionStoreFactory.getSessionStore().setCredentials({ email: email, password: password } as ICredentials)
				const user = await new UserRepository().getByEmail(email)
				SessionStoreFactory.getSessionStore().setUser(user)
				const disband = await new DisbandRepository().getByUserId(user!.id!)
				SessionStoreFactory.getSessionStore().setDisband(disband![0])
				dispatch({ type: 'SIGN_IN', token: response.token });
			},
			signOut: () => {
				SessionStoreFactory.getSessionStore().setToken('');
				SessionStoreFactory.getSessionStore().setCredentials(undefined)
				SessionStoreFactory.getSessionStore().setUser(undefined);
				SessionStoreFactory.getSessionStore().setDisband(undefined);
				dispatch({ type: 'SIGN_OUT' });
			},
			signUp: async (user: UserDTO) => {
				await new UserRepository().save(user)
			}
		}),
		[],
	);


	useEffect(() => {
		loadDataCallback();
	}, [loadDataCallback]);


	useEffect(() => {

		RNLocation.configure({
			distanceFilter: 1, // Meters
			desiredAccuracy: {
				ios: "best",
				android: "balancedPowerAccuracy"
			},
			// Android only
			androidProvider: "auto",
			interval: 5000, // Milliseconds
			fastestInterval: 10000, // Milliseconds
			maxWaitTime: 5000, // Milliseconds
			// iOS Only
			activityType: "other",
			allowsBackgroundLocationUpdates: true,
			headingFilter: 1, // Degrees
			headingOrientation: "portrait",
			pausesLocationUpdatesAutomatically: false,
			showsBackgroundLocationIndicator: false,
		})

		RNLocation.requestPermission({
			ios: "whenInUse",
			android: {
				detail: "coarse"
			}
		}).then(granted => {
			if (granted) {
				locationSubscription = RNLocation.subscribeToLocationUpdates(locations => {
					geolocation = {
						latitude: locations[0].latitude,
						longitude: locations[0].longitude
					} as Location
				})
			}
		})
		return () => {
			//locationSubscription = undefined
			//location = undefined
		}
	}, [geolocation])


	//changeNavigationBarColor(COLORS.button, false, false);


	return (
		<>
			{!loading ?
				<AuthContext.Provider value={authContext}>
					<NavigationContainer ref={navigationRef}>
						<Stack.Navigator>
							{!state.userToken || state.userToken.length === 0 ? (
								<Stack.Screen
									name={ROUTES.LOGIN}
									component={LoginScreen}
									options={{ headerShown: false }}
								/>
							) :
								<>
									<Stack.Screen
										name={ROUTES.HOME}
										component={NavigationDrawer}
										options={{ headerShown: false }}
									/>
									<Stack.Screen
										name={ROUTES.ADD_EVENT}
										component={AddEventScreen}
										options={{ headerShown: false }}
									/>
									<Stack.Screen
										name={ROUTES.SHOW_EVENT}
										component={ShowEventScreen}
										options={{ headerShown: false }}
									/>
									<Stack.Screen
										name={ROUTES.AMBIENT_DATA}
										component={AmbientDataPlotScreen}
										options={{ headerShown: false }}
									/>
									<Stack.Screen
										name={ROUTES.HEART_RATE}
										component={HeartRatePlotScreen}
										options={{ headerShown: false }}
									/>
									<Stack.Screen
										name={ROUTES.OXYGEN}
										component={OxygenPlotScreen}
										options={{ headerShown: false }}
									/>
								</>
							}
							<Stack.Screen
								name={ROUTES.SEND_EMAIL}
								component={SendEmailScreen}
								options={{ headerShown: false }}
							/>
							<Stack.Screen
								name={ROUTES.RECOVERY}
								component={RecoveryScreen}
								options={{ headerShown: false }}
							/>
							<Stack.Screen
								name={ROUTES.SIGN_UP}
								component={SignUpScreen}
								options={{ headerShown: false }}
							/>
						</Stack.Navigator>
					</NavigationContainer>
				</AuthContext.Provider>
				:
				<View style={{ width: '100%', height: '100%' }}>
					<View style={{ flex: 4, alignItems: "center", justifyContent: "center", backgroundColor: COLORS.background }}>
						<Title style={{ color: COLORS.touchables, fontSize: 50, paddingTop: 50 }}>{i18n.t('appName').toUpperCase()}</Title>
					</View>
					<View style={{ flex: 1, justifyContent: "center", alignItems: "center", paddingBottom: 30, flexDirection: 'row', backgroundColor: COLORS.background }}>
						<Text style={[commonStyles.text, { color: COLORS.text, fontSize: SIZES.text_button, paddingRight: 10 }]}>{i18n.t('init')}</Text>
					</View>
				</View>
			}
		</>
	);
};

const styles = StyleSheet.create({
	linearGradient: {
		flex: 1,
		paddingLeft: 15,
		paddingRight: 15
	},
})

export default App;