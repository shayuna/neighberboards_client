import React,{Component} from "react";
import { AppRegistry,Alert,View,Text,AsyncStorage } from "react-native";
import InsertPhoneScrn from "./src/components/InsertPhoneScrn";
import GetLocationScrn from "./src/components/GetLocationScrn";
import Board from "./src/components/Board";
import Prelude from "./src/components/Prelude";
import Intro from "./src/components/Intro";

class App extends Component {
  state={
    scrn:0,
    phoneNum:"",
    longitude:"",
    latitude:""
  }
  constructor(){
    super();
    this.initAppState();
    AsyncStorage.clear();
  }
  componentDidMount(){
    this.publishLocalStorageData();
  }
  render(){
    if (this.state.scrn==0){
      return(
        <Prelude moveOn={()=>this.setState({scrn:100})}/>
      )
    }
    else if (this.state.scrn==100 && !this.state.longitude /*&& 0==1*/){
      return(
        <Intro moveOn={()=>this.setState({scrn:102})}/>
      )
    }
    else if  (this.state.scrn==102){
      return (
        <GetLocationScrn pressMe={(oData)=>this.pressOnOKInGetLocationScrn(oData)}/>
      )
    }
    else if (this.state.scrn==104){
      return (
        <InsertPhoneScrn pressMe={(sPhoneNum)=>this.pressOnOKInTelScrn(sPhoneNum)} />
      )
    }
    else if (this.state.longitude || 1==1){
      this.state.longitude=34.771808899999996;/* for debugging on emulator */
      this.state.latitude=32.0754459;/* for debugging on emulator */
      this.state.phoneNum="0524469981";/* for debugging on emulator */
      console.log(this.state.longitude+" *** "+this.state.latitude+" *** "+this.state.phoneNum);
      return(
        <Board myData={{phoneNum:this.state.phoneNum,longitude:this.state.longitude,latitude:this.state.latitude}}/>
      )
    }
    else{
      Alert.alert("no screen found");
    }
  }
  pressOnOKInTelScrn(sPhoneNum){
    AsyncStorage.setItem("phone",sPhoneNum);
    console.log ("got the phone num. it is - " + sPhoneNum);
    this.setState({scrn:1,phoneNum:sPhoneNum});
  }
  pressOnOKInGetLocationScrn(oData){
    var sLongitude=oData.longitude.toString(),sLatitude=oData.latitude.toString()
    AsyncStorage.setItem("longitude",sLongitude);
    AsyncStorage.setItem("latitude",sLatitude);
    this.state.longitude=sLongitude;
    this.state.latitude=sLatitude;
    this.setState({scrn:104});
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
