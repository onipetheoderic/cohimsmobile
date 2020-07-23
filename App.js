import {createAppContainer} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import SplashScreen from './src/screens/SplashScreen';

import UploadSelection from './src/screens/UploadSelection';
import SingleContractPage from './src/screens/SingleContractPage';
import LoginScreen from './src/screens/LoginScreen';
import Dashboard from './src/screens/Dashboard';
import HighwayMenu from './src/screens/HighwayMenu';
import DatasheetScreen from './src/screens/DatasheetScreen';
import UploadMenu from './src/screens/UploadMenu';
import Project from './src/screens/Project';
import SelectDatasheet from './src/screens/SelectDatasheet';
import SelectedLocalDatasheet from './src/screens/SelectedLocalDatasheet';
import AllSavedDatasheets from './src/screens/AllSavedDatasheets';
import Messages from './src/screens/Messages';
import SingleMessage from './src/screens/SingleMessage';
import AdminMessage from './src/screens/AdminMessage';
import SingleUserMessage from './src/screens/SingleUserMessage';
import SendMsgToSection from './src/screens/SendMsgToSection'
import FileUploadScreen from './src/screens/FileUploadScreen'



const AppNavigator = createStackNavigator(
  {
    SplashScreen:SplashScreen,   
    LoginScreen:LoginScreen,
    UploadMenu:UploadMenu,
    Dashboard:Dashboard,
    SingleContractPage:SingleContractPage,
    HighwayMenu:HighwayMenu,
    DatasheetScreen:DatasheetScreen,
    Project:Project,
    SelectDatasheet:SelectDatasheet,
    SelectedLocalDatasheet:SelectedLocalDatasheet,
    AllSavedDatasheets:AllSavedDatasheets,
    Messages:Messages,
    SingleMessage:SingleMessage,
    AdminMessage:AdminMessage,
    SingleUserMessage:SingleUserMessage,
    SendMsgToSection:SendMsgToSection,
    UploadSelection:UploadSelection,
    FileUploadScreen:FileUploadScreen

  },{
    headerMode: 'none'
  }
);
export default createAppContainer(AppNavigator)



