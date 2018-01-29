import React,{Component} from 'react';
import {View,Text,TouchableOpacity} from "react-native";

class MyAdjustableButton extends Component{
  state = {
    pressMeFunc:"",
    caption:""
  }

  constructor(props){
    super();
    this.state.caption=props.caption;
    this.state.pressMeFunc=props.pressMe;
  }
  componentWillReceiveProps(props){
    this.resetState(props);
  }
  resetState(props){
    this.setState({pressMeFunc:props.pressMe,caption:props.caption});
  }

  render(){
    return (
        <TouchableOpacity style={styles.btn} onPress={this.state.pressMeFunc}>
          <Text style={styles.txt}>{this.state.caption}</Text>
        </TouchableOpacity>
    )
  }

}
const styles = {
  btn:{
    paddingLeft:5,
    paddingRight:5,
    paddingTop:5,
    paddingBottom:5,
    borderRadius:5,
    borderWidth:1,
    borderColor:"red",
    margin:3
  },
  txt:{
    fontSize:18
  }
}

export default MyAdjustableButton;
