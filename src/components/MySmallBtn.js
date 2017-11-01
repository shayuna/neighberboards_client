import React from "react";
import {TouchableHighlight,Text} from "react-native";

const MySmallBtn = (props)=>{
  return(
    <TouchableHighlight onPress={props.pressMe} style={myStyles.btnStyle}>
      <Text style={myStyles.txtStyle}>{props.title}</Text>
    </TouchableHighlight>
  )
}

const myStyles = {
  btnStyle:{
    backgroundColor:"red",
    width:"50%",
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
