import React,{Component} from "react";
import {TextInput,View} from "react-native";

class MyTextInput extends Component {
  state={
    inputTxt:""
  }
  constructor(myProps){
    super();
    // i don't have to render because the render will eventually happen, so there's no need to use setState
    this.state={
        inputTxt:myProps.inputTxt,
        plcHolder:myProps.plcHolder,
        setChangedInputFunc:myProps.setChangedInput
    };
  }
  render(){
      return (
        <View style={styles.viewStyle}>
          <TextInput style={styles.textInputStyle} onChangeText={txt=>this.setData(txt)} placeholder={this.state.plcHolder} value={this.state.inputTxt}/>
        </View>
      );
  }
  setData(txt){
    this.state.setChangedInputFunc(txt);
  }
}

const styles={
  viewStyle:{
    width:"80%",
    alignSelf:"center",
    marginBottom:50
  },
  textInputStyle:{
    fontSize:20,
    color:"red"
  }

}

export default MyTextInput;
