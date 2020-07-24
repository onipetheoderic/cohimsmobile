
import React, {useContext, useEffect, useState} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  ImageBackground,
  Dimensions,
  Image,
} from 'react-native';
import ProgressCircle from 'react-native-progress-circle'
import { CounterContext } from "../../store";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {datasheetkey} from '../api/constants';
import { TouchableOpacity } from 'react-native-gesture-handler';
import PlayGround from '../components/playGround'
import HighwayCard from '../components/highwayNav';
import AsyncStorage from '@react-native-community/async-storage'

import HighwayCircleCard from '../components/highwayCircleCard'
import Truncator from "../helpers/truncator";
import Currency from '../helpers/currency';
import {allAssignedContracts, uploadInspectionDatasheet} from '../api/apiService';
import {Colors} from '../components/colors'
import TimeAgo from 'react-native-timeago';
import Swipeout from 'react-native-swipeout';


const SelectDatasheet = (props) => {    
    const { width, height } = Dimensions.get('window');
    const [token, setToken] = useState("");
    const [type, setType] = useState("")
    const [title, setTitle] = useState("")
    const [user, setUser] = useState({});
    const [length, changeLength] = useState(0)
    const [id, setId] = useState("")
    const [all_datas, changeAllDatas] = useState({})
    const [parameters, changeParameters] = useState({})
    const [savedDatasheet, setSavedDatasheet] = useState([]);
    
   //let get a single datasheet
    useEffect(() => {
        let type = props.navigation.getParam('type', null)
        let id = props.navigation.getParam('id', null);
        let title = props.navigation.getParam('title', null)
        let token = props.navigation.getParam('token',null);      
        console.log("the toekn",token)
        setToken(token);      
        setTitle(title);
        setId(id);
        let dataSheetArray = async () => await AsyncStorage.getItem(datasheetkey)
        dataSheetArray().then((val) => {
        if (val) {
            let Datasheets = JSON.parse(val)
            console.log("DDDDD",Datasheets)
            let all_datasheets = [];
            for(var i in Datasheets){
                if(type===Datasheets[i].type){
                    console.log("its searching", Datasheets[i].type)
                    all_datasheets.push(Datasheets[i]);
                }
                
            }
            setSavedDatasheet(all_datasheets)          
            }
        })
       
                
    }, []);



    console.log("this isthe type", type)
    const isNew = all_datas.new===true?true:false
    function underscoreFormatter(str){
        if(str!=undefined){
            let new_str = str.toUpperCase();
            return new_str.replace(/_/g, ' ');
        }
        else return null
     
    }
const gotoLocalReport = (obj, title) => {
    console.log("selected obj",obj)
    props.navigation.navigate('SelectedLocalDatasheet', {
        datasheet:obj,
        title:title,
        contractId: id,
        token: token
    })
}
/*
<PlayGround home={true} navigation={props.navigation} title={title} 
height={height} width={width} navigate={props.navigation.navigate}>
*/ 

  const rightActionOne = (id) => (
    {
        backgroundColor: '#fff',
        component: (
          <View style={styles.swipeoutSide}>
            <Ionicons
              size={40}
              onPress={() => alert("Edit"+id)}
              color='#ffc107'
              name= {
                Platform.OS === 'ios'
                  ? `ios-create-outline`
                  : 'md-create'
              }/>
            </View>
          )
        }
  )

  const rightActionTwo = (id) => (
    {
        backgroundColor: '#fff',
        component: (
          <View style={styles.swipeoutSide}>
            <Ionicons
              size={40}
              onPress={() => alert("Delete"+id)}
              color='#dc3545'
              name= {
                Platform.OS === 'ios'
                  ? `ios-trash-outline`
                  : 'md-trash'
              }
            />
          </View>
        )
      }
  )

  const leftActionOne = (id) => (
    {
        backgroundColor: '#fff',
        component: (
          <View style={styles.swipeoutSide}>
            <Ionicons
              size={40}
              onPress={() => alert("Share", +id)}
              color='#007bff'
              name= {
                Platform.OS === 'ios'
                  ? `ios-share-outline`
                  : 'md-share-alt'
            }/>
          </View>
        )
      }
 )
  const leftActionTwo = (id) => (
     {
        backgroundColor: '#fff',
        component: (
          <View style={styles.swipeoutSide}>
            <Ionicons
              size={40}
              onPress={() => alert("Complete"+id)}
              color='#28a745'
              name= {
                Platform.OS === 'ios'
                  ? `ios-checkmark-circle-outline`
                  : 'md-checkmark-circle-outline'
            }/>
          </View>
        )
      }
  )


  return (
    <View style={{flex:1}}> 

    <View style={{backgroundColor:'green', flex: 1.5}}>
        <ImageBackground
            style={styles.image}
            source={require('../../assets/images/sky3.jpg')}
        >
          <Text style={{
            marginTop:70,
            color:'white',
            fontWeight:'bold',
            fontSize:22,
            marginLeft:40}}>File and Datasheet Upload Section</Text>
            <Text style={{fontSize:12,marginTop:20, marginLeft:40, color:'white', fontFamily:'Candara'}}>
           Here you can select the Datasheet you want to upload for:
            </Text>
            <Text style={{fontSize:13,marginTop:20, marginLeft:40, marginRight:40, color:'white', fontFamily:'Candara'}}>
            {title}
            </Text>
          
        </ImageBackground>
    </View> 
    <View style={{flex:2,backgroundColor:'white',
        borderTopRightRadius:40, 
        marginTop:-30,
        borderTopLeftRadius:40,}}>
    
        <ScrollView style={{marginTop:30}}>    
            <View style={{flexDirection:'row', justifyContent:'space-around'}}>
                <View style={[styles.eachCard]}>
                <FontAwesome5 style={{alignSelf:'center', textAlign:'center'}} 
    name="file-upload" size={41} color="green"/>
  <Text style={styles.state}>Upload Datasheet</Text>  
                </View>
               
                    <View style={[styles.eachCard]}>
                    <TouchableOpacity onPress={() => props.navigation.navigate('FileUploadScreen', {
                    id: id,
                    type: type,
                    token:token,
                    title: title,
              })}>
                        <FontAwesome5 style={{alignSelf:'center', textAlign:'center'}} 
                            name="camera" size={41} color="green"/>
                        <Text style={styles.state}>Upload Photos/Videos</Text>  
                        </TouchableOpacity>
                    </View>
             


            </View>

            <View style={{marginBottom:20, marginTop:20}}>
            <Text style={[styles.title,{marginBottom:20}]}>Recent Datasheet Saved Within this Device</Text> 
        
        
        
        <Swipeout left={[leftActionOne(1), leftActionTwo(1)]} 
                right={[rightActionOne(1), leftActionTwo(1)]}  backgroundColor="#fff">
            <TouchableOpacity style={styles.listContainer}>
            <View style={styles.listHeader}>
                <Text style={styles.listTitle}>Test Store</Text>
                <Text style={styles.listSubTitle}>Test Item</Text>
            </View>
            </TouchableOpacity>
        </Swipeout>
          

        <Swipeout left={[leftActionOne(3), leftActionTwo(3)]} 
                    right={[rightActionOne(3), leftActionTwo(3)]}  backgroundColor="#fff">
            <TouchableOpacity style={styles.listContainer}>
            <View style={styles.listHeader}>
                <Text style={styles.listTitle}>Test Store</Text>
                <Text style={styles.listSubTitle}>Test Item</Text>
            </View>
            </TouchableOpacity>
        </Swipeout>


        <Swipeout left={[leftActionOne(3), leftActionTwo(3)]} 
                    right={[rightActionOne(3), leftActionTwo(3)]}  backgroundColor="#fff">
            <TouchableOpacity style={styles.listContainer}>
            <View style={styles.listHeader}>
                <Text style={styles.listTitle}>Test Store</Text>
                <Text style={styles.listSubTitle}>Test Item</Text>
            </View>
            </TouchableOpacity>
        </Swipeout>




            </View>
        </ScrollView>
     
    </View>
      
        
          
      </View>
      );
    };
    
    
    
    export default React.memo(SelectDatasheet);
    
    const styles = StyleSheet.create({
        swipeoutSide: {
            backgroundColor: '#fff',
           
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
          },
          listContainer: {
            borderRadius: 4,
            
            marginLeft: 15,
            marginRight: 15,
            marginTop: 5,
            marginBottom: 5,
            height: 82,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 9,
            },
            shadowOpacity: 0.50,
            shadowRadius: 12.35,
            
            elevation: 5,
              },
             
          listHeader: {
            flex: 1,
            justifyContent: 'center',
            marginLeft: 20
          },
          listTitle: {
            fontSize: 22,
            color: '#1A4024',
            marginBottom: 2,
            fontFamily:'Candara'
          },
          listSubTitle: {
            fontSize: 14,
            color: '#1A4024',
            fontFamily:'Candara'
          },
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
          width:'40%', 
          borderRadius:10,
          height:150,
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
    longCard: {
        margin:10,
        backgroundColor:'white', 
        width:'90%', 
        borderRadius:10,
        height:80,
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
        fontSize:15,
        
    },
    state: {
        marginTop:5, 
        textAlign:'center',
        color:'#095A1F',
        fontFamily:'Candara', 
        fontSize:13,
        
    },
    currentPercentage: {
        marginTop:10, 
        textAlign:'center',
        color:'white',
        fontFamily:'Candara', 
        fontSize:37,
    },
    
    })