
import React, {useState, useEffect, useContext} from 'react';
import {View, ToastAndroid, Alert, ActivityIndicator, Text,ScrollView, TouchableOpacity, StatusBar, Dimensions, Image, StyleSheet} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { TextInput } from 'react-native-gesture-handler';
import {Colors} from '../components/colors'
import SignInButton from '../components/signInButton';
import { Grid, YAxis, XAxis,StackedBarChart } from 'react-native-svg-charts'  
import {VictoryLabel, VictoryBar, VictoryChart, VictoryTheme } from "victory-native";
import {Foods} from '../api/foods';
import {viewAllContracts, doSearchUsers, submitMsg, doSearchContract} from '../api/apiService';
import HeaderAdmin from '../components/headerAdmin';
import { CounterContext } from "../../store";
import AdvertiseButton from '../components/advertiseButton';

const screenWidth = Dimensions.get("window").width;


const SingleUserMessage = (props) => {
  const [housing, setHousing] = useState([]);
  const [national, setNational] = useState([]);
  const [works, setWorks] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [contracts, setContracts] = useState([])
  const [isLoading, setLoading] = useState(false)
  const [showUsers, changeShowUsers] = useState(true)
  const [userSelected, changeUserSelected] = useState(null)
  const [userSelectedFullname, changeUserSelectedFullname] = useState(null);
  const [userSection, changeUserSection] = useState(null)
  const [content, changeContent] = useState("");
  const [subject, changeSubject] = useState(null);

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
function underscoreFormatter(str){
    if(str!=undefined){
        let new_str = str.toUpperCase();
        return new_str.replace(/_/g, ' ');
    }
    else return null
 
}
useEffect(() => {
 
}, []);

const showToastWithGravity = (msg) => {
    ToastAndroid.showWithGravity(
      msg,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
};


const submitMessage = () =>{
    const {state, dispatch } = globalState;

    setLoading(true)
    if(subject.length<=10){
        showToastWithGravity("Subject must be atleast 10 characters")
    }
    else if(content.length<=10){
        showToastWithGravity("Content must be atleast 10 characters")
    }
    else if(userSelected==null || userSelected.length==0 || userSelected==" "){
        showToastWithGravity("No User is Selected")
    }
    else {
        let formData = new FormData();
        formData.append('recieverId', userSelected);
        formData.append('message', content);
        formData.append('subject', subject)
        submitMsg(formData, state.userDetails.user_token).then((data) => {
            console.log(data)
            if(data.success==true){
                showToastWithGravity(data.msg)
                setLoading(false)
                props.navigation.navigate('AdminMessage')
            }
            else {
                showToastWithGravity("Server Error")                
                setLoading(false)
                
            }
           
        })
    
    }
    
}


// doSearchUsers(formData, userToken)
const setQuery = (val) => {
    changeShowUsers(true)
    const {state, dispatch } = globalState;
  console.log(val.length)
  setSearchValue(val);
  let formData = new FormData();
  formData.append("query", val)
  if(val.length>=3){
    doSearchUsers(formData, state.userDetails.user_token).then((data)=>{
      console.log(data)
      if(data.users.length && data.users.length>0){
        setContracts(data.users)
      }
      else{
        setContracts([])
      }
     
    })
  }
  
 
}
//data.firstName, data.lastName, data.section
const setSelectedUser = (id, firstName, lastName, section) => {
    let fullName = firstName + " " + lastName
    console.log("the id", id)
    changeUserSelected(id)
    changeUserSelectedFullname(fullName)
    changeUserSection(section)
    changeShowUsers(false)
}
const isUserSelected = userSelectedFullname==null?false:true;

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
    
      <View style={{marginVertical:30}}>
        <View style={styles.textField}>
            <TextInput
             placeholderTextColor={Colors.mainGreen} 
                placeholder="Search Users"
                value={searchValue}
                underlineColorAndroid="transparent"
                style={{marginLeft:25, marginTop:3,fontFamily:'Candara'}}
                onChangeText={(value) => {
                    setQuery(value)                   
                }}
            />
        </View>
        {showUsers &&
        <View>
        {contracts.map((data,index)=>(
         <TouchableOpacity onPress={()=>setSelectedUser(data._id, data.firstName, data.lastName, data.section)}>
            <View style={{borderBottomWidth:1,height:30,
              justifyContent:'center',
              marginLeft:'auto', marginRight:'auto',width:'80%',
            borderBottomColor:'rgb(202, 207, 210)'}}>
              <Text style={{textAlign:'center',fontSize:15, fontFamily:'Candara'}}>
                  {data.firstName}, {data.lastName}, ({underscoreFormatter(data.section)})</Text>
            </View>
        </TouchableOpacity>
        ))}
       </View>
       }

      </View>
    {isUserSelected &&
    <View style={{height:80, justifyContent:'space-between', flexDirection:'row', marginHorizontal:15,marginTop:30, backgroundColor:'#30A906', 
            borderRadius:20 }}>
        <View style={{flex:2, alignSelf:'center'}}>
            <Text style={{fontSize:20, fontFamily:'Candara', alignSelf:'center', marginLeft:10, textAlign:'center', marginRight:20}}>
            {userSelectedFullname}, 
            ({underscoreFormatter(userSection)})
            </Text>
        </View>
        <View style={{flex:1, alignSelf:'center'}}>
            <FontAwesome5 name="user-check" size={40} color="white" />
        </View>
    </View>
      }
      {isUserSelected &&
    <View style={{marginLeft:20}}>
        <Text style={[{marginTop:20, fontWeight:'bold', fontFamily:'Candara', fontSize:15, color:'black'}]}>
            Enter Subject and content of message
            </Text>
        <Text style={[{marginTop:20, fontWeight:'bold', fontFamily:'Candara', color:'black'}]}>Subject</Text>
            <View style={{margin:10}}>
                <TextInput 
                style={{color:'black'}}
                value={subject}
                placeholder="subject" 
                placeholderTextColor="black"                        
                onChangeText={(text) => changeSubject(text)}
                />
                
            </View>
    <Text style={[{marginTop:20,fontWeight:'bold', fontFamily:'Candara', color:'black'}]}>Message Content</Text>
        <View style={{margin:10}}>
            <TextInput 
            style={{color:'black'}}
            textAlignVertical={'top'}
            value={content}
            placeholder="Content" 
            placeholderTextColor="black" 
            multiline={true}
            numberOfLines={6}
            onChangeText={(text) => changeContent(text)}
            />

        </View>
        <AdvertiseButton title="Submit" handleSubmit={()=>submitMessage()}/>
    </View>
}
       
      
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



export default SingleUserMessage;
