
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
import {allAssignedContracts, submitMsg, viewAllMessages,usersInSection, viewSingleMessage} from '../api/apiService';
import {Colors} from '../components/colors'
import TimeAgo from 'react-native-timeago';
import * as Animatable from 'react-native-animatable';



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
    const [allUser, changeAllUser] = useState([])
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

const fetchUserSection = () => {
    const {state, dispatch } = globalState;
    console.log("this is the state", state) 
    usersInSection(state.userDetails.user_token).then((data) => {
        console.log("the DAATA",data)
        if(data.success==true){
            changeAllUser(data.users)
        }
    })
}

useEffect(() => {
    fetchFeeds()
    fetchUserSection()
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
/*
 message.recieverId = req.body.reciever_id
        message.subject = req.body.subject
        message.message = req.body.message
*/ 
const submitMessage = () =>{
    const {state, dispatch } = globalState;
    console.log(subject.subject, content.content, selectedUser)
    setLoading(true)
    if(subject.length<=10){
        showToastWithGravity("Subject must be atleast 10 characters")
        setLoading(false)
    }
    else if(content.length<=10){
        showToastWithGravity("Content must be atleast 10 characters")
    }
    else if(selectedUser==null || selectedUser.length==0 || selectedUser==" "){
        showToastWithGravity("No User is Selected")
        setLoading(false)
    }
    else {
        let formData = new FormData();
        formData.append('recieverId', selectedUser);
        formData.append('message', content);
        formData.append('subject', subject)
        submitMsg(formData, state.userDetails.user_token).then((data) => {
            console.log(data)
            if(data.success==true){
                showToastWithGravity(data.msg)
                changeShowMsg(false)
                setLoading(false)
                
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

  if (isLoading) {
    return (
      <View style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="#07411D" />
      </View>
    )
  }  

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
                    <View>
                    <Picker
                       selectedValue={selectedUser}
                        style={{ height: 50, width: 150, color:'white'}}
                        
                        onValueChange={(itemValue, itemIndex) => setSelectedUsers(itemValue)}>
                         <Picker.Item label={" "} value={" "} />
                        
                        {allUser.map((category, index)=>{
                            console.log(category)
                            return(
                                
                                <Picker.Item key={index} label={category.firstName} value={category._id} /> 
                                
                            )
                        })}
                      
                    </Picker>

             
                   
                    </View>
    <AdvertiseButton title="Submit" handleSubmit={()=>submitMessage()}/>
      <AdvertiseButton title="Close" handleSubmit={()=>changeShowMsg(false)}/>
 
      </ScrollView>
      
</Animatable.View>
    }
<MessageGround buttonOnpress={()=>showMsgBox()} home={false} navigation={props.navigation} title="Messages" height={height} width={width}>
<FlatList
                data={msgs}
                keyExtractor={(item, index) => 'key' + index}
                renderItem={({item, index}) => {
                    return (
                        <MessageCard navigation={props.navigation} 
                        link="SingleMessage"
                        id={item.id}
                        fullname={item.fullname} 
                        seen={item.read} 
                        titled={item.subject} 
                        description={item.message}
                        />
                  )}}
                  refreshControl={
                      <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={() => {
                          changeIsRefreshing(true)
                          fetchFeeds()
                          changeIsRefreshing(true)
                         
                        }}
                      />
                    }
                    onEndReached={() => { handleInfiniteScroll() }}
                  onEndReachedThreshold={0.01}
                  scrollEnabled={!isLoading}
              />


<View style={{marginBottom:60}}></View>
</MessageGround>
    
      
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