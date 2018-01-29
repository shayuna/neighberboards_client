import React from "react";
import {TouchableHighlight,Text} from "react-native";

const  MyInputLikeBtn = (props) => {
  return (
    <TouchableHighlight onPress={props.pressMe} style={[btnStyle.wrapperStyle,props.wrapperStyle]}>
      <Text style={[btnStyle.textStyle,props.textStyle]}>{props.title}</Text>
    </TouchableHighlight>
  )
}

const btnStyle = {
  wrapperStyle:{
  },
  textStyle:{

  }
}

export default MyInputLikeBtn;
