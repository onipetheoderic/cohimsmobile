
import React, {useState, useEffect} from 'react';
import {View, Alert, Text,ScrollView, TouchableOpacity, StatusBar, Dimensions, Image, StyleSheet} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import * as Animatable from 'react-native-animatable';
import Video from 'react-native-video';
// import Video from 'react-native-af-video-player';
import { TextInput } from 'react-native-gesture-handler';
import {Colors} from '../components/colors'
import SignInButton from '../components/signInButton';
import { Grid, YAxis, XAxis,StackedBarChart } from 'react-native-svg-charts'  
import {VictoryLabel, VictoryBar, VictoryPie, VictoryChart, VictoryTheme } from "victory-native";
import {Contract} from '../api/contract';
import truncator from '../helpers/truncator';
import currency from '../helpers/currency';
import { getSingleContract, } from '../api/apiService';//accepts id and type
import {imageUrl} from '../api/constants';
import MediaControls, { PLAYER_STATES } from 'react-native-media-controls';
const screenWidth = Dimensions.get("window").width;
import { NavigationActions, StackActions } from 'react-navigation'

const LoginScreen = (props) => {
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [paused, setPaused] = useState(false);
    const [playerState, setPlayerState] = useState(PLAYER_STATES.PLAYING);

    const [ total_money_supposed_to_be_spent, changeTotalMoneySpent ] = useState("")
    const [singleContract, changeContract] = useState({})
    const [stages_construction, changeStages] = useState([]);
    const [images, changeImages] = useState([]);
    const [videos, changeVideos] = useState([]);
    const [dailyBudget, changeDailyBudget] = useState("");
    const [contracts_handled_by_contractor, changeContractorsProject] = useState([])
    const [moneyPaidSoFar, changeMoneyPaidSoFar] = useState("");
    const [supposedPercentage, changeSupposedPercentage] = useState("");

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
       
      
        console.log("the videos", data.contract_videos)
        if(data.contract_videos.length!=0){
            changeVideos(data.contract_videos)
        }
       

        changeContractorsProject(JSON.parse(data.allContracts));
        changeDailyBudget(data.dailyBudget)
        if(data.contract_images.length!=0){
            changeImages(data.contract_images);
        }
       
        changeContract(data.data);
        changeStages(JSON.parse(data.componentData));
        changeTotalMoneySpent(data.total_money_supposed_to_be_spent);
        changeMoneyPaidSoFar(data.moneyPaidSoFar);
        changeSupposedPercentage(data.supposed_percentage)

        //"contracts_handled_by_contractor
        
    })
}, []);


let parametersAbsent = !Object.keys(singleContract).length;

console.log("from single contract",parametersAbsent)
// console.log("videos",contract_videos)

console.log("contracts_handled_by_contractor", contracts_handled_by_contractor)

const imagePresentChecker = images==undefined?false:true;
const stagesPresentChecker = stages_construction==undefined?false:true;

