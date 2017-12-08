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
        var oTextInputStyle,oPhotosInterfaceStyle,oRemoveImgBtnState,bRemoveImgBtnShow;
        if (this.state.iMode==0){
          oTextInputShowState={width:"auto",height:"auto",opacity:1};
          oSelectedImageContainerState={width:"auto",height:"auto",opacity:1};
          oPhotosInterfaceShowState={width:0,height:0,opacity:0};
        }
        else{
          oTextInputShowState={width:0,height:0,opacity:0};
          oSelectedImageContainerState={width:0,height:0,opacity:0};
          oPhotosInterfaceShowState={width:"auto",height:"auto",opacity:1};
        }
        if (this.state.oSelectedImgSrc.uri){
          bRemoveImgBtnShow=true;
        }
        else{
          bRemoveImgBtnShow=false;
        }
        return(
          <View style={styles.addEventScrnStyle}>
            <TextInput style={[styles.textInputStyle,oTextInputShowState]} multiline={true} onChangeText={txt=>this.state.eventTxt=txt}/>
            <PhotosInterface style={styles.photosInterfaceStyle,oPhotosInterfaceShowState} iMode={this.state.iMode} cancelMe={()=>this.hidePhotosComponents()} selectPhoto={(sImgUri)=>this.selectPhoto(sImgUri)}/>
            <View style={[styles.selectedImgWrapper,oSelectedImageContainerState]}>
              <Image source={this.state.oSelectedImgSrc} style={{width:width/3,height:width/3,margin:1}}/>
              {bRemoveImgBtnShow && <MyAdjustableButton caption="הסרת תמונה" pressMe={()=>this.setState({oSelectedImgSrc:{},iMode:0})}/>}
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
                <Image source={{uri:"https://storage.googleapis.com/neighberboards.appspot.com/"+jRec._id+".jpg"}} style={styles.boardMsgImgStyle} resizeMethod="resize"/>
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
      var swIsContainPic=this.state.oSelectedImgSrc.uri!="" ? 1 : 0;
      var oThisHolder=this;
      axios.post("https://neighberboards.appspot.com/insertData",{
          longitude:this.state.longitude,
          latitude:this.state.latitude,
          tel:this.state.phoneNum,
          info:this.state.eventTxt,
          isContainPic:swIsContainPic
      })
      .then(function(response){
//        Alert.alert("msg id123="+response.data.toString());
          if(swIsContainPic){
            let data = new FormData();
            let file= oThisHolder.state.oSelectedImgSrc.uri;
            data.append("fl",file,"fl");
            const config = {
                headers: { 'content-type': 'multipart/form-data' }
            }
/*
            axios.post('https://neighberboards.appspot.com/uploadImg?nm='+response.data.toString(), file, config)
            .then(function(response){
              Alert.alert("ok");
              oThisHolder.reloadBoard();
            })
            .catch(function(sErr){
              Alert.alert("err123="+sErr);
            })
*/
            const oData = new FormData();
            oData.append('fl', {
              uri: oThisHolder.state.oSelectedImgSrc.uri,
              type: 'image/jpeg',
              name: 'fl'
            });
            fetch('https://neighberboards.appspot.com/uploadImg?nm='+response.data.toString(), {
              method: 'post',
              body: oData
            }).then(res => {
              oThisHolder.reloadBoard();
            });
          }
      })
      .catch(function(error){
//        Alert.alert("the error is - "+error);
      });
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
  },
  selectedImgWrapper:{
    display:"flex",
    justifyContent:"space-between",
    alignItems:"center",
    flexDirection:"row"
  },
  boardMsgImgStyle:{
    width:"100%",
    height:150
  }
}

export default Board;
