import React,{Component} from 'react';
import {View,Text,TouchableHighlight} from "react-native";

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
        <TouchableHighlight style={styles.btn} onPress={this.state.pressMeFunc}>
          <Text style={styles.txt}>{this.state.caption}</Text>
        </TouchableHighlight>
    )
  }

}
const styles = {
  btn:{
    backgroundColor:"red",
    paddingLeft:10,
    paddingRight:10,
    paddingTop:3,
    paddingBottom:3,
    margin:3
  },
  txt:{
    fontSize:18,
    color:"white"
  }
}

export default MyAdjustableButton;
