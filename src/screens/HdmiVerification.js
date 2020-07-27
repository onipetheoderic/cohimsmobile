
import React, {useContext, useEffect, useState} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  SafeAreaView,
  StyleSheet,
  Alert,
  ScrollView,
  View,
  TextInput,
  Text,
  ToastAndroid,
  ImageBackground,
  Dimensions,
  Image,
} from 'react-native';
import ProgressCircle from 'react-native-progress-circle'
import { CounterContext } from "../../store";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto'
import {datasheetkey} from '../api/constants';
import { TouchableOpacity } from 'react-native-gesture-handler';
import PlayGround from '../components/playGround'
import HighwayCard from '../components/highwayNav';
import AsyncStorage from '@react-native-community/async-storage'
import {allAssignedContracts, getUserDetail, hdmiVerifyCodePost} from '../api/apiService';
import {Colors} from '../components/colors'
import HighwayCircleCard from '../components/highwayCircleCard'
import Truncator from "../helpers/truncator";
import Currency from '../helpers/currency';
import { NavigationActions, StackActions } from 'react-navigation'
import AdvertiseButton from '../components/advertiseButton';



const HdmiVerification = (props) => {    
    const { width, height } = Dimensions.get('window');
    const [token, setToken] = useState("");
    
    const [user, setUser] = useState({});
    const [userClicked, setUserClicked] = useState(false)
    const [currentHdmi, setHdmi] = useState({})
    const [hdmiPresent, setHdmiPresent] = useState(false)
    const globalState = useContext(CounterContext);    
    const [content, changeContent] = useState("FMWH-VMP-");
    const [isLoading, setLoading] = useState(false);
    const {state, dispatch } = globalState;

    console.log("iniitti", state)

    const logOut = () => {
      const {state, dispatch } = globalState;
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
  

    useEffect(() => {
      // Return the function to unsubscribe from the event so it gets removed on unmount
    
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
        AsyncStorage.getItem("@SessionObj")
        .then((result)=>{          
            let parsifiedResult = JSON.parse(result);
            if(parsifiedResult!=null){
              let userDetails = parsifiedResult.userDetails;
              let { user_token } = userDetails;
              console.log(user_token)
              setToken(user_token);
              getUserDetail(user_token)
              .then((data) => {
              console.log("userfffffl", data)
            
              setUser(data.user);
            
            })
              allAssignedContracts(user_token)
              .then((data) => {
              console.log("lllllllllllllllllllll", data)
              setRoad(data.road);
              setBridge(data.bridge);
              setHousing(data.housing);
            
            })
          }
          else {
              return ;
          }
        
        })
        
      
        
            
    }, []);

    const showToastWithGravity = (msg) => {
        ToastAndroid.showWithGravity(
          msg,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
      };
    
const submitHdmiContent = () => {
    if(content.length>10){
        isLoading(true)
        let formData = new FormData();
        formData.append('code', content);
        
        
        hdmiVerifyCodePost(formData, token).then((data) => {
          if(data.success==false){
            isLoading(false)
            Alert.alert(
              "Error",
              data.message,
              [
               
                {
                  text: "OK",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel"
                },
                
              ],
              { cancelable: false }
            );
        
          }
          else {
            
            // props.navigation.navigate('HighwayMenu')
            isLoading(false)
            showToastWithGravity(data.message)
            console.log("hdmi datas",data)
          }
        })
    }
   else {
    showToastWithGravity("Invalid HDMI Code")
   }
  
}


  return (
    <View style={{flex:1}}> 

<View style={{backgroundColor:'green', flex: 2}}>
    <ImageBackground
        style={styles.image}
        source={require('../../assets/images/unnamed.jpg')}
    >
    <View style={{marginTop:30, marginRight:10, alignItems:'flex-end'}}>
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
        <Text style={{fontSize:15,marginTop:20, marginLeft:40, color:'white', fontFamily:'Candara'}}>
        HDMI Verification Page
        </Text>
        <ScrollView horizontal 
        showsHorizontalScrollIndicator={false} style={{flexDirection:'row', marginTop:-40}}>
         <HighwayCircleCard iconName="road" navigation={props.navigation} link="AllSavedDatasheets" title="Saved Inspection Datasheets"/>
         <HighwayCircleCard iconName="envelope" title="View/Send Messages" navigation={props.navigation} link="Messages"/>
         <HighwayCircleCard iconName="water" title="Create A New Datasheet" navigation={props.navigation} link="UploadMenu"/>
        

        </ScrollView>
    </ImageBackground>
</View> 
<View style={{flex:2,backgroundColor:'white',
    borderTopRightRadius:40, 
    marginTop:-30,
    borderTopLeftRadius:40,}}>

<ScrollView style={{
    
  marginTop:30
    }}>
     
    <View style={{marginBottom:20, marginTop:20}}>
            <Text style={[styles.title,{marginBottom:20}]}>Enter HDMI Code</Text> 
            
            <View style={[styles.eachCard]}>
                <TextInput 
                textAlignVertical={'top'}
                value={content}
                placeholder="FMWH-VMP-0000000000" 
                multiline={true}
                style={{marginLeft:20,fontSize:20, fontFamily:'AdobeClean-Regular',}}
                onChangeText={(text) => changeContent(text)}
                />
            </View>
            {!isLoading &&
            <AdvertiseButton title="Check HDMI" handleSubmit={()=>submitHdmiContent()}/>
            }
            {isLoading &&
            <ActivityIndicator size="large" color="#07411D" />
            }
            </View>

    <View>
 
  
      </View>  
      
    


  </ScrollView>
 
</View>
  
    
      
  </View>
  );
};



export default HdmiVerification;

const styles = StyleSheet.create({
    cardParent: {
        marginVertical:10,
        height:170,
        borderRadius:10,
        backgroundColor:'green',
        width:'42%',
    },
    circularCard: {
      width:80,
      height:80,
      borderRadius:40,
      justifyContent:'center',
      borderColor:'white',
      borderWidth:1,
      alignSelf:'center'
    },
    image: {
     height:'100%',
      resizeMode: "cover",
    
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
      backgroundColor:'white', 
     width:'85%',
      borderRadius:10,
      height:100,
      alignSelf:'center',
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

})