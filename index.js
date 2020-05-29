/**
 * @format
 */
import React, { useState, createContext } from "react";
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import PushNotificationManager from './src/components/PushNotificationsManager';
import {AppRegistry} from 'react-native';
import App from './App';
import { CounterContextProvider } from "./store";
import {name as appName} from './app.json';
const AppFinal = () => (
    <PushNotificationManager>
        <CounterContextProvider>
        <NavigationContainer><App /></NavigationContainer> 
        </CounterContextProvider>
    </PushNotificationManager>
)


AppRegistry.registerComponent(appName, () => AppFinal);
