import React from "react";
import {View,Text,Image,TouchableOpacity} from "react-native";

const MyImageAndTextBtn = (props) => {
  return (
    <TouchableOpacity style={[styles.btnStyle,props.btnStyle]} onPress={props.pressMe}>
      <Image style={styles.imgStyle} source={props.image}/>
      <Text style={styles.txtStyle}>{props.title}</Text>
    </TouchableOpacity>
  )
}

const styles = {
  btnStyle:{
    flexDirection:"row",
    justifyContent:"flex-start",
    alignItems:"center"
  },
  imgStyle:{
    width:64,
    height:64
  },
  txtStyle:{
    fontFamily:"Roboto",
    fontSize:12
  }
}

export default MyImageAndTextBtn;
