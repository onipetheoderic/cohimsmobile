import React, {useContext} from 'react';
import {StyleSheet, ToastAndroid, TouchableOpacity, ActivityIndicator, TextInput, Button, Alert, SafeAreaView, ScrollView, Image, Text, View, RefreshControl, FlatList, StatusBar} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Currency from '../helpers/currency';
export default function ContractCard(props) {
    

  const monthly_operational_cost = props.monthly_operational_cost===null ? 0 : props.monthly_operational_cost
  return (
      <View style={{marginTop:20, marginBottom:20}}>
          
          
   
       <View style={styles.eachCard}>
        <View style={{width:'70%', marginLeft:20, }}>
        <Text style={{textAlign:'center', fontWeight:'500', marginBottom:10, fontSize:17, fontFamily:'Candara', color:'#03260A'}}>
            {props.name}
        </Text>
       
        <Text style={{textAlign:'center', fontSize:13,
         fontFamily:'Candara', color:'#758578'}}>
            {props.title} {props.type}
        </Text>
        <Text style={{textAlign:'center', fontWeight:'500', marginBottom:10, 
        fontSize:13, fontFamily:'Candara', color:'#758578'}}>
          Amount Certified To Date: ‎{Currency(props.amount_certified_to_date)}
        </Text>
        <Text style={{textAlign:'center', fontWeight:'500', marginBottom:10, 
        fontSize:13, fontFamily:'Candara', color:'#758578'}}>
          Contract Sum: ‎{Currency(props.contract_sum)}
        </Text>
        <Text style={{textAlign:'center', fontWeight:'500', marginBottom:10, 
        fontSize:12, fontFamily:'Candara', color:'#758578'}}>
          Project Length:  {props.project_length}
        </Text>
        <Text style={{textAlign:'center', fontWeight:'500', marginBottom:10, 
        fontSize:12, fontFamily:'Candara', color:'#758578'}}>
          Date Awarded:  {props.date_awarded}
        </Text>
        <Text style={{textAlign:'center', fontWeight:'500', marginBottom:10, 
        fontSize:12, fontFamily:'Candara', color:'#758578'}}>
          Date of Completion:  {props.date_completion}
        </Text>
        <Text style={{textAlign:'center', fontWeight:'500', marginBottom:10, 
        fontSize:12, fontFamily:'Candara', color:'#758578'}}>
          Monthly Operational Cost:  {Currency(monthly_operational_cost)}
        </Text>
        </View>
     
       <LinearGradient style={styles.circle} colors={['#33FC5E', '#0A4B12']}>
    <Text style={{textAlign:'center', fontSize:35, fontFamily:'Candara', color:'white'}}>
            {props.count}
        </Text>
        </LinearGradient>
       </View>

    </View>

  );
}



const styles = StyleSheet.create({
    icon: {
        alignSelf:'center', 
        textAlign:'center', 
        color:'white',
       
    },
  eachCard: {
    margin:10,
    backgroundColor:'white', 
    width:'88%', 
    borderRadius:10,
    height:280,
    alignSelf:'flex-start',
    justifyContent:'center',
    shadowColor: "#000",
shadowOffset: {
width: 0,
height: 9,
},
shadowOpacity: 0.50,
shadowRadius: 12.35,

elevation: 10,
},

circle: {
    borderWidth:4,
    borderColor:'white',
    position:'absolute', 
    borderRadius:35, 
    right:-30, 
    top:30, 
    justifyContent:'center',
    width:70, 
    height:70, 
    shadowColor: "#000",
shadowOffset: {
width: 0,
height: 9,
},
shadowOpacity: 0.50,
shadowRadius: 15.35,

elevation: 22,
},


image: {
  height:'100%',
   resizeMode: "cover",
 
 },


    default: {
        fontSize:10,
        color:'white',
        textAlign:'center'
    },
   
  title: {
    marginTop:10, 
    marginBottom:20,
    textAlign:'center',
    color:'#095A1F',
    fontFamily:'Candara', 
    fontSize:13,
    
},
state: {
    marginTop:5, 
    textAlign:'center',
    color:'#095A1F',
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

