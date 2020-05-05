import React, {useState, useEffect} from 'react';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Dimensions,
  PixelRatio,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto'

import { TouchableOpacity } from 'react-native-gesture-handler';
import PlayGround from '../components/playGround'
import HighwayCard from '../components/highwayCard';
import AsyncStorage from '@react-native-community/async-storage'
import {allAssignedContracts} from '../api/apiService';
import {Colors} from '../components/colors'
import GetLocation from 'react-native-get-location'


const UploadMenu = (props) => {    
    const { width, height } = Dimensions.get('window');
    const [token, setToken] = useState("");
    const [bridge, setBridge] = useState([]);
    const [road, setRoad] = useState([]);
    const [housing, setHousing] = useState([])
    const [national, setNational] = useState([]);
    
   
    useEffect(() => {   
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        })
        .then(location => {
            console.log("Location is Presseee",location);
        })
        .catch(error => {
            const { code, message } = error;
            console.warn("Error",code, message);
        })
    }, []);

console.log(housing)
  return (
    <>
      
<PlayGround home={true} navigation={props.navigation} title="Highway Inspection Portal" height={height} width={width} navigate={props.navigation.navigate}>
        
    <View style={{backgroundColor:'white', flexDirection:'row',marginTop:20,marginBottom:10, justifyContent:'space-evenly', flexWrap:'wrap'}}>
      
      <HighwayCard navigation={props.navigation} iconName="road" title="Ongoing Road Project" link="ongoing_road" />
      <HighwayCard navigation={props.navigation} iconName="water" title="Ongoing Bridge Project" link="ongoing_bridge" />
      <HighwayCard navigation={props.navigation} iconName="home" title="Ongoing Housing Project" link="ongoing_housing" />
      <HighwayCard navigation={props.navigation} iconName="road" title="Completed Road Project" link="completed_road" />
      <HighwayCard navigation={props.navigation} iconName="water" title="Completed Bridge Project" link="completed_bridge" />
      <HighwayCard navigation={props.navigation} iconName="home" title="Completed Housing Project" link="completed_housing" />
      
    </View>
   
</PlayGround>
    
      
  </>
  );
};



export default UploadMenu;

const styles = StyleSheet.create({
    cardParent: {
        marginVertical:10,
        height:170,
        borderRadius:10,
        backgroundColor:'green',
        width:'42%',
    },
    
    text: {
        fontFamily: "Candara",
        color: "#3e3e3e",
        fontSize:28
    },
    contractTitle: {
      fontFamily: "Candara",
      color: "#3e3e3e",
      fontSize:17,
      marginLeft:10
    },
    eachCard: {
      margin:10,
      backgroundColor:Colors.mainGreen, 
      width:180, 
      borderRadius:10,
      height:200
  },
  title: {
    marginTop:25, 
    textAlign:'center',
    color:'white',
    fontFamily:'Candara', 
    fontSize:18
},
state: {
    marginTop:10, 
    textAlign:'center',
    color:'white',
    fontFamily:'Candara', 
    fontSize:15,
    
},
currentPercentage: {
    marginTop:10, 
    textAlign:'center',
    color:'white',
    fontFamily:'Candara', 
    fontSize:37,
},

})