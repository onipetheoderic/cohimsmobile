
import React, {useContext, useEffect, useState} from 'react';
import {View, ToastAndroid, ActivityIndicator, Alert, Text, TouchableOpacity, StatusBar, Dimensions, Image, StyleSheet} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';

import * as Animatable from 'react-native-animatable';
import { doLogin, } from '../api/apiService'

import { TextInput } from 'react-native-gesture-handler';
import {Colors} from '../components/colors'
import SignInButton from '../components/signInButton'


const LoginScreen = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setLoading] = useState(false)
    const { width, height } = Dimensions.get('window');
  

  
useEffect(() => {   
    
    let session = async () => await AsyncStorage.getItem('@SessionObj')  
  session().then((val) => {
      console.log("the session", val)
    if (val) {
        setLoading(true)
        
        let data = JSON.parse(val)
        console.log(data)
        if(data.section!="all_sections"){
            setLoading(false)
            props.navigation.navigate("HighwayMenu")
        }
        else {
            setLoading(false)
            props.navigation.navigate("Dashboard")
        }
  
    }
    else{
        setLoading(false)
    }
  })
}, []);

loginPost = () =>{   
    setLoading(true)
    console.log("login details",email, password)
    if (email.length < 1 || password.length < 1) {
        // alert('Both email/password are required')
        showToastWithGravity("email and Password is required")
    } 
    else {
        let formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);
        doLogin(formData).then((data) => {
         
            if (data.success==true) {               
                let store = async () => await AsyncStorage.setItem('@SessionObj', JSON.stringify(data))
                    store().then(() => {
                        showToastWithGravity(data.message)
                        if(data.section!="all_sections"){
                            setLoading(false)
                            props.navigation.navigate("HighwayMenu")
                        }
                        else {
                            setLoading(false)
                            props.navigation.navigate("Dashboard")
                        }
                }).catch((e) => {
                    console.warn(e.message)
                })    
               
            }else{
                setLoading(false)
                showToastWithGravity(data.message)
            }
        })
    }
}

showToastWithGravity = (msg) => {
    ToastAndroid.showWithGravity(
      msg,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  };
//   if (isLoading) {
//     return (
//       <View style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//         <ActivityIndicator size="large" color="#07411D" />
//       </View>
//     )
//   }
  return (
    <>
    
      <StatusBar translucent={true} backgroundColor="transparent"/>
        <View style={{flex:1, justifyContent:'center', backgroundColor:'white'}} duration={3000} animation="zoomInUp">
       
        <Animatable.View duration={2500} animation="zoomInUp" 
        style={{marginBottom:10,justifyContent:'center'}}>
            <View style={{justifyContent:'center'}}>
            <Image
        style={{width:130, height:130, marginLeft:'auto', marginRight:'auto'}}
        source={require('../../assets/images/logo.png')}
      />
      <Text style={{fontSize:20, fontFamily:'Candara', textAlign:'center', marginBottom:30,}}>Cohims</Text>
            </View>
        <View style={{width:'85%', marginLeft:'auto', marginRight:'auto',}}>
        <Text style={{fontSize:12, fontFamily:'Candara', color:"#a79d9d"}}>Email Address</Text>
        </View>
        
        <View style={styles.textField}>
            <TextInput
             placeholderTextColor={Colors.mainGreen} 
                placeholder="Email Address"
                underlineColorAndroid="transparent"
                style={{marginLeft:25, marginTop:3}}
                onChangeText={(value) => {
                    setEmail(value)
                   
                }}
            />
        </View>
       
        </Animatable.View>
      
        <Animatable.View duration={2500} animation="zoomInUp" 
        style={{marginTop:13, justifyContent:'center'}}>
            <View style={{width:'85%', marginLeft:'auto', marginRight:'auto',}}>
        <Text style={{fontSize:12, fontFamily:'Candara',  color:"#a79d9d"}}>
            Password</Text>
        </View>
        <View style={styles.textField}>
            <TextInput
            placeholderTextColor={Colors.mainGreen} 
                placeholder="Password"
                secureTextEntry
                underlineColorAndroid="transparent"
                style={{marginLeft:25, marginTop:3}}
                onChangeText={(value) => {
                    setPassword(value)                   
                }}
            />
        </View>
        <View style={{marginVertical:10}}>
            
            <TouchableOpacity onPress={()=>loginPost()}>
                <SignInButton title="SIGN IN" />
            </TouchableOpacity>
            
            {isLoading &&
            <View style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <ActivityIndicator size="large" color="#07411D" />
            </View>
            }
        </View>
        
        </Animatable.View>
           
            
            </View>
<View style={{marginVertical:20, justifyContent:'center', backgroundColor:'white'}}>
    {/* <Text style={{textAlign:'center', fontFamily:'Candara', color:"#a79d9d"}}>
        HDMI Registration
    </Text> */}
    <TouchableOpacity onPress={()=>props.navigation.navigate('UploadMenu')}>
    <Text style={{textAlign:'center', fontFamily:'Candara', color:"#a79d9d"}}>
        Upload Inspection Datasheet
    </Text>
    </TouchableOpacity>
</View>
    </>
  );
};

const styles = StyleSheet.create({
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
