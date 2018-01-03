import React from "react";
import {View,Text} from "react-native";

const Hdr = (props) => {
  return(
    <View style={styles.hdrWrapper}>
      <Text style={[styles.hdrStyle,props.hdrStyle]}>{props.children}</Text>
    </View>
  )
}

const styles={
  hdrStyle:{
    fontFamily:"Roboto",
    fontSize:40,
    fontWeight:"bold",
    paddingTop:20
  },
  hdrWrapper:{
  }
}

export default Hdr;
