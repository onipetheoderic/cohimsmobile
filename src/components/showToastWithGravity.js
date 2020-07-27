import React, {useContext} from 'react';
import {StyleSheet, ToastAndroid, TouchableOpacity, TouchableHighlight, ActivityIndicator, TextInput, Button, Alert, SafeAreaView, ScrollView, Image, Text, View, RefreshControl, FlatList, StatusBar} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from './colors'
export default function ShowToastwithGravity(props) {


     
const showToastWithGravity = (msg) => {
    ToastAndroid.showWithGravity(
        msg,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
    );
};

  return (
    <>
    {showToastWithGravity(props.msg)}
    </>
  );

}
