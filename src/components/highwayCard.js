import React, {useContext} from 'react';
import {StyleSheet, ToastAndroid, TouchableOpacity, ActivityIndicator, TextInput, Button, Alert, SafeAreaView, ScrollView, Image, Text, View, RefreshControl, FlatList, StatusBar} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto'

export default function HighwayCard(props) {
  
  return (
   
    <View style={styles.cardParent}>
    <View>
        <TouchableOpacity onPress={()=>props.navigation.navigate('Project', {
            type:props.link
        })}>
            <View style={{justifyContent:'center'}}>
                <FontAwesome5 name={props.iconName} size={50} color="#cccccc" style={{marginBottom:15, marginTop:15,textAlign:'center'}} />
            </View>
            <Text style={{marginHorizontal:10, color:'white', fontSize:15, fontFamily:'Candara', textAlign:'center'}}>
                {props.title}
            </Text>
        </TouchableOpacity>
    </View>
</View>
   
  );
}

const styles = StyleSheet.create({
    cardParent: {
        marginVertical:10,
        height:150,
        borderRadius:10,
        backgroundColor:'green',
        width:'30%',
    },
    
    text: {
        fontFamily: "Candara",
        color: "#3e3e3e",
        fontSize:25
    },
})