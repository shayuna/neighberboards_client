import React,{Component} from "react";
import {ScrollView,Text} from "react-native";
import axios from "axios";


class Board extends Component {
    state={
      phoneNum:"",
      longitude:"",
      latitude:"",
      jList:[]
    }
    constructor(props){
      super();
      this.state.phoneNum=props.myData.phoneNum;
      this.state.longitude=props.myData.longitude;
      this.state.latitude=props.myData.latitude;
    }
    componentWillMount(){
      axios.get("https://neighberboards.appspot.com/retrieveData?longitude="+this.state.longitude+"&latitude="+this.state.latitude)
        .then(response=>this.setState({jList:response.data}));
    }
    render(){
      return(
        <ScrollView>
          {this.processList()}
        </ScrollView>
      )
    }
    processList(){
      if (this.state.jList){
        return this.state.jList.map((jRec)=>{
          return (
            <Text style={styles.textStyle}>{"info="+jRec.info+"id="+jRec._id+"longitude="+jRec.location.coordinates[0]+"latitude="+jRec.location.coordinates[1]}</Text>
          )
        })
      }
    }

}
const styles = {
  textStyle:{
    fontSize:40
  }
}


export default Board;
