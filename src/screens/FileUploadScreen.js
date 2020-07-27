
import React, {useContext, useEffect, useState} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  ScrollView,
  ToastAndroid,
  ActivityIndicator,
  View,
  Text,
  ImageBackground,
  Dimensions,
  Image,
} from 'react-native';
import ProgressCircle from 'react-native-progress-circle'
import { CounterContext } from "../../store";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {datasheetkey} from '../api/constants';
import { TouchableOpacity } from 'react-native-gesture-handler';
import PlayGround from '../components/playGround'
import HighwayCard from '../components/highwayNav';
import AsyncStorage from '@react-native-community/async-storage'
import DocumentPicker from 'react-native-document-picker';
import HighwayCircleCard from '../components/highwayCircleCard'
import Truncator from "../helpers/truncator";
import Currency from '../helpers/currency';
import {allAssignedContracts, uploadInspectionDatasheet, DatasheetPost} from '../api/apiService';
import {Colors} from '../components/colors';
import AdvertiseButton from '../components/advertiseButton';
import ValidationComponent from 'react-native-form-validator';
// custom imports
import Carousel from '../components/carousel'
import CarouselPlayGround from '../components/carouselPlayground'
import TimeAgo from 'react-native-timeago';
import Swipeout from 'react-native-swipeout';
import { fileIntelligience } from "../helpers/fileExtensionDetector";
import RNFetchBlob from 'rn-fetch-blob'
//checkVideoExtension checkImageExtension overallLegitFile
const FileUploadScreen = (props) => {    
    const { width, height } = Dimensions.get('window');
    const [token, setToken] = useState("");
    const [files, setFiles] = useState([]);

    const [needed, setNeeded] = useState([]);
    const [imagesNeeded, setImagesNeeded] = useState([]);
    const [videosNeeded, setVideosNeeded] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [type, setType] = useState("")
    const [title, setTitle] = useState("")
    const [content, changeContent] = useState("")
    const [user, setUser] = useState({});
    const [length, changeLength] = useState(0)
    const [id, setId] = useState("");
    const [defualtMsg, changeDefaultMsg] = useState("Upload Photos/Videos")
    const [all_datas, changeAllDatas] = useState({})
    const [parameters, changeParameters] = useState({})
    const [savedDatasheet, setSavedDatasheet] = useState([]);
    
   //let get a single datasheet
    useEffect(() => {
        let type = props.navigation.getParam('type', null)
        let id = props.navigation.getParam('id', null);
        let title = props.navigation.getParam('title', null)
        AsyncStorage.getItem("@SessionObj")
        .then((result)=>{          
            let parsifiedResult = JSON.parse(result);
            if(parsifiedResult!=null){
              let userDetails = parsifiedResult.userDetails;
              let { user_token } = userDetails;
              console.log("thy token",user_token)
              setToken(user_token);  
            }
        })
           
        setTitle(title);
        setId(id);
        
        
    }, []);
    console.log("this isthe type", type)
    const isNew = all_datas.new===true?true:false
   
const gotoLocalReport = (obj, title) => {
    console.log("selected obj",obj)
    props.navigation.navigate('SelectedLocalDatasheet', {
        datasheet:obj,
        title:title,
        contractId: id,
        token: token
    })
}

/*
<PlayGround home={true} navigation={props.navigation} title={title} 
height={height} width={width} navigate={props.navigation.navigate}>
*/ 

  const rightActionOne = (id) => (
    {
        backgroundColor: '#fff',
        component: (
          <View style={styles.swipeoutSide}>
            <Ionicons
              size={40}
              onPress={() => alert("Edit"+id)}
              color='#ffc107'
              name= {
                Platform.OS === 'ios'
                  ? `ios-create-outline`
                  : 'md-create'
              }/>
            </View>
          )
        }
  )

  const rightActionTwo = (id) => (
    {
        backgroundColor: '#fff',
        component: (
          <View style={styles.swipeoutSide}>
            <Ionicons
              size={40}
              onPress={() => alert("Delete"+id)}
              color='#dc3545'
              name= {
                Platform.OS === 'ios'
                  ? `ios-trash-outline`
                  : 'md-trash'
              }
            />
          </View>
        )
      }
  )

  const leftActionOne = (id) => (
    {
        backgroundColor: '#fff',
        component: (
          <View style={styles.swipeoutSide}>
            <Ionicons
              size={40}
              onPress={() => alert("Share", +id)}
              color='#007bff'
              name= {
                Platform.OS === 'ios'
                  ? `ios-share-outline`
                  : 'md-share-alt'
            }/>
          </View>
        )
      }
 )
  const leftActionTwo = (id) => (
     {
        backgroundColor: '#fff',
        component: (
          <View style={styles.swipeoutSide}>
            <Ionicons
              size={40}
              onPress={() => alert("Complete"+id)}
              color='#28a745'
              name= {
                Platform.OS === 'ios'
                  ? `ios-checkmark-circle-outline`
                  : 'md-checkmark-circle-outline'
            }/>
          </View>
        )
      }
  )
  

  const MultipleUploader = async () => {
    
    try {
        const results = await DocumentPicker.pickMultiple({
          type: [DocumentPicker.types.allFiles],
        });
        console.log("this iis ithe result",results)
        // for (const res of results) {
        //   console.log(
        //     res.uri,
        //     res.type, // mime type
        //     res.name,
        //     res.size
        //   );
        // }
        
        let detailedFileObj = fileIntelligience(results);
        console.log("the details", detailedFileObj)
        let {images, videos, needed} = detailedFileObj;
        setImagesNeeded(images);
        setVideosNeeded(videos);
        setNeeded(needed);
        setFiles(needed);
        changeDefaultMsg(
            `${results.length} Files Selected, 
            \n ${images.length} Images Selected,
            \n ${videos.length} Videos Selected,
            \n ${needed.length} Permitted Files`
        )
      } catch (err) {
        if (DocumentPicker.isCancel(err)) {
          // User cancelled the picker, exit any dialogs or menus and move on
        } else {
          throw err;
        }
      }

}

const showToastWithGravity = (msg) => {
    ToastAndroid.showWithGravity(
      msg,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  };

const submitMessage = () => {
  if(content.length>=10 && files.length>=1 ){
    setLoading(true)
        let payload = [
            {name: "contract_id", data: id.toString()},
            {name: "comment", data: content.toString()},

        ];
        for(var i in files){
            let eachcontent = {name : 'documents', filename : files[i].name, type:files[i].type, data: RNFetchBlob.wrap(files[i].uri)}        
            payload.push(eachcontent)
        }
        console.log(payload)
        DatasheetPost(token, payload)
        .then((data) => {
            console.log("succeeesosos", data)
            if(data.success==false){
                setLoading(false)
                showToastWithGravity(data.message)
            }
            else if(data.success==true) {
                setLoading(false)
                showToastWithGravity(data.message)
                props.navigation.navigate('HighwayMenu')
            }
        }
        )
    


  }
  else if(content.length<=9){
      alert("Content must be more than 9 characters")
  }
  else if(files.length==0){
      alert("No Permitted Video/Image has been selected")
  }
}

  return (
    <View style={{flex:1}}> 

    <View style={{backgroundColor:'green', flex: 1.6}}>
        <CarouselPlayGround>
           
           <Carousel navigation={props.navigation} contractName={title} title="Here You can Quickly Upload Your File for a this Project" imageLink = {require('../../assets/images/camera1.jpg')} description="File Uploaded must be an Image/Video File"/>
           <Carousel navigation={props.navigation} contractName={title} title="Update the Administrator with Realtime Images/Videos " imageLink = {require('../../assets/images/camera.jpg')} description="The Administrators will get this file upload in Realtime"/>
           <Carousel navigation={props.navigation} contractName={title} title="Make your Report Rich with the Right Videos" imageLink = {require('../../assets/images/camera5.jpg')} description="Upload is Very easy just click the Rectangular Container and Start uploading in Realtime"/>
           <Carousel navigation={props.navigation} contractName={title} title="Here You can Quickly Upload Your File for a this Project" imageLink = {require('../../assets/images/camera4.jpg')} description="File Uploaded must be an Image/Video File"/>
           <Carousel navigation={props.navigation} contractName={title} title="Lets make Nigeria Great Again" imageLink = {require('../../assets/images/camera6.jpg')} description="Remember, Every Image/Video Uploaded helps with Decision making of the Ministry"/>
        
        </CarouselPlayGround>
       
    </View>


    <View style={{flex:2,backgroundColor:'white',
        borderTopRightRadius:40, 
        marginTop:-30,
        borderTopLeftRadius:40,}}>
    
        <ScrollView style={{marginTop:30}}>    
            <View style={{justifyContent:'center'}}>
                

                <View style={[styles.eachCard]}>
                    <TouchableOpacity onPress={()=>MultipleUploader()}>
                <FontAwesome5 style={{alignSelf:'center', textAlign:'center'}} 
    name="camera" size={51} color="green"/>
  <Text style={styles.state}>{defualtMsg}</Text>  
  </TouchableOpacity>
                </View>
            </View>

            <View style={{marginBottom:20, marginTop:20}}>
            <Text style={[styles.title,{marginBottom:20}]}>Comment/Description/Remark</Text> 
            
            <View style={[styles.eachCard]}>
                <TextInput 
                textAlignVertical={'top'}
                value={content}
                placeholder="Content" 
                multiline={true}
                numberOfLines={10}
                style={{marginLeft:20,fontFamily:'Pacifico-Regular',}}
                onChangeText={(text) => changeContent(text)}
                />
            </View>
            {!isLoading &&
            <AdvertiseButton title="Upload Videos/Images" handleSubmit={()=>submitMessage()}/>
            }
            {isLoading &&
            <ActivityIndicator size="large" color="#07411D" />
            }
            </View>
        </ScrollView>
     
    </View>
      
        
          
      </View>
      );
    };
    
    
    
    export default FileUploadScreen;
    
    const styles = StyleSheet.create({
        swipeoutSide: {
            backgroundColor: '#fff',
           
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
          },
          listContainer: {
            borderRadius: 4,
            
            marginLeft: 15,
            marginRight: 15,
            marginTop: 5,
            marginBottom: 5,
            height: 82,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 9,
            },
            shadowOpacity: 0.50,
            shadowRadius: 12.35,
            
            elevation: 5,
              },
             
          listHeader: {
            flex: 1,
            justifyContent: 'center',
            marginLeft: 20
          },
          listTitle: {
            fontSize: 22,
            color: '#1A4024',
            marginBottom: 2,
            fontFamily:'Candara'
          },
          listSubTitle: {
            fontSize: 14,
            color: '#1A4024',
            fontFamily:'Candara'
          },
        cardParent: {
            marginVertical:10,
            height:170,
            borderRadius:10,
            backgroundColor:'green',
            width:'42%',
        },
        circularCard: {
          width:80,
          height:80,
          borderRadius:40,
          justifyContent:'center',
          borderColor:'white',
          borderWidth:1,
          alignSelf:'center'
        },
        image: {
         height:'100%',
          resizeMode: "cover",
        
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
          alignSelf:'center',
          backgroundColor:'white', 
          width:'90%', 
          borderRadius:10,
          height:250,
          justifyContent:'center',
          shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 9,
    },
    shadowOpacity: 0.50,
    shadowRadius: 12.35,
    
    elevation: 19,
      },
    longCard: {
        margin:10,
        backgroundColor:'white', 
        width:'90%', 
        borderRadius:10,
        height:80,
        justifyContent:'center',
        shadowColor: "#000",
  shadowOffset: {
      width: 0,
      height: 9,
  },
  shadowOpacity: 0.50,
  shadowRadius: 12.35,
  
  elevation: 19,
    },
   
     
      title: {
        marginTop:10, 
        marginBottom:20,
        textAlign:'center',
        color:'#095A1F',
        fontFamily:'Candara', 
        fontSize:15,
        
    },
    state: {
        marginTop:5, 
        textAlign:'center',
        color:'#095A1F',
        fontFamily:'Candara', 
        fontSize:13,
        
    },
    currentPercentage: {
        marginTop:10, 
        textAlign:'center',
        color:'white',
        fontFamily:'Candara', 
        fontSize:37,
    },
    
    })