import React,{Component} from "react";
import {ScrollView,Text,View,Alert,TextInput,Image,Dimensions} from "react-native";
import axios from "axios";
import MySmallBtn from "./MySmallBtn";
import SendSMS from 'react-native-sms';
import PhotosInterface from "./PhotosInterface";
import MyAdjustableButton from "./MyAdjustableButton";

const { width } = Dimensions.get('window')
class Board extends Component {
  state={
       iState:1,
       phoneNum:"",
       longitude:"",
       latitude:"",
       eventTxt:"",
       selectedImage:"",
       jList:[],
       iMode:0,
       oSelectedImgSrc:{}
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
        var oTextInputStyle,oPhotosInterfaceStyle;
        if (this.state.iMode==0){
          oTextInputShowState={width:"auto",height:"auto"};
          oSelectedImageContainerState={width:"auto",height:"auto"};
          oPhotosInterfaceShowState={width:0,height:0};
        }
        else{
          oTextInputShowState={width:0,height:0};
          oSelectedImageContainerState={width:0,height:0};
          oPhotosInterfaceShowState={width:"auto",height:"auto"};
        }
        return(
          <View style={styles.addEventScrnStyle}>
            <TextInput style={[styles.textInputStyle,oTextInputShowState]} multiline={true} onChangeText={txt=>this.state.eventTxt=txt}/>
            <PhotosInterface style={styles.photosInterfaceStyle,oPhotosInterfaceShowState} iMode={this.state.iMode} cancelMe={()=>this.hidePhotosComponents()} selectPhoto={(sImgUri)=>this.selectPhoto(sImgUri)}/>
            <View style={[oSelectedImageContainerState]}>
              <Image source={this.state.oSelectedImgSrc} style={{width:width/3,height:width/3,margin:1}}/>
            </View>
            <View style={styles.btnsWrapperStyle}>
              <MyAdjustableButton caption="גלריה" pressMe={()=>this.setState({iMode:1})}/>
              <MyAdjustableButton caption="מצלמה" pressMe={()=>this.setState({iMode:2})}/>
              <MyAdjustableButton caption="שליחת הודעה" pressMe={()=>this.addNewEvent()}/>
              <MyAdjustableButton caption="חזרה לפיד" pressMe={()=>this.reloadBoard()}/>
            </View>
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
      SendSMS.send({
      body: 'מה ההודעה ?',
      recipients: [tel],
      successTypes: ['sent', 'queued']
      }, (completed, cancelled, error) => {
        console.log('SMS Callback: completed: ' + completed + ' cancelled: ' + cancelled + 'error: ' + error);
      });
      Alert.alert("with sendmsg. tel - "+tel);
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
    hidePhotosComponents(){
      this.setState({iMode:0});
    }
    selectPhoto(sImgUri){
      console.log ("imgUri - "+sImgUri);
      this.setState({oSelectedImgSrc:{uri:sImgUri},iMode:0});
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
    borderWidth:1,
    borderColor:"#ddd",
    textAlignVertical:"top"
  },
  photosInterfaceStyle:{
  },
  addEventScrnStyle:{
    flex:1,
    margin:0,
    justifyContent:"flex-end"
  },
  scrollViewStyle:{
    flex:1
  },
  showAllEventsScrn:{
    flex:1
  },
  btnsWrapperStyle:{
    display:"flex",
    flexDirection:"row",
    justifyContent:"center"
  }
}

export default Board;
