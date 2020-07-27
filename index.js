/**
 * @format
 */
import React, { useState, createContext, useContext } from "react";
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import PushNotification from './src/components/PushNotification';
import {AppRegistry} from 'react-native';
import App from './App';
import { CounterContextProvider, CounterContext} from "./store";
import {name as appName} from './app.json';



const AppFinal = () => {

return (
              
        <NavigationContainer>
            <CounterContextProvider>
                <PushNotification>    
                    <App/>
                </PushNotification>
            </CounterContextProvider>
        </NavigationContainer>        
   
)

}



AppRegistry.registerComponent(appName, () => AppFinal);
