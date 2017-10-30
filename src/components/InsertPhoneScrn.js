import React,{Component} from "react";
import { View,Alert} from 'react-native';
import MyTextInput from "./MyTextInput";
import MyBtn from "./MyBtn";
import Header from "./Header";

class InsertPhoneScrn extends Component {
  constructor(myProps){
    super();
    this.state={
      pressMeFunc:myProps.pressMe,
      setPhoneNumFunc:myProps.setPhoneNum

    }
//    this.getCache("phone");
  }
  render(){
    return (
      <View style={styles.viewStyle}>
        <Header/>
        <MyTextInput plcHolder="הזן את מספר הטלפון בבקשה" setPhoneNum={this.state.setPhoneNumFunc}/>
        <MyBtn title="בוא נמשיך" pressMe={this.state.pressMeFunc}/>
      </View>
    )
  }
/*
  async getCache(key){
    try{
        var vl=await AsyncStorage.getItem(key);
        Alert.alert(vl);
    }
    catch (e){
      Alert.alert ("there is an error/ the err is - ");
    }
  }
*/
}


const styles={
  viewStyle:{
    flex:1
  }
}

export default InsertPhoneScrn;
