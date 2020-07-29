
import React, {useState, useEffect, useContext} from 'react';
import {
  View, 
  Alert, 
  ActivityIndicator, 
  Text,ScrollView, 
  ImageBackground,
  TouchableOpacity, 
  StatusBar, 
  Dimensions, 
  Image, 
  StyleSheet} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-community/async-storage'
import { TextInput } from 'react-native-gesture-handler';
import {Colors} from '../components/colors'
import SignInButton from '../components/signInButton';
import { Grid, YAxis, XAxis,StackedBarChart } from 'react-native-svg-charts'  
import {VictoryLabel, VictoryBar, VictoryChart, VictoryTheme } from "victory-native";
import {Foods} from '../api/foods';
import {viewAllContracts,  getUserDetail, doSearchContract} from '../api/apiService';
import HeaderAdmin from '../components/headerAdmin';
import HighwayCircleCard from '../components/highwayCircleCard'
import { CounterContext } from "../../store";
import Truncator from "../helpers/truncator";
import Currency from '../helpers/currency';
import ProgressCircle from 'react-native-progress-circle';


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
  const [hdmi, setHdmi] = useState([]);
  const [spu, setSpu] = useState([]);
  const [userClicked, setUserClicked] = useState(false)
  const [searchValue, setSearchValue] = useState("");
  const [contracts, setContracts] = useState([]);
  const [user, setUser] = useState({});
  const [isLoading, setLoading] = useState(true)
    const { width, height } = Dimensions.get('window');
    const globalState = useContext(CounterContext); 
    const {state, dispatch } = globalState;

    const handlePress = () => {
        console.log("all")
    }
    
    
const colorDeterminant = (contract_default, int_default) => {
  if(contract_default!=undefined && int_default!=undefined){
    if(contract_default===true || int_default===true){
      return "red"
  }
  else return Colors.mainGreen;
  }
    
}
const _default = (str) => {
    if(str!=undefined){
      if(str === true){
        return "Yes"
    }
    else return "No"
    }
    
}


//viewAllContracts

useEffect(() => {
 
  setLoading(true)

  AsyncStorage.getItem("@SessionObj")
        .then((result)=>{          
            let parsifiedResult = JSON.parse(result);
            if(parsifiedResult!=null){
              let userDetails = parsifiedResult.userDetails;
              let { user_token } = userDetails;
              console.log(user_token)
              getUserDetail(user_token)
              .then((data) => {
              console.log("userfffffl", data)
            
              setUser(data.user);
              dispatch({ type: 'newUser',payload:{user:data.user, token:user_token}})
              setContracts([])
              viewAllContracts(user_token).then((data) => {
                
                console.log("all Datas", data)
                let housingData = data.housing;
                let worksData = data.works;
                let spuData = data.spu == undefined ? [] : data.spu
                let hdmiData = data.hdmi == undefined ? [] : data.hdmi
               
                setHousing(housingData);  
                setWorks(worksData);
                setHdmi(hdmiData);
                setSpu(spuData);
                setLoading(false)
              })
            
            })
          }
        })

}, []);


const logOut = () => {
  let store = async () => await AsyncStorage.removeItem('@SessionObj')
  store().then(() => {
      console.warn('Logout successfully')
     
      const resetAction = StackActions.reset({
          index: 0,
          actions: [
              NavigationActions.navigate({
                  routeName: "LoginScreen"
              })
          ]
      });
      dispatch({ type: 'logOut',payload:{}})
      props.navigation.dispatch(resetAction);
  }).catch((err) => {
      console.warn('Logout failed', err.message)
  })
}

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
const isWorksPresent = works.length > 0 ? true : false
const isSpuPresent = spu.length > 0 ? true : false
const isHousingPresent = housing.length > 0 ? true : false;
const isHdmiPresent = hdmi.length > 0 ? true : false;

