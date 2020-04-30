
import React, {useContext} from 'react';
import {View, Alert, Text, TouchableOpacity, StatusBar, Dimensions, Image, StyleSheet} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';

import { TextInput } from 'react-native-gesture-handler';
import {Colors} from '../components/colors'
import SignInButton from '../components/signInButton'
const LoginScreen = (props) => {
    
    const { width, height } = Dimensions.get('window');
    setTimeout(() => {
        props.navigation.navigate('HomeScreen'); //this.props.navigation.navigate('Login')
    }, 4300); 

    const handlePress = () => {
        props.navigation.navigate('Dashboard')
    }

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
                underlineColorAndroid="transparent"
                style={{marginLeft:25, marginTop:3}}
            />
        </View>
        <View style={{marginVertical:10}}>
            <TouchableOpacity onPress={()=>handlePress()}>
            <SignInButton title="SIGN IN" />
            </TouchableOpacity>
       
        </View>
        
    {/* <SignInButton title="SIGN IN" handlePress={handlePress}/> */}
        </Animatable.View>
           
            
            </View>
<View style={{marginVertical:20, justifyContent:'center', backgroundColor:'white'}}>
    <Text style={{textAlign:'center', fontFamily:'Candara', color:"#a79d9d"}}>
        Want to be an Investor, Register as PPP
    </Text>
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
