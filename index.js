import * as React from 'react';
import { AppRegistry, LogBox } from 'react-native';
import 'react-native-gesture-handler';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { name as appName } from './app.json';
import App from './src/App';

export const Main = () => {
    return (
        <SafeAreaProvider>
            <PaperProvider>
                <App />
            </PaperProvider>
        </SafeAreaProvider>
    );
}

LogBox.ignoreLogs([
    "Require cycle: node_modules/victory",
    "Require cycle: node_modules/axios/lib/defaults.js"
]);
AppRegistry.registerComponent(appName, () => Main);
