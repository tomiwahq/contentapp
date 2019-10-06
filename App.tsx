import React from 'react';
import { StyleSheet, View } from 'react-native';
import Application from './src/Application';
import { Provider } from 'react-redux'
import store from './src/store';

export default function App() {
    return (
        <Provider store={store}>
            <Application />
        </Provider>
    );
}
