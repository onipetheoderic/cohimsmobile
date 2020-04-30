
import React, {useContext} from 'react';
import {View, Alert, Text,ScrollView, TouchableOpacity, StatusBar, Dimensions, Image, StyleSheet} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';

import { TextInput } from 'react-native-gesture-handler';
import {Colors} from '../components/colors'
import SignInButton from '../components/signInButton';
import { Grid, YAxis, XAxis,StackedBarChart } from 'react-native-svg-charts'  
import {VictoryLabel, VictoryBar, VictoryChart, VictoryTheme } from "victory-native";
import {Foods} from '../api/foods'
const data = [
{ state: "o", earnings: 0 },
  { state: "theo", earnings: 13000 },
  { state: "abia", earnings: 16500 },
  { state: "adamawa", earnings: 14250 },
  { state: "Akwa", earnings: 19000 },
  { state: "Anam", earnings: 13000 },
  { state: "Bauchi", earnings: 16500 },
  { state: "Benue", earnings: 14250 },
  { state: "Borno", earnings: 19000 },
  { state: "theo", earnings: 13000 },
  { state: "abia", earnings: 16500 },
  { state: "adamawa", earnings: 14250 },
  { state: "Akwa", earnings: 19000 },
  { state: "Anam", earnings: 13000 },
  { state: "Bauchi", earnings: 16500 },
  { state: "Benue", earnings: 14250 },
  { state: "Borno", earnings: 19000 },
  { state: "Borno", earnings: 19000 },
  { state: "theo", earnings: 13000 },
  { state: "abia", earnings: 16500 },
  { state: "casf", earnings: 14250 },
  { state: "fAkwa", earnings: 19000 },
  { state: "Anfam", earnings: 13000 },
  { state: "Bafuchi", earnings: 16500 },
  { state: "Benfue", earnings: 14250 },
  { state: "Borfno", earnings: 19000 },
  { state: "theso", earnings: 13000 },
  { state: "abisa", earnings: 16500 },
  { state: "adas", earnings: 14250 },
  { state: "Akswa", earnings: 19000 },
  { state: "Anasm", earnings: 13000 },
  { state: "Bauschi", earnings: 16500 },
  { state: "Besnue", earnings: 14250 },
  { state: "Bsorno", earnings: 19000 }

];
const screenWidth = Dimensions.get("window").width;


const LoginScreen = (props) => {
    
    const { width, height } = Dimensions.get('window');
    setTimeout(() => {
        props.navigation.navigate('HomeScreen'); //this.props.navigation.navigate('Login')
    }, 4300); 

    const handlePress = () => {
        console.log("all")
    }
    
    
const colorDeterminant = (contract_default, int_default) => {
    if(contract_default===true || int_default===true){
        return "red"
    }
    else return Colors.mainGreen;
}
const _default = (str) => {
    if(str === true){
        return "Yes"
    }
    else return "No"
}

  return (

    <ScrollView style={{backgroundColor:'white'}}>
      <StatusBar translucent={true} backgroundColor="transparent"/>
      <View style={{marginTop:40, justifyContent:'center'}}>
      <Text style={{fontFamily:'Candara',textAlign:'center', fontSize:25}}>Ongoing Projects</Text>
      </View>
  
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>          
        <VictoryChart domainPadding={0} width={1050} height={300}
        theme={VictoryTheme.material}>
          <VictoryBar
            cornerRadius={10}
           
          barRatio={0.6}
          data={data} x="state" y="earnings" 
          style={{ data: { fill: Colors.mainGreen,
          stroke: Colors.primaryGreen,strokeWidth: 1 }}}/>
        </VictoryChart>
      </ScrollView>


      <View style={{marginLeft:10}}>
      <Text style={{fontFamily:'Candara', fontSize:20}}>All Roads and Bridges Contract</Text>
      </View>
      <ScrollView horizontal>
          {Foods.map((contract) => (
               <TouchableOpacity onPress={() => props.navigation.navigate('SingleContractPage', {
                id: contract.id,
                title: contract.project_title,
              })}>
            <View style={[styles.eachCard, {backgroundColor:colorDeterminant(contract.contractor_default,contract.internal_default)}]}>
            <Text style={styles.title}>{contract.project_title}</Text>
            <Text style={styles.state}>{contract.state} {contract.lga}</Text>
            <Text style={styles.currentPercentage}>{contract.current_percentage}%</Text>
            <Text style={styles.state}>{contract.contractor_name}</Text>
           <View style={{marginTop:20}}>
                <Text style={styles.default}>Internal default:{_default(contract.internal_default)}</Text>
                <Text style={styles.default}>Contractor's default:{_default(contract.contractor_default)}</Text>
            </View>
            </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={{marginLeft:10}}>
      <Text style={{fontFamily:'Candara', fontSize:20}}>All Housing Contract</Text>
      </View>
      <ScrollView horizontal>
        <View style={styles.eachCard}>
            
        </View>
        <View style={styles.eachCard}>
            
            </View>
        <View style={styles.eachCard}>
            
        </View>
        </ScrollView>
        <View style={{marginLeft:10}}>
      <Text style={{fontFamily:'Candara', fontSize:20}}>All National Roads Contract</Text>
      </View>
      <ScrollView horizontal>
        <View style={styles.eachCard}>
            
        </View>
        <View style={styles.eachCard}>
            
            </View>
        <View style={styles.eachCard}>
            
        </View>
        </ScrollView>
        
      </ScrollView>
  );
};

const styles = StyleSheet.create({
    eachCard: {
        margin:10,
        backgroundColor:Colors.mainGreen, 
        width:150, 
        borderRadius:10,
        height:250
    },
    default: {
        fontSize:10,
        color:'white',
        textAlign:'center'
    },
    title: {
        marginTop:10, 
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

    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5fcff"
      },
    textField: {
      
        textAlign:'center',
        justifyContent:'center',
        marginLeft:'auto',
        marginRight:'auto',
        borderRadius:26,
        width:'85%',
        
        shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 4,
},
shadowOpacity: 0.41,
shadowRadius: 9.11,

elevation: 8,
    }
})



export default LoginScreen;
