
import React, {useContext, useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Picker,
  ToastAndroid,
  RefreshControl,
  TextInput,
  Platform,
  PickerIOS,
  FlatList,
  
  ActivityIndicator,
  Text,
  Dimensions,
  PixelRatio,
} from 'react-native';
import { CounterContext } from "../../store";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto'
import {datasheetkey} from '../api/constants';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MessageGround from '../components/messageGround';
import AdvertiseButton from '../components/advertiseButton';
import MessageCard from '../components/messageCard';
import AsyncStorage from '@react-native-community/async-storage'
import {getAllSections, BroadcastMsgToAllUsers, sendMsgToTopic, viewAllMessages} from '../api/apiService';
import {Colors} from '../components/colors'
import TimeAgo from 'react-native-timeago';
import * as Animatable from 'react-native-animatable';
import HeaderAdmin from '../components/headerAdmin';


const HighwayMenu = (props) => {    
    const { width, height } = Dimensions.get('window');
    const [token, setToken] = useState("");
    const [content, changeContent] = useState("");
    const [msgs, setMsgs] = useState([]);
    const [selectedUser, setSelectedUsers] = useState(null)
    const globalState = useContext(CounterContext);
    const [showMsg, changeShowMsg] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [currentPage, changeCurrentPage] = useState(null);
    const [lastPage, changeLastPage] = useState(null);
    const [isRefreshing, changeIsRefreshing] = useState(false);
    const [allSections, changeAllSection] = useState([])
    const [subject, changeSubject] = useState(null);

   //submitMsg
    const showMsgBox = () => {
        changeShowMsg(true)
    }
//userToken
const fetchFeeds = () => {
    const {state, dispatch } = globalState;
    console.log("this is the state", state) 
    viewAllMessages(state.userDetails.user_token).then((data) => {
        if(data.success==true){
            console.log("datas gotten from api", data)
           
            setMsgs(data.msgs)
            setLoading(false)
        }
        else {
            
            setMsgs(data.msg)
            setLoading(false)
        }
       
    })    
}

const fetchSections = () => {
    setLoading(true)
    const {state, dispatch } = globalState;
    console.log("this is the state", state) 
    getAllSections(state.userDetails.user_token).then((data) => {
        console.log("the DAATA",data)
        if(data.success==true){
            changeAllSection(data.users)
            setLoading(false)
        }
    })
}

useEffect(() => {
    fetchSections()
  }, []);

const handleInfiniteScroll = () => { 
    if (currentPage < lastPage) {
      changeCurrentPage({
        currentPage: currentPage + 1,
      }, () => {
        viewAllMessages(state.userDetails.user_token).then((data) => {
            setMsgs(data.msgs)
            changeIsRefreshing(false)
        }).catch((e) => {
            changeIsRefreshing(false)
            console.warn(e.message)
        })
      })
    }
}

const submitMessage = () =>{
    const {state, dispatch } = globalState;
    
    setLoading(true)
    if(subject.length<=10){
        showToastWithGravity("Subject must be atleast 10 characters")
        setLoading(false)
    }
    else if(content.length<=10){
        showToastWithGravity("Content must be atleast 10 characters")
        setLoading(false)
    }
  
    else {
        let formData = new FormData();
        formData.append('message', content);
        formData.append('subject', subject)
        BroadcastMsgToAllUsers(formData, state.userDetails.user_token).then((data) => {
            console.log(data)
            if(data.success==true){
                showToastWithGravity(data.message)
                changeShowMsg(false)
                setLoading(false)
                /*
                
                let formData = new FormData();
                formData.append('type', "warning");
                formData.append('content', content);
                formData.append('topic', "cohims_broadcast")

    
                  sendMsgToTopic(formData).then((data)=>{
                    console.log("msg frm firebase",data)
                  })
                */ 
                let rawData = 
                  {
                    type: "warning",
                    content: content,
                    topic: "cohims_broadcast"
                    
                  }
                  sendMsgToTopic(JSON.stringify(rawData)).then((data)=>{
                    console.log("frm firebase",data)
                  })
            }
            else {
                showToastWithGravity("Server Error")
                changeShowMsg(false)
                setLoading(false)
            }
           
        })
    }
    
}
const showToastWithGravity = (msg) => {
    ToastAndroid.showWithGravity(
      msg,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  };
 

  return (

    <>
    {showMsg &&
      <Animatable.View duration={3000} animation="zoomInDown" style={{justifyContent:'center', borderRadius:10, position:'absolute', zIndex:1000, top:50, left:'10%', width:'80%', height:320, backgroundColor:'#07411D'}}>
           
      <ScrollView>
      <Text style={[{marginTop:20, marginLeft:10, fontFamily:'Candara', color:'white'}]}>Subject</Text>
                    <View style={{margin:10}}>
                        <TextInput 
                        style={{color:'white'}}
                        value={subject}
                        placeholder="subject" 
                        placeholderTextColor="white"                        
                        onChangeText={(text) => changeSubject(text)}
                        />
                        
                    </View>
      <Text style={[{marginTop:20, marginLeft:10, fontFamily:'Candara', color:'white'}]}>Message Content</Text>
                    <View style={{margin:10}}>
                        <TextInput 
                        style={{color:'white'}}
                        textAlignVertical={'top'}
                        value={content}
                        placeholder="Content" 
                        placeholderTextColor="white" 
                        multiline={true}
                       numberOfLines={10}
                        onChangeText={(text) => changeContent(text)}
                        />
                        
                    </View>
                    <Text style={[{marginTop:20, marginLeft:10, textAlign:'left', color:'white',fontFamily:'Candara'}]}>Select Recipient</Text>
                  
    <AdvertiseButton title="Submit" handleSubmit={()=>submitMessage()}/>
      <AdvertiseButton title="Close" handleSubmit={()=>changeShowMsg(false)}/>
 
      </ScrollView>
      
</Animatable.View>
    }
   <HeaderAdmin title="Contract Administrative Portal" navigation={props.navigation}/>
   <TouchableOpacity onPress={()=>props.navigation.navigate('SingleUserMessage')}>
   <View style={{height:110, justifyContent:'space-between', flexDirection:'row', marginHorizontal:15,marginTop:30, backgroundColor:'#30A906', 
            borderRadius:20 }}>
        <View style={{flex:2, alignSelf:'center'}}>
            <Text style={{fontSize:20, fontFamily:'Candara', alignSelf:'center', marginLeft:10, textAlign:'center', marginRight:20}}>
            Send Message to a Single User
            </Text>
            
        </View>
        <View style={{flex:1, alignSelf:'center'}}>
        <FontAwesome5 name="user-check" size={60} color="white" />
        </View>
    </View>
    </TouchableOpacity>
    <TouchableOpacity onPress={()=>props.navigation.navigate('SendMsgToSection')}>
    <View style={{height:110, justifyContent:'space-between', flexDirection:'row', marginHorizontal:15,marginTop:30, backgroundColor:'#30A906', 
            borderRadius:20 }}>
        <View style={{flex:2, alignSelf:'center'}}>
            <Text style={{fontSize:20, fontFamily:'Candara', alignSelf:'center', marginLeft:10, textAlign:'center', marginRight:20}}>
            Broadcast Message to All Users In a Section
            </Text>
            
        </View>
        <View style={{flex:1, alignSelf:'center'}}>
        <FontAwesome5 name="user-friends" size={60} color="white" />
        </View>
    </View>
</TouchableOpacity>
<TouchableOpacity onPress={()=>changeShowMsg(true)}>
    <View style={{height:110, justifyContent:'space-between', flexDirection:'row', marginHorizontal:15,marginTop:30, backgroundColor:'#30A906', 
            borderRadius:20 }}>
        <View style={{flex:2, alignSelf:'center'}}>
            <Text style={{fontSize:20, fontFamily:'Candara', alignSelf:'center', marginLeft:10, textAlign:'center', marginRight:20}}>
            Broadcast Message to All Users
            </Text>
            
        </View>
        <View style={{flex:1, alignSelf:'center'}}>
        <FontAwesome5 name="users" size={60} color="white" />
        </View>
    </View>
    </TouchableOpacity>
      
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