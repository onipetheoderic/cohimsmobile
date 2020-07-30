
import React, {useState, useEffect} from 'react';
import {View, Alert, Text,ScrollView, TouchableOpacity, StatusBar, Dimensions, Image, StyleSheet} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import * as Animatable from 'react-native-animatable';

import { TextInput } from 'react-native-gesture-handler';
import {Colors} from '../components/colors'
import SignInButton from '../components/signInButton';
import { Grid, YAxis, XAxis,StackedBarChart } from 'react-native-svg-charts'  
import {VictoryLabel, VictoryBar, VictoryPie, VictoryChart, VictoryTheme } from "victory-native";
import {Contract} from '../api/contract'
import { getSingleContract, } from '../api/apiService';//accepts id and type
import {imageUrl} from '../api/constants';
const screenWidth = Dimensions.get("window").width;
import { NavigationActions, StackActions } from 'react-navigation'

const LoginScreen = (props) => {
    const [singleContract, changeContract] = useState({})
    const [stages_construction, changeStages] = useState([]);
    const [images, changeImages] = useState([]);
    const [contracts_handled_by_contractor, changeContractorsProject] = useState([])
    const { width, height } = Dimensions.get('window');
    setTimeout(() => {
        props.navigation.navigate('HomeScreen'); //this.props.navigation.navigate('Login')
    }, 4300); 

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

useEffect(() => {
    console.log(props.navigation)
    let type_of_project = props.navigation.getParam('type_of_project', null);
    let id = props.navigation.getParam('id', null);
    console.log("this is the type n id", type_of_project, id)
    getSingleContract(id, type_of_project).then((data)=>{
        console.log("the data", data)
        changeImages(data.images);
        changeContract(data);
        changeStages(data.stages_construction);
        //"contracts_handled_by_contractor
        changeContractorsProject(data.contracts_handled_by_contractor);
        
    })
}, []);
function truncator(str, length) {
    var trimmedString = str.substr(0, length);
    return trimmedString + ".."
}


let parametersAbsent = !Object.keys(singleContract).length;

console.log("from single contract",parametersAbsent)
console.log("images",images)
console.log("stages", stages_construction, )
console.log("contracts_handled_by_contractor", contracts_handled_by_contractor)

const imagePresentChecker = images==undefined?false:true;
const stagesPresentChecker = stages_construction==undefined?false:true;

 function currency(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  
const graphDataFormat = [];
for(var i in stages_construction){
    let format = {
        x: i,
        y:parseInt(stages_construction[i].value)/50,
        label:truncator(stages_construction[i].stage, 13)
    }
    if(stages_construction[i].value!=undefined)
    {
        graphDataFormat.push(format)
    }
    
}
  return (

    <ScrollView style={{backgroundColor:'white'}}>
      <StatusBar translucent={true} backgroundColor="transparent"/>
      <View style={{marginTop:40, justifyContent:'center'}}>
      <Text style={{fontFamily:'Candara',textAlign:'center', fontSize:25}}>{Contract.project_name}</Text>
      </View>
      {stagesPresentChecker &&
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{marginLeft:10}}>          
       
        
        <VictoryPie
         data={graphDataFormat}  
         labelComponent={<VictoryLabel angle={-60}/>}
        
         style={{fontSize:8, labels:{fontSize:8}}}       
        />
               
      </ScrollView>
}

{stagesPresentChecker &&
      <View style={{marginLeft:10}}>
      <Text style={{fontFamily:'Candara', textAlign:'center', fontSize:18}}>
        Stages of Construction
        </Text>
        {stages_construction.map((stage) =>(
              <Text style={{fontSize:13, marginHorizontal:5, marginVertical:10, fontFamily:'Candara'}}>
              <FontAwesome5 name="location-arrow" size={10} color="#07411D" />
               {stage.stage} ({stage.value})
            </Text>
        ))}
        
    

      </View>
      }
      <ScrollView horizontal>
         
        </ScrollView>

       
        {imagePresentChecker &&
        <View>
        <View style={{marginLeft:10}}>
      <Text style={{fontFamily:'Candara', fontSize:20}}>Images of Ongoing Construction</Text>
      </View>

        <ScrollView horizontal>
          {images.map((image) => (
            <View style={styles.eachCard}>
                <Image source={{uri: imageUrl+image}}
                    style={{width:200, height:150,resizeMode:'stretch'}}>
                </Image>
            </View>
          ))}       
        </ScrollView>
        </View>
    }
        <View style={{marginLeft:10}}>
        <Text style={{fontFamily:'Candara', textAlign:'center', fontSize:18}}>
            Contracts Handled By Contractor
            </Text>
            {contracts_handled_by_contractor.map((stage) =>(
                <Text style={{fontSize:12, marginHorizontal:3, marginVertical:7, fontFamily:'Candara'}}>
                <FontAwesome5 name="location-arrow" size={10} color="#07411D" />
                {stage.contract_name} ({stage.state})
                </Text>
            ))}
      </View>
      {!parametersAbsent &&
      <View style={[styles.bottomCard, {marginLeft:20, marginTop:30}]}>
      <View style={{flexDirection:'row', justifyContent:'space-between', marginHorizontal:20}}>    
            <Text style={styles.subText}>Project Name</Text>
            <Text style={[styles.bottomText, {fontSize:14}]}>{singleContract.project_name}</Text>
        </View>
        <View style={{flexDirection:'row', justifyContent:'space-between', marginHorizontal:20}}>    
            <Text style={styles.subText}>Contract Type</Text>
            <Text style={[styles.bottomText, {fontSize:14}]}>{singleContract.contract_type} Contract</Text>
        </View>
        <View style={{flexDirection:'row', justifyContent:'space-between', marginHorizontal:20}}>    
            <Text style={styles.subText}>Project Length</Text>
            <Text style={[styles.bottomText, {fontSize:12}]}>{singleContract.project_length}km</Text>
        </View>
        <View style={{flexDirection:'row', justifyContent:'space-between', marginHorizontal:20}}>    
            <Text style={styles.subText}>State</Text>
            <Text style={styles.bottomText}>{Contract.state}</Text>
        </View>
        <View style={{flexDirection:'row', justifyContent:'space-between', marginHorizontal:20}}>    
            <Text style={styles.subText}>LGA</Text>
            <Text style={styles.bottomText}>{singleContract.lga}</Text>
        </View>
        <View style={{flexDirection:'row', justifyContent:'space-between', marginHorizontal:20}}>    
            <Text style={styles.subText}>Zone</Text>
            <Text style={styles.bottomText}>{singleContract.zone}</Text>
        </View>
        <View style={{flexDirection:'row', justifyContent:'space-between', marginHorizontal:20}}>    
            <Text style={styles.subText}>Name of Contractor</Text>
            <Text style={styles.bottomText}>{singleContract.name_of_contractor}</Text>
        </View>
      </View>
      }
       {!parametersAbsent &&
      <View style={styles.bottomCard}>
        <View style={{flexDirection:'row', justifyContent:'space-between', marginHorizontal:20}}>    
            <Text style={styles.subText}>Contract Sum</Text>
            <Text style={styles.bottomText}>₦{currency(singleContract.contract_sum)}</Text>
        </View>
        <View style={{flexDirection:'row', justifyContent:'space-between', marginHorizontal:20}}>    
            <Text style={styles.subText}>Expected Percentage Delivery</Text>
            <Text style={styles.bottomText}>{singleContract.epd}%</Text>
        </View>
        <View style={{flexDirection:'row', justifyContent:'space-between', marginHorizontal:20}}>    
        <Text style={styles.subText}>Current Percentage</Text>
        <Text style={styles.bottomText}>{Math.round(singleContract.current_percentage)}%</Text>
        </View>
          <View style={{flexDirection:'row', justifyContent:'space-between', marginHorizontal:20}}>    
        <Text style={styles.subText}>Amount Paid So Far</Text>
        <Text style={styles.bottomText}>₦{currency(singleContract.amount_paid_so_far)}</Text>
        </View>
        <View style={{flexDirection:'row', justifyContent:'space-between', marginHorizontal:20}}> 
            <Text style={styles.subText}>Accumulated Daily Budget</Text>
            <Text style={styles.bottomText}>₦{currency(Math.round(singleContract.accumulated_daily_budget))}</Text>
        </View>
        <View style={{flexDirection:'row', justifyContent:'space-between', marginHorizontal:20}}> 
            <Text style={styles.subText}>Daily Contract Budget</Text>
            <Text style={styles.bottomText}>₦{singleContract.daily_contract_budget}</Text>
        </View>
      </View>
}

      </ScrollView>
  );
};

const styles = StyleSheet.create({
    bottomText: {
        fontFamily:'Candara',
        fontWeight:'bold',
        fontSize:13,
        color: "black",
        marginLeft:10,
        marginTop:10
    },  
    subText: {
        fontFamily:'Candara',
        fontWeight:'bold',
        fontSize:11,
        color: "black",
        marginLeft:10,
        marginTop:12
    },  
    bottomCard: {
        width:'90%',
        backgroundColor:'white',
        height:210,
        marginLeft:'auto',
        marginRight:'auto',
        marginBottom:20,
        shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 4,
},
shadowOpacity: 0.41,
shadowRadius: 9.11,

elevation: 8,
    },
    eachCard: {
        margin:10,
        backgroundColor:Colors.mainGreen, 
        width:200, 
        borderRadius:10,
        height:150
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
