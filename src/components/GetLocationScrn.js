import React,{Component} from "react";
import { View,Alert} from 'react-native';
import MyBtn from "./MyBtn";
import Header from "./Header";

class GetLocationScrn extends Component {
  constructor(myProps){
    super();
    this.state={
      pressMeFunc:myProps.pressMe
    }
  }
  render(){
    return (
      <View style={styles.viewStyle}>
        <Header/>
        <MyBtn title="איפה אתה" pressMe={()=>this.getLocationData()}/>
      </View>
    )
  }
  getLocationData(){
    try{
      navigator.geolocation.getCurrentPosition(
        (position) =>{
          var oData={latitude:position.coords.latitude,longitude:position.coords.longitude};
          this.state.pressMeFunc(oData);
        },
        (error) =>{
            Alert.alert("there is an error when trying to retrieve location data. err is - "+err.message);
        },
        {
            enableHighAccuracy: false,
            timeout: 10000,
            maximumAge: 10000
        }
      )
    }
    catch(e){
      Alert.alert("didn't make it");
    }
  }
}


const styles={
  viewStyle:{
    flex:1
  }
}

export default GetLocationScrn;
