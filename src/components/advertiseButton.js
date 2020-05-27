import React, {useContext} from 'react';
import {StyleSheet, ToastAndroid, TouchableOpacity, ActivityIndicator, TextInput, Button, Alert, SafeAreaView, ScrollView, Image, Text, View, RefreshControl, FlatList, StatusBar} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default function AdvertisementButton(props) {
    

  
  return (
   
        <TouchableOpacity onPress={props.handleSubmit} style={{flex:1, marginHorizontal:10, height:50, justifyContent:'center'}}>
        <LinearGradient style={{borderRadius:3,height:40, justifyContent:'center'}} colors={['#ffb656', '#f98845']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
            <Text style={{textAlign:'center', fontFamily:'Candara',  color:'white', fontSize:17}}>{props.title}</Text>
        </LinearGradient>
        </TouchableOpacity>
    
  );
}
