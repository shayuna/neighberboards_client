import React,{Component} from "react";
import {Text,View,Image,Alert} from "react-native";
import axios from "axios";
import Hdr from "./Hdr"

class Prelude extends Component {
  state={
    moveOnFunc:"",
    quote:"",
    author:""
  }
  constructor(myProps){
    super();
    this.state.moveOnFunc=myProps.moveOn;
  }
  componentWillMount(){
    axios.get("https://neighberboards.appspot.com/getquote?dt="+(new Date()).getTime())
      .then(response=>this.setState({quote:"\""+response.data.quote+"\"",author:response.data.author}));
  }
  componentDidMount(){
    setTimeout(() => {
      this.state.moveOnFunc();
    },4000);
  }
  render(){
    return (
      <View style={styles.wrapperStyle}>
        <Hdr>neighberboards</Hdr>
        <Image source={{uri:"https://neighberboards.appspot.com/public/images/nutchi.png"}} style={styles.mainImgStyle}/>
        <View style={styles.quoteWrapperStyle}>
          <Text style={styles.quoteStyle}>{this.state.quote}</Text>
          <Text style={styles.authorStyle}>{this.state.author}</Text>
        </View>
      </View>
    )
  }
}
const styles = {
  wrapperStyle:{
      flex:1,
      justifyContent:"space-between",
      alignItems:"center",
      backgroundColor:"white"
  },
  mainImgStyle:{
    width:200,
    height:200
  },
  quoteWrapperStyle:{
    width:"80%",
    paddingBottom:20
  },
  quoteStyle:{
    fontFamily:"Roboto",
    fontSize:20,
    color:"#aaa",
    textAlign:"right"
  },
  authorStyle:{
    fontFamily:"Roboto",
    fontSize:14,
    color:"#ccc",
    textAlign:"left"
  }
}
export default Prelude
