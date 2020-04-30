import {createAppContainer} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

// import SplashScreen from './src/screens/SplashScreen';

import SingleContractPage from './src/screens/SingleContractPage';
import LoginScreen from './src/screens/LoginScreen';
import Dashboard from './src/screens/Dashboard';
const AppNavigator = createStackNavigator(
  {
    // SplashScreen:SplashScreen,
    LoginScreen:LoginScreen,
    Dashboard:Dashboard,
    SingleContractPage:SingleContractPage
  },{
    headerMode: 'none'
  }
);
export default createAppContainer(AppNavigator)



