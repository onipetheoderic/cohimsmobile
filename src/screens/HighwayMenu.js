
import React, {useContext, useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Dimensions,
  PixelRatio,
} from 'react-native';
import { CounterContext } from "../../store";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto'
import {datasheetkey} from '../api/constants';
import { TouchableOpacity } from 'react-native-gesture-handler';
import PlayGround from '../components/playGround'
import HighwayCard from '../components/highwayNav';
import AsyncStorage from '@react-native-community/async-storage'
import {allAssignedContracts} from '../api/apiService';
import {Colors} from '../components/colors'



const HighwayMenu = (props) => {    
    const { width, height } = Dimensions.get('window');
    const [token, setToken] = useState("");
    const [bridge, setBridge] = useState([]);
    const [road, setRoad] = useState([]);
    const [housing, setHousing] = useState([])
    const [national, setNational] = useState([]);
    const [savedDatasheet, setSavedDatasheet] = useState([]);
    const globalState = useContext(CounterContext);    
    
   
    useEffect(() => {
      const {state, dispatch } = globalState;
      console.log("this is the state", state)
      let dataSheetArray = async () => await AsyncStorage.getItem(datasheetkey)
        dataSheetArray().then((val) => {
          console.log("the val", val)
          if (val) {
            let Datasheets = JSON.parse(val)
            console.log("DDDDD",Datasheets)
            dispatch({ type: 'addToDatasheetArray',payload:Datasheets})
            setSavedDatasheet(Datasheets)          
          }
        })
        if(state.isLoggedIn){
          allAssignedContracts(state.userDetails.user_token).then((data) => {
            setRoad(data.road);
            setBridge(data.bridge);
            setHousing(data.housing);
            setNational(data.national)
          })
        }
      
        
            
    }, []);

const roadExist = road.length==0?false:true;
const bridgeExist = bridge.length==0?false:true;
const housingExist = housing.length==0?false:true;
const nationalExist = national.length==0?false:true;

  return (
    <>
      
<PlayGround home={true} navigation={props.navigation} title="Highway Inspection Portal" height={height} width={width} navigate={props.navigation.navigate}>
        
    <View style={{backgroundColor:'white', flexDirection:'row',marginTop:20,marginBottom:10, justifyContent:'space-evenly', flexWrap:'wrap'}}>
      <HighwayCard iconName="road" title="Saved Inspection Datasheets" navigation={props.navigation} link="AllSavedDatasheets" />
      <HighwayCard iconName="envelope" title="View/Send Messages" navigation={props.navigation} link="Messages" />
      <HighwayCard iconName="water" title="Completed Road/Bridge" link="" />
      {/* <HighwayCard iconName="file" title="Messages" link="" /> */}
    </View>
    <View>
    {housingExist&&
      <Text style={styles.contractTitle}>Housing Contract Your are Assigned To</Text>
    }
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {housing.map((contract) => (
             <TouchableOpacity onPress={() => props.navigation.navigate('SelectDatasheet', {
              id: contract.id,
              type: "housing",
              title: contract.title,
              token:token
            })}>
            <View style={[styles.eachCard]}>
              <Text style={styles.title}>{contract.title}</Text>
              <Text style={styles.state}>{contract.state} {contract.lga}</Text>
              <Text style={styles.currentPercentage}>{Math.round(contract.current_percentage)}%</Text>
              <Text style={styles.state}>{contract.contractor}</Text>           
            </View>
            </TouchableOpacity>
            
          
          ))}
      </ScrollView>
      </View>  
      
      <View>
      {bridgeExist&&
      <Text style={styles.contractTitle}>Bridge Contract Your are Assigned To</Text>
}
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {bridge.map((contract) => (
            <TouchableOpacity onPress={() => props.navigation.navigate('SelectDatasheet', {
              id: contract.id,
              type: "bridge",
              title: contract.title,
              token:token
            })}>
              <View style={[styles.eachCard]}>
                <Text style={styles.title}>{contract.title}</Text>
                <Text style={styles.state}>{contract.state} {contract.lga}</Text>
                <Text style={styles.currentPercentage}>{Math.round(contract.current_percentage)}%</Text>
                <Text style={styles.state}>{contract.contractor}</Text>           
              </View>
            </TouchableOpacity>

            
          
          ))}
      </ScrollView>
      </View> 

       <View>
       {roadExist&&
      <Text style={styles.contractTitle}>Road Contract Your are Assigned To</Text>
       }
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {road.map((contract) => (
              <TouchableOpacity onPress={() => props.navigation.navigate('SelectDatasheet', {
                id: contract.id,
                type: "road",
                token:token,
                title: contract.title,
              })}>
            <View style={[styles.eachCard]}>
              <Text style={styles.title}>{contract.title}</Text>
              <Text style={styles.state}>{contract.state} {contract.lga}</Text>
              <Text style={styles.currentPercentage}>{Math.round(contract.current_percentage)}%</Text>
              <Text style={styles.state}>{contract.contractor}</Text>           
            </View>
            </TouchableOpacity>

            
          
          ))}
      </ScrollView>
      </View>     
      <View>
        {nationalExist&&
      <Text style={styles.contractTitle}>National Contract Your are Assigned To</Text>
    }
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {national.map((contract) => (
              <TouchableOpacity onPress={() => props.navigation.navigate('SelectDatasheet', {
                id: contract.id,
                type: "national",
                title: contract.title,
                token:token
              })}>
            <View style={[styles.eachCard]}>
              <Text style={styles.title}>{contract.title}</Text>
              <Text style={styles.state}>{contract.state} {contract.lga}</Text>
              <Text style={styles.currentPercentage}>{Math.round(contract.current_percentage)}%</Text>
              <Text style={styles.state}>{contract.contractor}</Text>
            </View>
            </TouchableOpacity>

            
          
          ))}
      </ScrollView>
      

      </View>    

</PlayGround>
    
      
  </>
  );
};



export default HighwayMenu;

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