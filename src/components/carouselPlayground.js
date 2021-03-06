import React, {useContext,useEffect, useState} from 'react';
import {StyleSheet, ToastAndroid, TouchableOpacity, ActivityIndicator, 
    TextInput, Button, Alert, SafeAreaView, Dimensions, ScrollView, Image, Text,
     View, RefreshControl,ImageBackground, FlatList, StatusBar} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto'

/*


const SplashScreen = (props) => {
*/ 
const CarouselPlayground = (props) => {
    const [total, setTotal] = useState(0)
    const [current, setCurrent] = useState(0);
    const [allChildren, setChildren] = useState([])
    const { width, height } = Dimensions.get('window');
    useEffect(() => {   
        let allChildToArray = React.Children.toArray(props.children)
        setChildren(allChildToArray)
        setTotal(React.Children.count(props.children))

        const id= setTimeout(() => {
            setCurrent(current+1==total?0:current+1)
          }, 6000);
          return () => {
            clearTimeout(id);
          };
        },
        [current],);
       
        const bullets = Array(total).fill("○")   
        // const bullets = ["○","○","○"];
        bullets[current] = "⏺"
  return (
      <View>
    <View style={{flex:1}}>
        {allChildren[current]}        
        
    </View>
    <View style={{alignSelf:'center'}}>
        <Text style={{color:'white', marginTop:height/2.8, fontSize:12}}>{bullets}</Text>
        </View>
    </View>
  );
}

export default React.memo(CarouselPlayground);

const styles = StyleSheet.create({
    headerIcon: {
        marginTop:6
    },
    
    text: {
        fontFamily: "Candara",
        color: "#3e3e3e",
        fontSize:28
    },
    image: {
        flex:1,
        width: undefined,
        height: undefined,
    },
    subText: {
        fontSize: 12,
        color: '#AEB5BC',
        textTransform: 'uppercase',
        fontWeight: '500'
    },  
    titleBar: {
        flexDirection: 'row',
       
        justifyContent: "space-between",
        marginTop: 18,
        marginHorizontal: 12,
        marginBottom:10
    },
    



})