import {Alert,AsyncStorage} from "react-native";
import axios from "axios";
var CaptionsFetcher = {
  publishResults:function(sCaption,sID,eCaller){
    var oState=eCaller.state;
    oState[sID]=sCaption;
    eCaller.setState(oState);
  },
  getText:async function(sID,eCaller){

    var sCaption=await AsyncStorage.getItem(sID),sLng="he";
    if (sCaption){
      console.log (sID+" text is taken from cache");
      this.publishResults(sCaption,sID,eCaller);
    }
    else {
      var self=this;
      axios.get("https://sixth-env-197608.appspot.com/getComponentTxt?lng="+sLng+"&component="+sID)
        .then(function(response){
          if (response.data){
            console.log (sID+" text is taken from db");
            AsyncStorage.setItem(sID,response.data);
            self.publishResults(response.data,sID,eCaller);
          }
        }
      )
      .catch(error=>console.log("error in getText() function in CaptionFetcher object. err is - "+error.response))
    }
  }
}
export default CaptionsFetcher;
