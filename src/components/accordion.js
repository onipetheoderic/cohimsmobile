import React, {useContext, useState} from 'react';
import {StyleSheet, ToastAndroid, TouchableOpacity, ActivityIndicator, TextInput, Button, Alert, SafeAreaView, ScrollView, Image, Text, View, RefreshControl, FlatList, StatusBar} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo'
import * as Animatable from 'react-native-animatable';

export default function Accordion(props) {
    const [userClicked, setUserClicked] = useState(false);

  const iconState = userClicked === true ? "chevron-thin-down" : "chevron-thin-right"
  return (
    <TouchableOpacity onPress={()=>setUserClicked(!userClicked)}>
      <View style={styles.eachCard}>
         
          <View style={{marginLeft:20}}>
            <Text style={{fontFamily:'Candara'}}>Users Contract Summary</Text>
            <Text style={{color:'#758177', fontFamily:'Candara', fontSize:11}}>Users Contract Summary</Text>
          </View>
          <View style={{marginRight:10}}>
            {/* chevron-thin-right*/}
            <Entypo name={iconState}
            size={20} color="black" />
          </View>
         
      </View>
      {userClicked &&
      <Animatable.View animation="zoomInUp" 
      style={{alignSelf:'center', backgroundColor:'white', width:'90%', marginTop:-20}}>
        <View style={{marginTop:20}}>
        <View style={{flexDirection:'row', marginLeft:20, marginVertical:5}}>
            <Entypo name="circle"
                size={5} color="black" style={{alignSelf:'center', marginRight:5}}/>
                
            <Text style={{color:'#758177', 
            fontFamily:'Candara',
            
            fontSize:11}}>
            Total Number of Contract: 7
            </Text>
        </View>
        
        
        <View style={{flexDirection:'row', marginLeft:20}}>
            <Entypo name="circle"
                size={5} color="black" style={{alignSelf:'center', marginRight:5}}/>
                
            <Text style={{color:'#758177', 
            fontFamily:'Candara',
            
            fontSize:11}}>
            Total Number of Contract: 7
            </Text>
        </View>


        </View>
      </Animatable.View>
      }

      
      </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
    eachCard: {
      margin:10,
      backgroundColor:'white', 
      width:'90%', 
      flexDirection:'row',
      borderRadius:10,
      height:80,
      alignItems:'center',
      justifyContent:'space-between',
      alignSelf:'center',
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
})