import React from "react";
import {TouchableHighlight,Text} from "react-native";

const MyBtn = (props)=>{
  return(
    <TouchableHighlight onPress={props.pressMe} style={myStyles.btnStyle}>
      <Text style={myStyles.txtStyle}>{props.title}</Text>
    </TouchableHighlight>
  )
}

const myStyles = {
  btnStyle:{
    backgroundColor:"red",
    width:"80%",
    padding:10,
    borderRadius:15,
    alignSelf:"center",
    position:"absolute",
    bottom:20
  },
  txtStyle:{
    fontSize:30,
    color:"#ddd",
    alignSelf:"center"
  }
}

export default MyBtn;
