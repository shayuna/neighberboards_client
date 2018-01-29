import React,{Component} from "react";
import { View,Text,Alert} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import MySmallBtn from "./MySmallBtn";
import Hdr from "./Hdr";

class GetLocationScrn extends Component {
  constructor(myProps){
    super();
    this.state={
      pressMeFunc:myProps.pressMe,
      isDisabled:false
    }
  }
  render(){
    return (
      <View style={[styles.wrapperStyle]}>
        <Spinner visible={this.state.isDisabled} textContent={""} textStyle={{}} />
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
    this.setState({isDisabled:true});
    try{
      navigator.geolocation.getCurrentPosition(
        (position) =>{
          var oData={latitude:position.coords.latitude,longitude:position.coords.longitude};
          console.log("latitude="+position.coords.latitude+"longitude="+position.coords.longitude);
          this.state.pressMeFunc(oData);
        },
        (error) =>{
            var sMsg="02/01/2018 - there is an error when trying to retrieve location data. err is - "+error.message;
            if (error.message.toLowerCase().indexOf("no location provider available")>-1){
              Alert.alert ("you should turn your location service on for this one-time operation");
            }
            else if (error.message.toLowerCase().indexOf("location request timed out")>-1){
              Alert.alert("there is some problem in retrieving your location data. you can try again in a few minutes.")
            }
            this.setState({isDisabled:false});
            console.log (sMsg);
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
  },
}
export default GetLocationScrn;
