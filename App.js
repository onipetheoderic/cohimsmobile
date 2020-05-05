import {createAppContainer} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

// import SplashScreen from './src/screens/SplashScreen';

import SingleContractPage from './src/screens/SingleContractPage';
import LoginScreen from './src/screens/LoginScreen';
import Dashboard from './src/screens/Dashboard';
import HighwayMenu from './src/screens/HighwayMenu';
import DatasheetScreen from './src/screens/DatasheetScreen';
import UploadMenu from './src/screens/UploadMenu';
import Project from './src/screens/Project';
import SelectDatasheet from './src/screens/SelectDatasheet';

const AppNavigator = createStackNavigator(
  {
    // SplashScreen:SplashScreen,   
    LoginScreen:LoginScreen,
    UploadMenu:UploadMenu,
    Dashboard:Dashboard,
    SingleContractPage:SingleContractPage,
    HighwayMenu:HighwayMenu,
    DatasheetScreen:DatasheetScreen,
    Project:Project,
    SelectDatasheet:SelectDatasheet,
  },{
    headerMode: 'none'
  }
);
export default createAppContainer(AppNavigator)



