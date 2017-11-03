import React,{Component} from "react";
import { AppRegistry,Alert,View,Text,AsyncStorage } from "react-native";
import InsertPhoneScrn from "./src/components/InsertPhoneScrn";
import GetLocationScrn from "./src/components/GetLocationScrn";
import Board from "./src/components/Board";

class App extends Component {
  state={
    scrn:1,
    phoneNum:"",
    longitude:"",
    latitude:""
  }
  constructor(){
    super();
    this.initAppState();
  }
  componentDidMount(){
    this.publishLocalStorageData();
  }
  render(){
    if (this.state.scrn==1 && (this.state.phoneNum && this.state.longitude || 1==1)){
      this.state.longitude=34.771808899999996;/* for debugging on emulator */
      this.state.latitude=32.0754459;/* for debugging on emulator */
      this.state.phoneNum="0524469981";/* for debugging on emulator */
      return(
        <Board myData={{phoneNum:this.state.phoneNum,longitude:this.state.longitude,latitude:this.state.latitude}}/>
      )
    }
    else if (this.state.scrn==1){
      return (
        <InsertPhoneScrn pressMe={()=>this.pressOnOKInTelScrn()} setPhoneNum={(vl)=>this.setPhoneNum(vl)}/>
      )
    }
    else if  (this.state.scrn==2){
      return (
        <GetLocationScrn pressMe={(oData)=>this.pressOnOKInGetLocationScrn(oData)}/>
      )
    }
    else{
      Alert.alert("no screen found");
    }
  }
  pressOnOKInTelScrn(){
    AsyncStorage.setItem("phone",this.state.phoneNum);
    this.setState({scrn:2});
  }
  pressOnOKInGetLocationScrn(oData){
    var sLongitude=oData.longitude.toString(),sLatitude=oData.latitude.toString()
    AsyncStorage.setItem("longitude",sLongitude);
    AsyncStorage.setItem("latitude",sLatitude);
    this.state.longitude=sLongitude;
    this.state.latitude=sLatitude;
  }
  setPhoneNum(vl){
    this.state.phoneNum=vl;
  }
  async initAppState(){
    var sPhone=await AsyncStorage.getItem("phone");
    var sLongitude=await AsyncStorage.getItem("longitude");
    var sLatitude=await AsyncStorage.getItem("latitude");
    this.setState({phoneNum:sPhone,longitude:sLongitude,latitude:sLatitude});
  }
  async publishLocalStorageData(){
    var sPhone=await AsyncStorage.getItem("phone");
    var sLongitude=await AsyncStorage.getItem("longitude");
    var sLatitude=await AsyncStorage.getItem("latitude");
//    Alert.alert("phone is - "+sPhone+" long="+sLongitude+" lat="+sLatitude);
  }
}

AppRegistry.registerComponent('neighberboards_client_2', () => App);
