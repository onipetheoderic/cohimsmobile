
import React, {useContext} from 'react';
import {View, Alert, Text,ScrollView, TouchableOpacity, StatusBar, Dimensions, Image, StyleSheet} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import * as Animatable from 'react-native-animatable';

import { TextInput } from 'react-native-gesture-handler';
import {Colors} from '../components/colors'
import SignInButton from '../components/signInButton';
import { Grid, YAxis, XAxis,StackedBarChart } from 'react-native-svg-charts'  
import {VictoryLabel, VictoryBar, VictoryPie, VictoryChart, VictoryTheme } from "victory-native";
import {Contract} from '../api/contract'

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
      <Text style={{fontFamily:'Candara',textAlign:'center', fontSize:25}}>{Contract.project_name}</Text>
      </View>
  
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>          
        
        <VictoryPie
         colorScale={["#261681","#CA4E10", "#097668","#085031", "#8F20A5", "#EADD0B", "cyan", "#67CF3A" ]}
         labelRadius={({ innerRadius }) => innerRadius + 18 }
         radius={({ datum }) => 12 + datum.y * 3}
         innerRadius={30}
            data={[
                { x: "Cats", y: 35 },
                { x: "breakGround", y: 40 },
                { x: "Catss", y: 35 },
                { x: "Dogs", y: 40 },
                { x: "Butter", y: 55 },
                { x: "Mongke", y: 55 }
            ]}
            style={{ labels: { fill: "white", fontSize: 12, fontWeight: "bold" } }}
        />
        
      </ScrollView>


      <View style={{marginLeft:10}}>
      <Text style={{fontFamily:'Candara', textAlign:'center', fontSize:18}}>
        Stages of Construction
        </Text>
        {Contract.stages_construction.map((stage) =>(
              <Text style={{fontSize:13, marginHorizontal:5, marginVertical:10, fontFamily:'Candara'}}>
              <FontAwesome5 name="location-arrow" size={10} color="#07411D" />
               {stage.stage} ({stage.value}%)
            </Text>
        ))}
        
    

      </View>
      <ScrollView horizontal>
         
        </ScrollView>

       
        
        <View style={{marginLeft:10}}>
      <Text style={{fontFamily:'Candara', fontSize:20}}>Images of Ongoing Construction</Text>
      </View>
        <ScrollView horizontal>
          {Contract.images.map((image) => (
            <View style={styles.eachCard}>
                <Image source={{uri: image}}
                    style={{width:200, height:150,resizeMode:'stretch'}}>
                </Image>
            </View>
          ))}       
        </ScrollView>

        <View style={{marginLeft:10}}>
        <Text style={{fontFamily:'Candara', textAlign:'center', fontSize:18}}>
            Contracts Handled By Contractor
            </Text>
            {Contract.contracts_handled_by_contractor.map((stage) =>(
                <Text style={{fontSize:12, marginHorizontal:3, marginVertical:7, fontFamily:'Candara'}}>
                <FontAwesome5 name="location-arrow" size={10} color="#07411D" />
                {stage.contract_name} ({stage.state})
                </Text>
            ))}
      </View>
      <View style={[styles.bottomCard, {marginTop:30}]}>
        <Text style={styles.bottomText}>{Contract.project_name}</Text>
      </View>
      <View style={styles.bottomCard}>
        <Text></Text>
      </View>

      </ScrollView>
  );
};

const styles = StyleSheet.create({
    bottomText: {
        fontFamily:'Candara',
        fontWeight:'bold',
        color: "#727165",
        marginLeft:10,
        marginTop:10
    },  
    bottomCard: {
        width:'90%',
        backgroundColor:'white',
        height:200,
        marginLeft:'auto',
        marginRight:'auto',
        marginBottom:20,
        shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 4,
},
shadowOpacity: 0.41,
shadowRadius: 9.11,

elevation: 8,
    },
    eachCard: {
        margin:10,
        backgroundColor:Colors.mainGreen, 
        width:200, 
        borderRadius:10,
        height:150
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
