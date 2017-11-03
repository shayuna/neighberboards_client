import React,{Component} from "react";
import {ScrollView,Text,View,Alert,TextInput} from "react-native";
import axios from "axios";
import MySmallBtn from "./MySmallBtn";


class Board extends Component {
  state={
       iState:1,
       phoneNum:"",
       longitude:"",
       latitude:"",
       eventTxt:"",
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
      if (this.state.iState==1){
        return(
          <View style={styles.showAllEventsScrn}>
            <MySmallBtn title="הוספת הודעה ללוח" pressMe={()=>this.setState({iState:2})}/>
            <ScrollView style={styles.scrollViewStyle}>
              {this.processList()}
            </ScrollView>
          </View>
        )
      }
      else{
        return(
          <View style={styles.addEventScrnStyle}>
            <TextInput style={styles.textInputStyle} multiline={true} onChangeText={txt=>this.state.eventTxt=txt}/>
            <MySmallBtn title="שליחת הודעה" pressMe={()=>this.addNewEvent()}/>
          </View>
        )
      }
    }
    processList(){
      if (this.state.jList){
        return this.state.jList.map((jRec)=>{
          return (
            <View key={jRec._id} style={styles.viewStyle}>
              <View>
                <Text style={styles.textStyle}>{jRec.info}</Text>
              </View>
              <MySmallBtn title="לשלוח הודעה" pressMe={()=>this.sendMsg(jRec.tel)}/>
            </View>
          )
        })
      }
      else {
        return(
          <Text>nothing was found</Text>
        )
      }

    }
    sendMsg(tel){
      Alert.alert("sending msg to tel number - "+tel);
    }
    addNewEvent(){
      Alert.alert (this.state.longitude+" *** "+this.state.latitude+" *** "+this.state.phoneNum+" *** "+this.state.eventTxt);
      axios.get("https://neighberboards.appspot.com/insertData?longitude="+this.state.longitude+"&latitude="+this.state.latitude+"&tel="+this.state.phoneNum+"&info="+this.state.eventTxt)
        .then(this.reloadBoard());
    }
    reloadBoard(){
      this.state.iState=1;
      this.componentWillMount();
    }
}

const styles = {
  viewStyle:{
    padding:5,
    margin:5,
    backgroundColor:"#ccc"
  },
  textStyle:{
    fontSize:20
  },
  textInputStyle:{
    flex:1,
    borderWidth:1,
    borderColor:"#ddd",
    textAlignVertical:"top"
  },
  addEventScrnStyle:{
    flex:1,
    margin:10,
    justifyContent:"space-between"
  },
  scrollViewStyle:{
    flex:1
  },
  showAllEventsScrn:{
    flex:1
  }
}

export default Board;
