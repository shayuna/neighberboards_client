import React,{Component} from "react";
import {Text,View} from "react-native";
import MySmallBtn from "./MySmallBtn"
import Hdr from "./Hdr";

class Intro extends Component {
  state = {
    moveOnFunc:null
  }
  constructor(props){
    super();
    this.state.moveOnFunc=props.moveOn;
  }
  render(){
    return(
      <View style={styles.wrapperStyle}>
        <Hdr>neighberboards</Hdr>
        <Text style={styles.mainBdy}>the neighbourhood is something one misses. not what we use today as a delineating measure of a geographical area, but a concept that tells us about a community of people who live in companionship. we want to bring back to the neighbourhood some of its previous glamour and introduce you to your neighberboard</Text>
        <MySmallBtn style={styles.btnStyle} title="take me to my neighberboard" pressMe={()=>this.state.moveOnFunc()} smallBtnStyle={{width:"auto"}}/>
      </View>
    )
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
    fontFamily:"Roboto",
    width:"80%",
    fontSize:20,
    color:"#aaa"
  },
  btnStyle:{
  }
}

export default Intro;