if (isLoading) {
  return (
    <View style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator size="large" color="#07411D" />
    </View>
  )
}  
  return (
<View style={{flex:1}}>
<View style={{backgroundColor:'green', flex: 2}}>
    <ImageBackground
        style={styles.image}
        source={require('../../assets/images/unnamed2.jpg')}
    >
    <View style={{marginTop:26, marginRight:10, alignItems:'flex-end'}}>
      <TouchableOpacity onPress={()=>setUserClicked(!userClicked)}>
      <FontAwesome5 name="user" size={20} color="white" />
      </TouchableOpacity>
    {userClicked &&
      <View style={{borderRadius:7, backgroundColor:'white', position:'absolute', top:25, width:60, height:30, justifyContent:'center'}}>
        <TouchableOpacity onPress={()=>logOut()}>
          <Text style={{color:'black', fontFamily:'Candara', textAlign:'center'}}>Logout</Text>
        </TouchableOpacity>       
      </View>
      }
    </View>
      <Text style={{
        marginTop:20,
        color:'white',
        fontWeight:'bold', 
        fontSize:22,
        marginLeft:40}}>Hello! {user.firstName}</Text>
        <Text style={{fontSize:12,marginTop:20, marginLeft:40, color:'white', fontFamily:'Candara'}}>
        Welcome to your Dashboard. You can perform Administrative Tasks from here. Click the Menu below
        </Text>
        <ScrollView horizontal 
        showsHorizontalScrollIndicator={false} style={{flexDirection:'row', marginTop:-40}}>
      
         <HighwayCircleCard iconName="envelope" title="Send/Broadcast Messages" navigation={props.navigation} link="AdminMessage"/>
         {/* <HighwayCircleCard iconName="file-contract" title="View All Contracts" navigation={props.navigation} link="AllContracts"/> */}
         <HighwayCircleCard iconName="user" title="Show All Engineers" navigation={props.navigation} link="ShowAllZones"/>
     

        </ScrollView>
    </ImageBackground>
</View> 
<View style={{flex:2.6,backgroundColor:'white',
    borderTopRightRadius:40, 
    marginTop:-30,
    borderTopLeftRadius:40,}}>
    
    <ScrollView style={{marginTop:30}}>
       
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
{isWorksPresent &&
      <View style={{marginLeft:10}}>
      <Text style={{fontFamily:'Candara', fontSize:20}}>Latest Works Contracts Across Nigeria</Text>
      </View>
      }
      <ScrollView horizontal>
          {works.map((contract) => (
               <TouchableOpacity onPress={() => props.navigation.navigate('SingleContractPage', {
                id: contract.id,
                title: contract.project_title,
                type_of_project: contract.type
              })}>
                <View style={[styles.eachCard]}>
            <Text style={styles.title}>{Truncator(contract.title, 45)}</Text>
             
              <View style={{alignSelf:'center'}}>
              <ProgressCircle
            percent={contract.current_percentage}
            radius={40}
            borderWidth={5}
            color={colorDeterminant(contract.contractor_default,contract.internal_default)}
            shadowColor="#F2F5F3"
            bgColor="#fff"
            containerStyle={{shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 9,
            },
            shadowOpacity: 0.50,
            shadowRadius: 12.35,
            
            elevation: 19,}}
        >
            <Text style={{ fontSize: 18, fontFamily:'Candara' }}>
              {Math.round(contract.current_percentage)}%</Text>
        </ProgressCircle>
        </View>
        <Text style={styles.state}>{Currency(contract.contract_sum)}</Text>
        <Text style={styles.state}>{Truncator(contract.contractor_name, 20)}</Text>
        <Text style={styles.title}>{contract.state}</Text>
            </View>
           
            </TouchableOpacity>
          ))}
        </ScrollView>
{isHousingPresent &&
        <View style={{marginLeft:10}}>
      <Text style={{fontFamily:'Candara', fontSize:20}}>Latest Housing Contracts Across Nigeria</Text>
      </View>
      }
      <ScrollView horizontal>
          {housing.map((contract) => (
                <TouchableOpacity onPress={() => props.navigation.navigate('SingleContractPage', {
                 id: contract.id,
                 title: contract.project_title,
                 type_of_project: contract.type
               })}>
                 <View style={[styles.eachCard]}>
             <Text style={styles.title}>{Truncator(contract.title, 45)}</Text>
              
               <View style={{alignSelf:'center'}}>
               <ProgressCircle
             percent={contract.current_percentage}
             radius={40}
             borderWidth={5}
             color={colorDeterminant(contract.contractor_default,contract.internal_default)}
             shadowColor="#F2F5F3"
             bgColor="#fff"
             containerStyle={{shadowColor: "#000",
             shadowOffset: {
               width: 0,
               height: 9,
             },
             shadowOpacity: 0.50,
             shadowRadius: 12.35,
             
             elevation: 19,}}
         >
             <Text style={{ fontSize: 18, fontFamily:'Candara' }}>
               {Math.round(contract.current_percentage)}%</Text>
         </ProgressCircle>
         </View>
         <Text style={styles.state}>{Currency(contract.contract_sum)}</Text>
         <Text style={styles.state}>{Truncator(contract.contractor_name, 20)}</Text>
         <Text style={styles.title}>{contract.state}</Text>
             </View>
            
             </TouchableOpacity>
          ))}

        </ScrollView>


        {isSpuPresent &&
      <View style={{marginLeft:10}}>
      <Text style={{fontFamily:'Candara', fontSize:20}}>Latest SPU Contracts Across Nigeria</Text>
      </View>
      }
      <ScrollView horizontal>
          {spu.map((contract) => (
               <TouchableOpacity onPress={() => props.navigation.navigate('SingleContractPage', {
                id: contract.id,
                title: contract.project_title,
                type_of_project: contract.type
              })}>
                <View style={[styles.eachCard]}>
            <Text style={styles.title}>{Truncator(contract.title, 45)}</Text>
             
              <View style={{alignSelf:'center'}}>
              <ProgressCircle
            percent={contract.current_percentage}
            radius={40}
            borderWidth={5}
            color={colorDeterminant(contract.contractor_default,contract.internal_default)}
            shadowColor="#F2F5F3"
            bgColor="#fff"
            containerStyle={{shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 9,
            },
            shadowOpacity: 0.50,
            shadowRadius: 12.35,
            
            elevation: 19,}}
        >
            <Text style={{ fontSize: 18, fontFamily:'Candara' }}>
              {Math.round(contract.current_percentage)}%</Text>
        </ProgressCircle>
        </View>
        <Text style={styles.state}>{Currency(contract.contract_sum)}</Text>
        <Text style={styles.state}>{Truncator(contract.contractor_name, 20)}</Text>
        <Text style={styles.title}>{contract.state}</Text>
            </View>
           
            </TouchableOpacity>
          ))}
        </ScrollView>

        {isHdmiPresent &&
      <View style={{marginLeft:10}}>
      <Text style={{fontFamily:'Candara', fontSize:20}}>Latest HDMI Contracts Across Nigeria</Text>
      </View>
      }
      <ScrollView horizontal>
          {hdmi.map((contract) => (
               <TouchableOpacity onPress={() => props.navigation.navigate('SingleContractPage', {
                id: contract.id,
                title: contract.project_title,
                type_of_project: contract.type
              })}>
                <View style={[styles.eachCard]}>
            <Text style={styles.title}>{Truncator(contract.title, 45)}</Text>
             
              <View style={{alignSelf:'center'}}>
              <ProgressCircle
            percent={contract.current_percentage}
            radius={40}
            borderWidth={5}
            color={colorDeterminant(contract.contractor_default,contract.internal_default)}
            shadowColor="#F2F5F3"
            bgColor="#fff"
            containerStyle={{shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 9,
            },
            shadowOpacity: 0.50,
            shadowRadius: 12.35,
            
            elevation: 19,}}
        >
            <Text style={{ fontSize: 18, fontFamily:'Candara' }}>
              {Math.round(contract.current_percentage)}%</Text>
        </ProgressCircle>
        </View>
        <Text style={styles.state}>{Currency(contract.contract_sum)}</Text>
        <Text style={styles.state}>{Truncator(contract.contractor_name, 20)}</Text>
        <Text style={styles.title}>{contract.state}</Text>
            </View>
           
            </TouchableOpacity>
          ))}
        </ScrollView>




      </ScrollView>
      </View>

      </View>
  );
};

const styles = StyleSheet.create({
  eachCard: {
    margin:10,
    backgroundColor:'white', 
    width:150, 
    borderRadius:10,
    height:250,
    justifyContent:'center',
    shadowColor: "#000",
shadowOffset: {
width: 0,
height: 9,
},
shadowOpacity: 0.50,
shadowRadius: 12.35,

elevation: 19,
},

image: {
  height:'100%',
   resizeMode: "cover",
 
 },


    default: {
        fontSize:10,
        color:'white',
        textAlign:'center'
    },
   
  title: {
    marginTop:10, 
    marginBottom:20,
    textAlign:'center',
    color:'#095A1F',
    fontFamily:'Candara', 
    fontSize:13,
    
},
state: {
    marginTop:5, 
    textAlign:'center',
    color:'#095A1F',
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
