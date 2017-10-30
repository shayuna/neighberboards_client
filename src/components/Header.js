// import necessary libs
import React from "react";
import {View,Text} from "react-native";

// create components

const Header = () =>{
  return (
      <View style={styles.viewStyle}>
        <Text style={styles.textStyle}>neighberboards</Text>
      </View>
  )
}

const styles = {
  viewStyle:{
    padding:10,
    width:"80%",
    alignSelf:"center",
    backgroundColor:"#ddd",
    marginBottom:50
  },
  textStyle:{
    fontSize:30,
    alignSelf:"center",
    color:"blue"
  }
}


// make component accessible
export default Header
