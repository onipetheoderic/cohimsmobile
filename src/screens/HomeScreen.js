/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useContext} from 'react';
import { CounterContext } from "../../store";
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
import {Foods} from '../api/foods'
import Header from '../components/header';
import CountDisplay from '../components/countDisplay';
import FoodCard from '../components/foodCard'
import { TouchableOpacity } from 'react-native-gesture-handler';
import PlayGround from '../components/playGround'


const App = (props) => {
    
    const { width, height } = Dimensions.get('window');
   
  return (
    <>
      
<PlayGround home={true} navigation={props.navigation} title="New Product" height={height} width={width} navigate={props.navigation.navigate}>
        
         <View style={{flexDirection:'row',marginTop:20,marginBottom:100, justifyContent:'space-evenly', flexWrap:'wrap'}}>
         {Foods.map((food, index) => (
            <FoodCard navigation={props.navigation} key={food.id} id={food.id} name={food.name} price={food.price} image={food.image} description={food.description}/>
         ))}
    
      </View>
      </PlayGround>
  </>
  );
};



export default App;
