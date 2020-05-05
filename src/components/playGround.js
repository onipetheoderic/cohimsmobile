import React, {useContext} from 'react';
import {StyleSheet, Dimensions,ToastAndroid, TouchableOpacity, ActivityIndicator, TextInput, Button, Alert, SafeAreaView, ScrollView, Image, Text, View, RefreshControl, FlatList, StatusBar} from 'react-native';
import { CounterContext } from "../../store";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto'
import Header from './header';




export default function PlayGround(props) {
    const {state} = useContext(CounterContext)
    console.log("this is the count", state)
 
    
  return (
    <SafeAreaView style={{backgroundColor:'white'}}>
        <View style={{backgroundColor:'white', marginBottom:10}}>
            <Header title={props.title} navigation={props.navigation} home={props.home}/>
        </View>
  
            <ScrollView style={{backgroundColor:'white'}}
            contentInsetAdjustmentBehavior="automatic"
            showsVerticalScrollIndicator={false}>
                {props.children}            
            </ScrollView>                
   
    

   </SafeAreaView>
   
  );
}

const styles = StyleSheet.create({
    headerIcon: {
        marginTop:6
    },

    titleBar: {
        flexDirection: 'row',
    
    },
    



})