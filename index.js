import 'react-native-gesture-handler';
import * as React from 'react'
import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export const Main = () => {
    return (
        <SafeAreaProvider>
            <PaperProvider>
                <App />
            </PaperProvider>
        </SafeAreaProvider>
    );
}

AppRegistry.registerComponent(appName, () => Main);
