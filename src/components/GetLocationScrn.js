import React,{Component} from "react";
import { View,Text,Alert} from 'react-native';
import MySmallBtn from "./MySmallBtn";
import Hdr from "./Hdr";

class GetLocationScrn extends Component {
  constructor(myProps){
    super();
    this.state={
      pressMeFunc:myProps.pressMe
    }
  }
  render(){
    return (
      <View style={styles.wrapperStyle}>
        <Hdr>neighberboards</Hdr>
        <View style={styles.mainBdy}>
          <View style={styles.paragraphWrapper}>
            <Text style={styles.paragraphText}>neighberboards is a location based bulletin board in which you are requested to give your location data only once, when you are in your house.</Text>
          </View>
          <View style={styles.paragraphWrapper}>
            <Text style={styles.paragraphText}>from here on, you and everyone in your neighberboard, meaning anyone who registered in a radius close to your registration place will be related to the same bulletin board, regardless of where the message was sent or received.</Text>
          </View>
        </View>
        <MySmallBtn style={styles.btnStyle} title="i'm at home, take my location data" pressMe={()=>this.getLocationData()} smallBtnStyle={{width:"auto"}}/>
      </View>
    )
  }
  getLocationData(){
    try{
      navigator.geolocation.getCurrentPosition(
        (position) =>{
          var oData={latitude:position.coords.latitude,longitude:position.coords.longitude};
          Alert.alert("latitude="+position.coords.latitude+"longitude="+position.coords.longitude);
          this.state.pressMeFunc(oData);
        },
        (error) =>{
            Alert.alert("02/01/2018 - there is an error when trying to retrieve location data. err is - "+error.message);
//            Alert.alert("there is an error when trying to retrieve location data. err is - "+error.message);
        },
        {
            enableHighAccuracy:false,
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
  wrapperStyle:{
    flex:1,
    justifyContent:"space-between",
    alignItems:"center",
    backgroundColor:"white"
  },
  mainBdy:{
    width:"80%"
  },
  btnStyle:{
  },
  paragraphWrapper:{
  },
  paragraphText:{
    fontFamily:"Roboto",
    fontSize:20,
    color:"#aaa"
  }
}
export default GetLocationScrn;