const iscontractorContractPresent = contracts_handled_by_contractor.length==0?false:true;


  
const graphDataFormat = [];
for(var i in stages_construction){
    let format = {
        x: i,
        y:parseInt(stages_construction[i].component_score)/50,
        label:truncator(stages_construction[i].component_name, 13)
    }
    if(stages_construction[i].component_score!=undefined)
    {
        graphDataFormat.push(format)
    }
    
}
//https://www.radiantmediaplayer.com/media/big-buck-bunny-360p.mp4
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
               {stage.component_name} ({stage.component_score})
            </Text>
        ))}
        
    

      </View>
      }
   
   <ScrollView>
   <Text style={{fontFamily:'Candara', fontSize:15}}>Contract Videos</Text>
          {videos.map((video) =>{
              return(
                <View style={{width:'100%'}}>
                {video.video.map((singleVideo) => (
        <View style={styles.videoContainer}>
            <Video
            paused={true}
            controls = {true}
            resizeMode="cover"
            onLoadStart={() => {console.log("loading started")}} 
            onLoad={() => {console.log("loading done")}}
            source={{uri: imageUrl+singleVideo}}                         

            style={styles.video}/>
            <Text style={{fontFamily:'Candara', fontSize:10}}>{video.comment}</Text>
        </View>
                
                   
                ))}
               
               </View>
          )})}    
        </ScrollView>
        {/* <View style={styles.videoContainer}>
            <Video
            paused={true}
            controls = {true}
            resizeMode="cover"
            onLoadStart={() => {console.log("loading started")}} 
            onLoad={() => {console.log("loading done")}}
            source={{uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'}}                         

            style={styles.video}/>
        </View>                               */}
                   
        

       
        {imagePresentChecker &&
        <View>
        <View style={{marginLeft:10}}>
      <Text style={{fontFamily:'Candara', fontSize:20}}>Images of Ongoing Construction</Text>
      </View>

        <ScrollView horizontal>
          {images.map((image) =>{
              return(
                <ScrollView horizontal>
                {image.image.map((singleImage) => (
                    <View style={styles.eachCard}>
                     <Image source={{uri: imageUrl+singleImage}}
                        style={{width:200, height:150,resizeMode:'stretch'}}>
                    </Image>
                <Text style={{fontFamily:'Candara', fontSize:10}}>{image.comment}</Text>
                    </View>
                ))}
               
               </ScrollView>
          )})}    
        </ScrollView>
        </View>
    }
    {iscontractorContractPresent &&
        <View style={{marginLeft:10}}>
        <Text style={{fontFamily:'Candara', textAlign:'center', fontSize:18}}>
            Contracts Handled By Contractor
            </Text>
            {contracts_handled_by_contractor.map((stage) =>(
                <Text style={{fontSize:12, marginHorizontal:3, marginVertical:7, fontFamily:'Candara'}}>
                <FontAwesome5 name="location-arrow" size={10} color="#07411D" />
                {stage.name} ({stage.state})({stage.current_percentage}%)
                </Text>
            ))}
      </View>
      }
      {!parametersAbsent &&
      <View style={[styles.bottomCard, {marginLeft:20, marginTop:30}]}>
      <View style={{flexDirection:'row', justifyContent:'space-between', marginHorizontal:20}}>    
            <Text style={styles.subText}>Project Name</Text>
            <Text style={[styles.bottomText, {fontSize:10}]}>{singleContract.projectTitle}</Text>
        </View>
        <View style={{flexDirection:'row', justifyContent:'space-between', marginHorizontal:20}}>    
            <Text style={styles.subText}>Contract Type</Text>
            <Text style={[styles.bottomText, {fontSize:14}]}>{singleContract.contract_type} Contract</Text>
        </View>
        <View style={{flexDirection:'row', justifyContent:'space-between', marginHorizontal:20}}>    
            <Text style={styles.subText}>Project Length</Text>
            <Text style={[styles.bottomText, {fontSize:12}]}>{singleContract.projectLength}km</Text>
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
            <Text style={styles.bottomText}>₦{currency(singleContract.contractSum)}</Text>
        </View>
        <View style={{flexDirection:'row', justifyContent:'space-between', marginHorizontal:20}}>    
            <Text style={styles.subText}>Expected Percentage Delivery</Text>
            <Text style={styles.bottomText}>{supposedPercentage}%</Text>
        </View>
        <View style={{flexDirection:'row', justifyContent:'space-between', marginHorizontal:20}}>    
        <Text style={styles.subText}>Current Percentage</Text>
        <Text style={styles.bottomText}>{Math.round(singleContract.currentPercentage)}%</Text>
        </View>
          <View style={{flexDirection:'row', justifyContent:'space-between', marginHorizontal:20}}>    
        <Text style={styles.subText}>Amount Certified To Date</Text>
        <Text style={styles.bottomText}>{currency(singleContract.amountCertifiedToDate)}</Text>
        </View>
        <View style={{flexDirection:'row', justifyContent:'space-between', marginHorizontal:20}}> 
            <Text style={styles.subText}>Accumulated Daily Budget</Text>
            <Text style={styles.bottomText}>{currency(Math.round(total_money_supposed_to_be_spent))}</Text>
        </View>
        <View style={{flexDirection:'row', justifyContent:'space-between', marginHorizontal:20}}> 
            <Text style={styles.subText}>Daily Contract Budget</Text>
            <Text style={styles.bottomText}>{currency(Math.round(dailyBudget))}</Text>
        </View>
      </View>
}

      </ScrollView>
  );
};

const styles = StyleSheet.create({
    videoContainer: {
        height:200,
        width:'100%',
        marginVertical:10,
        backgroundColor: 'black',
    },
    video: {
        height:200,
        width:'100%',
    },
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
        width:200, 
        borderRadius:10,
        height:200
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
