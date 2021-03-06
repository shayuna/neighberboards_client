import React from "react";
import {TouchableOpacity,Text} from "react-native";

const MySmallBtn = (props)=>{
  return(
    <TouchableOpacity onPress={props.pressMe} style={[myStyles.btnStyle,props.smallBtnStyle]}>
      <Text style={myStyles.txtStyle}>{props.title}</Text>
    </TouchableOpacity>
  )
}

const myStyles = {
  btnStyle:{
    backgroundColor:"red",
    padding:"2%",
    margin:"2%",
    borderRadius:10,
    alignSelf:"center"
  },
  txtStyle:{
    fontSize:20,
    color:"#ddd",
    alignSelf:"center"
  }
}

export default MySmallBtn;
