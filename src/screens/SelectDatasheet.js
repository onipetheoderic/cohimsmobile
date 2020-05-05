import React, {useState, useEffect} from 'react';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Dimensions,
  PixelRatio,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto'
import {datasheetkey} from '../api/constants';
import { TouchableOpacity } from 'react-native-gesture-handler';
import PlayGround from '../components/playGround'
import HighwayCard from '../components/highwayCard';
import AsyncStorage from '@react-native-community/async-storage'
import {allAssignedContracts, uploadInspectionDatasheet} from '../api/apiService';
import {Colors} from '../components/colors'
import TimeAgo from 'react-native-timeago';


const HighwayMenu = (props) => {    
    const { width, height } = Dimensions.get('window');
    const [token, setToken] = useState("");
    const [type, setType] = useState("")
    const [title, setTitle] = useState("")
    const [length, changeLength] = useState(0)
    const [id, setId] = useState("")
    const [all_datas, changeAllDatas] = useState({})
    const [parameters, changeParameters] = useState({})
    const [savedDatasheet, setSavedDatasheet] = useState([]);
    
   //let get a single datasheet
    useEffect(() => {
        let type = props.navigation.getParam('type', null)
        let id = props.navigation.getParam('id', null);
        let title = props.navigation.getParam('title', null)
        setType(type);
        setTitle(title);
        setId(id)

        let dataSheetArray = async () => await AsyncStorage.getItem(datasheetkey)
        dataSheetArray().then((val) => {
          if (val) {
            let Datasheets = JSON.parse(val)
            console.log("DDDDD",Datasheets)
            setSavedDatasheet(Datasheets)          
          }
        })
        uploadInspectionDatasheet(id, type).then((data)=>{
            changeLength(data.length)
            if(data.new===false){             
                changeAllDatas(data.data)  
                changeParameters(data.parameters)             
            }
            else if(data.new===true){
                changeAllDatas(data)
            }
        })
                
    }, []);

    const isNew = all_datas.new===true?true:false
    function underscoreFormatter(str){
        let new_str = str.toUpperCase();
        return new_str.replace(/_/g, ' ');
    }
console.log("state vals", )
  return (
    <>
      
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
        </View>
    </View>
    
))}

</View>

</PlayGround>
    
      
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