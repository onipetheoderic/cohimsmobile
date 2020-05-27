import React, {useState, useEffect} from 'react';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  ToastAndroid,
  Text, Alert,
  Dimensions,
  PixelRatio,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto'
import {datasheetkey} from '../api/constants';
import { TouchableOpacity } from 'react-native-gesture-handler';
import PlayGround from '../components/playGround'
import HighwayCard from '../components/highwayCard';
import AsyncStorage from '@react-native-community/async-storage';
import AdvertiseButton from '../components/advertiseButton';
import {allAssignedContracts, uploadInspectionDatasheet} from '../api/apiService';
import {Colors} from '../components/colors'
import TimeAgo from 'react-native-timeago';
import * as Animatable from 'react-native-animatable';


const AllSavedDatasheets = (props) => {    
    const { width, height } = Dimensions.get('window');
    const [token, setToken] = useState("");
    const [type, setType] = useState("")
    const [title, setTitle] = useState("")
    const [length, changeLength] = useState(0)
    const [id, setId] = useState("")
    const [all_datas, changeAllDatas] = useState({})
    const [parameters, changeParameters] = useState(null)
    const [savedDatasheet, setSavedDatasheet] = useState([]);
    const [showModal, changeShowModal] = useState(false)
    
   //let get a single datasheet
    useEffect(() => {
        let dataSheetArray = async () => await AsyncStorage.getItem(datasheetkey)
        dataSheetArray().then((val) => {
        if (val) {
            let Datasheets = JSON.parse(val)
            console.log("DDDDD",Datasheets)            
            setSavedDatasheet(Datasheets)          
            }
        })

    }, []);

const showDatasheet = (id,index) => {
 console.log("the show", id)
 changeShowModal(true)
 let selectedDatasheet = savedDatasheet[parseInt(index)];
 changeParameters(selectedDatasheet.components.components)
}

const deleteDatasheet = (id) => {
    let removedArray = savedDatasheet.filter( el => el.id !== id);
    let store = async () => await AsyncStorage.setItem(datasheetkey, JSON.stringify(removedArray))
    store().then(() => {
        
        showToastWithGravity("Datasheet Removed")
        setSavedDatasheet(removedArray)
    }).catch((e) => {
    console.warn(e.message)
    }) 
   
}

   const createTwoButtonAlert = (id, index) =>
      
    Alert.alert(
      "Update Post",
      "You edit or delete a post from here",
      [ 
        {
          text: "Show",
          onPress: () => showDatasheet(id, index)
        },
        
        { text: "Delete Datasheet", 
          onPress: () => deleteDatasheet(id)
        
      } 
      ],
      { cancelable: true }
    );

    function underscoreFormatter(str){
        let new_str = str.toUpperCase();
        return new_str.replace(/_/g, ' ');
    }

    const showToastWithGravity = (msg) => {
        ToastAndroid.showWithGravity(
            msg,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
        );
    };
console.log("ssssss",parameters)
  return (
    <>
      {showModal && parameters &&
      <Animatable.View duration={3000} animation="zoomInDown" style={{justifyContent:'center', borderRadius:10, position:'absolute', zIndex:1000, top:50, left:'10%', width:'80%', height:320, backgroundColor:'#07411D'}}>
           
      <ScrollView>
      {parameters.map((parameter, index) => (
            <Text style={{marginHorizontal:20, marginVertical:15, fontSize:15, color:'white', fontFamily:'Candara'}}>
              {underscoreFormatter(parameter.component_name)}: {parameter.component_score}km
            </Text>
      ))}
      <AdvertiseButton title="Close" handleSubmit={()=>changeShowModal(false)}/>
 
      </ScrollView>
      
</Animatable.View>
    }
<PlayGround home={true} navigation={props.navigation} title={title} height={height} width={width} navigate={props.navigation.navigate}>
<Text style={{fontFamily:'Candara', textAlign:'center', fontSize:16, margin:10}}>You are Newly Assigned to This project</Text>
<Text style={{fontFamily:'Candara', textAlign:'center', fontSize:16}}>Kindly select from your local inspection datasheet below</Text>
<View style={{marginBottom:70}}>

{savedDatasheet.map((savedDatasheet, index) => (
    
    <View style={styles.cardStyle} key={savedDatasheet.id}>
        <View style={{marginLeft:20}}>
        <Text style={{fontFamily:'Candara', fontSize:17, color:'white'}}>{savedDatasheet.title}</Text>
        <Text style={{fontFamily:'Candara', fontSize:12, color:'white'}}><TimeAgo time={savedDatasheet.date}/></Text>
        <Text style={{fontFamily:'Candara', fontSize:12, color:'white'}}>{underscoreFormatter(savedDatasheet.type)}</Text>
        <TouchableOpacity onPress={()=>createTwoButtonAlert(savedDatasheet.id, index)}>
            <Text style={{fontFamily: "Candara", fontSize:10}}>Datasheet setting</Text>
        </TouchableOpacity>
        </View>
    </View>
    
))}

</View>

</PlayGround>
    
      
  </>
  );
};



export default AllSavedDatasheets;

const styles = StyleSheet.create({
    
    cardParent: {
        marginVertical:10,
        height:170,
        borderRadius:10,
        backgroundColor:'green',
        width:'42%',
    },

    cardStyle: {
        marginVertical:10,
        backgroundColor:'green',
        width:'93%',
        justifyContent:'center',
        alignSelf:'center',
        height:80,
        shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 3.84,

elevation: 5,

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

/*In this screen we get all the saved datasheet and also create a function to do the following:
2)Delete Datasheet values

*/ 