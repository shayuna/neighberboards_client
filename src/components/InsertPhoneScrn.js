import React,{Component} from "react";
import { View,Text,Alert} from 'react-native';
import MySmallBtn from "./MySmallBtn";
import MyTextInput from "./MyTextInput";
import Hdr from "./Hdr";

class InsertPhoneScrn extends Component {
  constructor(myProps){
    super();
    this.state={
      pressMeFunc:myProps.pressMe,
      sPhoneNum:""
    }
  }
  render(){
    return (
      <View style={styles.wrapperStyle}>
        <Hdr>neighberboards</Hdr>
        <View style={styles.mainBdy}>
          <View style={styles.paragraphWrapper}>
            <Text style={styles.paragraphText}>giving your phone number is optional, but it gives your neighbours means to access you (via sms) in response to a message you posted on the board</Text>
          </View>
        </View>
        <MyTextInput plcHolder="phone num here (optional)" setChangedInput={sPhoneNum=>this.state.sPhoneNum=sPhoneNum}/>
        <MySmallBtn style={styles.btnStyle} title="ok, let's move on" pressMe={()=>this.pressOK()}/>
      </View>
    )
  }
  pressOK(){
    var sPhoneNum=this.state.sPhoneNum.trim();
    if (sPhoneNum!="" && !/^[0-9\-]{9,12}$/.test(sPhoneNum)){
        Alert.alert("there's an error in the phone number");
    }
    else{
      this.state.pressMeFunc(sPhoneNum);
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
export default InsertPhoneScrn;
