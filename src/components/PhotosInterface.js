import React,{Component} from "react";
import {View,Text,TouchableHighlight,Alert,CameraRoll,ScrollView,Image,Dimensions} from 'react-native';
import MyAdjustableButton from "./MyAdjustableButton";
import Camera from 'react-native-camera';

const { width } = Dimensions.get('window')
class PhotosInterface extends Component {
  state={
  }
  constructor(props){
    super();
    this.setStateStraight();
    this.state.cancelMeFunc=props.cancelMe;
    this.state.selectPhotoFunc=props.selectPhoto;
    this.state.iMode=props.iMode;
  }
  resetState(){
    this.setStateStraight();
    this.render();
  }
  setStateStraight(){
    this.state.iMode=0;
    this.state.photos=[];
    this.state.iNumberOfPhotosInScrn=21;
    this.state.iSelectedIndex=-1;
    this.state.iPhotosNum=0;
    this.state.iIndexInPhotosList=-21;
  }
  componentDidMount(){
    this.getPhotos(1);
  }

  componentWillReceiveProps(props){
    this.setState({iMode:props.iMode});
    if (props.iMode==1)this.getPhotos(1);
  }
  back1(){
    if (this.state.iIndexInPhotosList>0){
      this.getPhotos(-1);
    }
  }
  forward1(){
    this.getPhotos(1);
  }
  cancel1(){
    this.resetState();
    this.state.cancelMeFunc();
  }
  select1(){
    var sImgUri=this.state.photos[this.state.iSelectedIndex].node.image.uri;
    this.state.selectPhotoFunc(sImgUri);
  }
  render(){
    if (this.state.iMode==1){
      return(
        <View style={styles.galleryWrapperStyle}>
          <ScrollView contentContainerStyle={styles.scrollView}>
              {
                  this.state.photos.map((p, i) => {
                  if (i>=this.state.iIndexInPhotosList){
                    var imgContainerStyle=styles.imgWrapper;
                    if (i==this.state.iSelectedIndex)imgContainerStyle=styles.selectedImgWrapper;
                    return (
                      <TouchableHighlight
                        style={imgContainerStyle}
                        key={i}
                        onPress={() => this.selectPic(i)}
                      >
                        <Image
                          style={{
                            width: width/3-2,
                            height: width/3-2,
                            margin:1
                          }}
                          source={{uri: p.node.image.uri}}
                        />
                      </TouchableHighlight>
                    )
                  }
                })
              }
            </ScrollView>
            <View style={styles.btnsWrapper}>
              <MyAdjustableButton caption="<" pressMe={()=>this.back1()}/>
              <MyAdjustableButton caption="בחירה" pressMe={()=>this.select1()}/>
              <MyAdjustableButton caption="ביטול" pressMe={()=>this.cancel1()}/>
              <MyAdjustableButton caption=">" pressMe={()=>this.forward1()}/>
            </View>
          </View>
      )
    }
    else if (this.state.iMode==2){
      return(
        <View style={styles.cameraWrapperStyle}>
          <Camera style={styles.cameraStyle}
             ref={(cam) => {
               this.camera = cam;
             }}
          >
           </Camera>
           <View style={styles.btnsWrapper}>
              <MyAdjustableButton caption="צילום" pressMe={()=>this.takePicture()}/>
              <MyAdjustableButton caption="ביטול" pressMe={()=>this.state.cancelMeFunc()}/>
            </View>
        </View>
      )
    }
    else{
      return(
        <View></View>
      )
    }
  }
  selectPic(iSelectedIndex){
    if (this.state.iSelectedIndex==iSelectedIndex)iSelectedIndex=-1/* unselect */
    this.setState({iSelectedIndex:iSelectedIndex});
  }
  getPhotos = (iDirection) => {
    this.state.iPhotosNum+=this.state.iNumberOfPhotosInScrn*(iDirection);
    this.state.iIndexInPhotosList+=this.state.iNumberOfPhotosInScrn*(iDirection);
    CameraRoll.getPhotos({
      first: this.state.iPhotosNum,
      assetType: 'All'
    })
    .then(r => this.setState({ photos: r.edges }))
  }
  takePicture() {
    const options = {};
    //options.location = ...
    this.camera.capture({metadata: options})
      .then((data) => {

          console.log(data.mediaUri);
          var sImgUri=data.mediaUri;
          this.state.selectPhotoFunc(sImgUri);
      })
      .catch(err => console.error(err));
  }
}

const styles = {
  scrollView:{
    flexDirection: 'row',
    flexWrap:"wrap"
  },
  btnStyle:{
    fontSize:40,
    backgroundColor:"blue"
  },
  imgWrapper:{
    opacity:1,
  },
  selectedImgWrapper:{
    opacity:0.2
  },
  btnsWrapper:{
    display:"flex",
    flexDirection:"row",
    justifyContent:"center"
  },
  galleryWrapperStyle:{
    display:"flex",
    justifyContent:"flex-start",
    flex:1
  },
  cameraStyle:{
    flex:1
  },
  cameraWrapperStyle:{
    display:"flex",
    flex:1,
    justifyContent:"flex-start"
  }

}

export default PhotosInterface;
