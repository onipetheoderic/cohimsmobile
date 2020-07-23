
import React, {useState, useEffect, useContext} from 'react';
import {View, Alert, ActivityIndicator, Text,ScrollView, TouchableOpacity, StatusBar, Dimensions, Image, StyleSheet} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-community/async-storage'
import { TextInput } from 'react-native-gesture-handler';
import {Colors} from '../components/colors'
import SignInButton from '../components/signInButton';
import { Grid, YAxis, XAxis,StackedBarChart } from 'react-native-svg-charts'  
import {VictoryLabel, VictoryBar, VictoryChart, VictoryTheme } from "victory-native";
import {Foods} from '../api/foods';
import {viewAllContracts, doSearchContract} from '../api/apiService';
import HeaderAdmin from '../components/headerAdmin';
import { CounterContext } from "../../store";


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


const DashboardScreen = (props) => {
  const [housing, setHousing] = useState([]);
  const [national, setNational] = useState([]);
  const [works, setWorks] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [contracts, setContracts] = useState([])
  const [isLoading, setLoading] = useState(true)
    const { width, height } = Dimensions.get('window');
    const globalState = useContext(CounterContext); 
   

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


//viewAllContracts

useEffect(() => {

  const {state, dispatch } = globalState;
console.log("the dashbord admin Screen state", state)
setLoading(false)
if(state.isLoggedIn==true)
{
  setContracts([])
  viewAllContracts().then((data) => {
    
    console.log("all Datas", data)
    let housing_data = data.housing;
    let works_data = data.works;
    let national_data = data.national;
    setHousing(housing_data);
    setNational(national_data);
    setWorks(works_data)
    console.log("housoing", housing_data);
    console.log("works", works_data);
    console.log("national", national_data);
    setLoading(false)
  })
}
else {
  setLoading(false)
  props.navigation.navigate('LoginScreen')
  
}
}, []);

const setQuery = (val) => {
 
  console.log(val.length)
  setSearchValue(val);
  let formData = new FormData();
  formData.append("query", val)
  if(val.length>=3){
    doSearchContract(formData).then((data)=>{
      console.log(data)
      if(data.contracts.length && data.contracts.length>0){
        setContracts(data.contracts)
      }
      else{
        setContracts([])
      }
     
    })
  }
  
 
}

// 
if (isLoading) {
  return (
    <View style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator size="large" color="#07411D" />
    </View>
  )
}  
  return (

    <ScrollView style={{backgroundColor:'white'}}>
      <StatusBar translucent={true} backgroundColor="transparent"/>
      <HeaderAdmin title="Contract Administrative Portal" navigation={props.navigation}/>
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
      <View style={{marginVertical:30}}>
        <View style={styles.textField}>
            <TextInput
             placeholderTextColor={Colors.mainGreen} 
                placeholder="Search Contracts"
                value={searchValue}
                underlineColorAndroid="transparent"
                style={{marginLeft:25, marginTop:3,fontFamily:'Candara'}}
                onChangeText={(value) => {
                    setQuery(value)                   
                }}
            />
        </View>
        {contracts.map((data,index)=>(
         <TouchableOpacity onPress={() => props.navigation.navigate('SingleContractPage', {
          id: data._id,
          title: data.projectTitle,
          type_of_project: data.contractType
        })}>
            <View style={{borderBottomWidth:1,height:30,
              justifyContent:'center',
              marginLeft:'auto', marginRight:'auto',width:'80%',
            borderBottomColor:'rgb(202, 207, 210)'}}>
              <Text style={{textAlign:'center',fontSize:15, fontFamily:'Candara'}}>{data.projectTitle}, {data.contractType}</Text>
            </View>
        </TouchableOpacity>
        ))}
       
      </View>

      <View style={{marginLeft:10}}>
      <Text style={{fontFamily:'Candara', fontSize:20}}>All Roads and Bridges Contract</Text>
      </View>
      <ScrollView horizontal>
          {works.map((contract) => (
               <TouchableOpacity onPress={() => props.navigation.navigate('SingleContractPage', {
                id: contract.id,
                title: contract.project_title,
                type_of_project: contract.type
              })}>
            <View style={[styles.eachCard, {backgroundColor:colorDeterminant(contract.contractor_default,contract.internal_default)}]}>
            <Text style={styles.title}>{contract.project_title}</Text>
            <Text style={styles.state}>{contract.state} {contract.lga}</Text>
            <Text style={styles.currentPercentage}>{Math.round(contract.current_percentage)}%</Text>
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
          {housing.map((contract) => (
               <TouchableOpacity onPress={() => props.navigation.navigate('SingleContractPage', {
                id: contract.id,
                title: contract.project_title,
                type_of_project: contract.type
              })}>
            <View style={[styles.eachCard, {backgroundColor:colorDeterminant(contract.contractor_default,contract.internal_default)}]}>
            <Text style={styles.title}>{contract.project_title}</Text>
            <Text style={styles.state}>{contract.state} {contract.lga}</Text>
            <Text style={styles.currentPercentage}>{Math.round(contract.current_percentage)}%</Text>
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
      <Text style={{fontFamily:'Candara', fontSize:20}}>All National Roads Contract</Text>
      </View>
      <ScrollView horizontal>
          {national.map((contract) => (
               <TouchableOpacity onPress={() => props.navigation.navigate('SingleContractPage', {
                id: contract.id,
                title: contract.project_title,
                type_of_project: contract.type
              })}>
            <View style={[styles.eachCard, {backgroundColor:colorDeterminant(contract.contractor_default,contract.internal_default)}]}>
            <Text style={styles.title}>{contract.project_title}</Text>
            <Text style={styles.state}>{contract.state} {contract.lga}</Text>
            <Text style={styles.currentPercentage}>{Math.round(contract.current_percentage)}%</Text>
            <Text style={styles.state}>{contract.contractor_name}</Text>
           <View style={{marginTop:20}}>
                <Text style={styles.default}>Internal default:{_default(contract.internal_default)}</Text>
                <Text style={styles.default}>Contractor's default:{_default(contract.contractor_default)}</Text>
            </View>
            </View>
            </TouchableOpacity>
          ))}
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
        marginBottom:10,
        borderRadius:26,
        width:'90%',
        
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



export default DashboardScreen;
