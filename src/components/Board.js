import React,{Component} from "react";
import ReactNative,{ScrollView,Text,View,Alert,TextInput,Image,Dimensions,TouchableOpacity,Keyboard} from "react-native";
import axios from "axios";
import MySmallBtn from "./MySmallBtn";
import SendSMS from 'react-native-sms';
import PhotosInterface from "./PhotosInterface";
import MyAdjustableButton from "./MyAdjustableButton";
import MyInputLikeBtn from "./MyInputLikeBtn";
import ImageResizer from 'react-native-image-resizer';
import MyImageAndTextBtn from "./MyImageAndTextBtn";
import dismissKeyboard from 'react-native-dismiss-keyboard';
const { width } = Dimensions.get('window');

/* a hack that forces all devices to enforce the ltr default direction rule, otherwise the devices that configured as rtl, e.g. devices intended for the israeli market, will reverse the direction of the text and images and layout generally*/
try {
    ReactNative.I18nManager.allowRTL(false);
} catch (e) {
    console.log(e);
}


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
      axios.get("https://neighberboards-192420.appspot.com/retrieveData?longitude="+this.state.longitude+"&latitude="+this.state.latitude)
        .then(response=>this.setState({jList:response.data}))
        .catch(error=>console.log("error is - "+error.response))
    }
    render(){
      if (this.state.iState==1){
        this.resetPostMsgState();
        return(
          <View style={styles.showAllEventsScrn}>
          <MyInputLikeBtn title="i want to add something" wrapperStyle={{paddingTop:20,paddingBottom:20,paddingRight:10,paddingLeft:10}} textStyle={{borderWidth:1,alignSelf:"center",paddingTop:10,paddingBottom:10,paddingLeft:10,paddingRight:10,borderRadius:6,borderColor:"red",fontFamily:"Roboto",fontSize:20,width:"95%"}} pressMe={()=>{this.state.oSelectedImgSrc={};this.setState({iState:2})}}/>
            <ScrollView style={styles.scrollViewStyle}>
              {this.processList()}
            </ScrollView>
          </View>
        )
      }
      else{
        var bRemoveImgBtnShow;
        if (this.state.oSelectedImgSrc.uri){
          bRemoveImgBtnShow=true;
        }
        else{
          bRemoveImgBtnShow=false;
        }
        if (this.state.iMode==0){
          return(
            <View style={styles.addEventScrnStyle}>
              <View style={[styles.upperControlPanelStyle]}>
                <MyAdjustableButton caption="שיתוף" pressMe={()=>this.addNewEvent()}/>
                <TouchableOpacity onPress={()=>this.reloadBoard()}>
                  <Image source={require("../images/back.png")} style={styles.backBtnStyle}/>
                </TouchableOpacity>
              </View>
              <TextInput style={[styles.textInputStyle,{flex:1}]} multiline={true} autoFocus={true} placeholder="i want to add something" defaultValue={this.state.eventTxt} onChangeText={txt=>this.state.eventTxt=txt}/>
              <View style={[styles.selectedImgWrapper]}>
                <Image source={this.state.oSelectedImgSrc} style={{width:width/3,height:width/3,margin:1}}/>
                {bRemoveImgBtnShow && <MyAdjustableButton caption="הסרת תמונה" pressMe={()=>this.setState({oSelectedImgSrc:{},iMode:0})}/>}
              </View>
              <View style={[styles.btnsWrapperStyle]}>
                <MyAdjustableButton caption="מצלמה" pressMe={()=>this.setState({iMode:2})}/>
                <MyAdjustableButton caption="גלריה" pressMe={()=>this.setState({iMode:1})}/>
              </View>
            </View>
            )
          }
          else{
            return(
              <View style={styles.addEventScrnStyle}>
                <PhotosInterface style={[styles.photosInterfaceStyle,{flex:1}]} iMode={this.state.iMode} cancelMe={()=>this.hidePhotosComponents()} selectPhoto={(sImgUri)=>this.selectPhoto(sImgUri)}/>
              </View>
            )
          }

      }
    }
    processList(){
      if (this.state.jList){
        return this.state.jList.map((jRec)=>{
          return (
            <View key={jRec._id} style={styles.viewStyle}>
              <View>
                <Text style={styles.textStyle}>{jRec.info}</Text>
                <Image source={{uri:"https://storage.googleapis.com/neighberboards-192420.appspot.com/"+jRec._id+".jpg"}} style={styles.boardMsgImgStyle} resizeMethod="resize"/>
              </View>
              <MyImageAndTextBtn pressMe={()=>this.sendMsg(jRec.tel)} btnStyle={{}} title="reply" image={require("../images/sendMsg.png")}/>
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
//      Alert.alert("with sendmsg. tel - "+tel);
    }
    addNewEvent(){
      var swIsContainPic=this.state.oSelectedImgSrc.uri!="" ? 1 : 0;
      var oThisHolder=this;
      axios.post("https://neighberboards-192420.appspot.com/insertData",{
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
            axios.post('https://neighberboards-192420.appspot.com/uploadImg?nm='+response.data.toString(), file, config)
            .then(function(response){
              Alert.alert("ok");
              oThisHolder.reloadBoard();
            })
            .catch(function(sErr){
              Alert.alert("err123="+sErr);
            })
*/
            ImageResizer.createResizedImage(file, 400, 400, "JPEG", 60).then((answer) => {
              // response.uri is the URI of the new image that can now be displayed, uploaded...
              // response.path is the path of the new image
              // response.name is the name of the new image with the extension
              // response.size is the size of the new image
              const oData = new FormData();
              oData.append('fl', {
                uri: answer.uri,
                type: 'image/jpeg',
                name: 'fl'
              });
              fetch('https://neighberboards-192420.appspot.com/uploadImg?nm='+response.data.toString(), {
                method: 'post',
                body: oData
              }).then(res => {
                oThisHolder.reloadBoard();
              });
            }).catch((err) => {
//                Alert.alert ("err="+err);
                  console.log ("err="+err);
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
    resetPostMsgState(){
      this.state.eventTxt="";
    }
}

const styles = {
  viewStyle:{
    padding:5,
    margin:5,
    borderBottomWidth:1,
    borderBottomColor:"rgba(221,221,221,0.8)"
  },
  textStyle:{
    fontFamily:"Roboto",
    fontSize:20,
    marginBottom:10
  },
  textInputStyle:{
    textAlignVertical:"top",
    fontFamily:"Roboto",
    fontSize:20
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
    justifyContent:"flex-start"
  },
  selectedImgWrapper:{
    display:"flex",
    justifyContent:"space-between",
    alignItems:"center",
    flexDirection:"row"
  },
  boardMsgImgStyle:{
    width:"100%",
    height:400
  },
  smsBtnStyle:{
  },
  upperControlPanelStyle:{
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    paddingTop:10,
    paddingBottom:10,
    paddingLeft:10,
    paddingRight:10
  }
}

export default Board;
