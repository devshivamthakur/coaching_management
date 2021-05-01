import React, { Component } from 'react'
import { StyleSheet, Text, TextInput, ToastAndroid, View,TouchableOpacity } from 'react-native'
import { Firebase } from '../firebase'
import NetworkUtils from '../NetworkUtils'
import { BackHandler } from 'react-native';

export class forgot_password extends Component {
    state={
        email:"",
        status:""
    }
    handleBackButtonClick=()=> {
        this.props.navigation.goBack();
         return true;
        }
      componentWillUnmount() {
          this.setState(
              {
                email:"",
                status:""
              }
          )
          BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
      }
      componentDidMount(){
      //   this.get_total_team_()
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
     }
  async  forgot_password_btn_click(){
       const isConnected  =  await   NetworkUtils.isNetworkAvailable()
       if(isConnected){
        if(this.state.email.trim().length!=0){
            Firebase.forgot_password(this.state.email).
            then((value)=>{
                console.log(value)
                this.setState({status:value})
                  }).catch((error)=>{
                      console.log(error)
                  })
        }
       }else{
           ToastAndroid.show("Internet is not Available",ToastAndroid.LONG);
       }
        
         
    }
    render() {
        return (
            <View
            style={{
                justifyContent:"center",
                top:"18%"
            }}
            >
                <Text style={styles.h1}> Email </Text>
                <TextInput
                style={styles.TextInput}
                placeholder="Enter your Email"
                  value={this.state.email}
                  onChangeText={(mail)=>{this.setState({email:mail})}}
                />
                  <TouchableOpacity style={styles.loginBtn}
              onPress={()=>{this.forgot_password_btn_click()}}
              >
                <Text style={styles.loginText}>Continue</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.loginBtn1}
              onPress={()=>{this.handleBackButtonClick()}}
              >
                <Text style={styles.loginText}>Back To login</Text>
              </TouchableOpacity>
              <Text style={{textAlign:"center",fontSize:16}}> {this.state.status} </Text>
            </View>
        )
    }
}
const styles=StyleSheet.create({
    loginBtn: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        backgroundColor: "#FF1493",
        alignSelf:"center"
      },loginBtn1: {
        width: "40%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        backgroundColor: "#FF1493",
        alignSelf:"center"

      },
      TextInput:{
          borderBottomWidth:1,
          borderColor:"black",
          paddingBottom:8,
          textAlign:"center",
          margin:5,
          width:"80%",
          alignSelf:"center",

      },
      h1:{
          fontSize:16,
          fontFamily:"sens-sarif",
          padding:5,
          marginLeft:"6%",

      }
})
export default forgot_password
