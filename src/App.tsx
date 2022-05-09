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
import { ICredentials, SessionStoreFactory } from 'infrastructure/data/SessionStoreFactory';
import React, { useCallback, useEffect, useState } from 'react';
import { Dimensions, NativeModules, StyleSheet, Text, View } from 'react-native';
import { LocaleConfig } from 'react-native-calendars';
import RNLocation, { Location } from "react-native-location";
import { navigationRef } from 'RootNavigation';
import { HomeViewModel } from 'viewmodels/HomeViewModel';
import { LoginViewModel } from 'viewmodels/LoginViewModel';
import { RecoveryViewModel } from 'viewmodels/RecoveryViewModel';
import { SendEmailViewModel } from 'viewmodels/SendEmailViewModel';
import { SignUpViewModel } from 'viewmodels/SignUpViewModel';
import { TimetableViewModel } from 'viewmodels/TimetableViewModel';
import { AddEventView } from 'views/agenda/AddEventView';
import { AgendaView } from 'views/agenda/AgendaView';
import { ShowEventView } from 'views/agenda/ShowEventView';
import { HomeView } from 'views/home/HomeView';
import { LoginView } from 'views/login/LoginView';
import { RecoveryView } from 'views/recovery/RecoveryView';
import { SendEmailView } from 'views/sendEmail/SendEmailView';
import { SignUpView } from 'views/signUp/SignUpView';
import { TimetableView } from 'views/timetable/TimetableView';
import { UserApi } from './client/UserApi';
import { isiOS, ROUTES } from './config/Constants';
import { UserFlat } from './data/model/User';
import i18n from './infrastructure/localization/i18n';
import { navigate } from './RootNavigation';
import { AgendaViewModel } from './viewmodels/agenda/AgendaViewModel';
import DrawerContent from '/components/DrawerContent/DrawerContent';
import { AddEventViewModel } from './viewmodels/agenda/AddEventViewModel';
import { ShowEventViewModel } from 'viewmodels/agenda/ShowEventViewModel';

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
			backBehavior={'initialRoute'}
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
					title: i18n.t('agenda.title'),
				}}
				name={ROUTES.AGENDA}
				component={AgendaScreen}
			/>
			<Drawer.Screen
				options={{
					title: i18n.t('timetable.title'),
				}}
				name={ROUTES.TIMETABLE}
				component={TimetableScreen}
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
				const user = await SessionStoreFactory.getSessionStore().getUser()
				let userToken = ''
				if (user && user.password && user.email) {
					const signin = await new UserApi().signIn(user.email, user.password)
					userToken = signin.access_token
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
				const signin = await new UserApi().signIn(email, password)
				const user = {
					name: signin.user.user_metadata.name,
					surname: signin.user.user_metadata.surname,
					birthday: signin.user.user_metadata.birthday,
					schoolYearId: signin.user.user_metadata.schoolYearId,
					disorderId: signin.user.user_metadata.disorderId,
					email: email,
					password: password
				}
				SessionStoreFactory.getSessionStore().setToken(signin.access_token);
				SessionStoreFactory.getSessionStore().setUser(user as ICredentials);
				dispatch({ type: 'SIGN_IN', token: signin.access_token });
			},
			signOut: () => {
				SessionStoreFactory.getSessionStore().setToken('');
				SessionStoreFactory.getSessionStore().setUser(undefined);
				dispatch({ type: 'SIGN_OUT' });
			},
			signUp: async (user: UserFlat) => {
				await new UserApi().signUp(user)
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
				<View style={{ width: '100%', height: '100%', backgroundColor: 'white' }}>
					<View style={{ flex: 4, alignItems: "center", justifyContent: "center" }}>
					</View>
					<View style={{ flex: 1, justifyContent: "center", alignItems: "center", paddingBottom: 30 }}>
						<Text>Powered by Cunba</Text>
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