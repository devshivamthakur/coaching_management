import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import { Firebase } from "../firebase";
import AsyncStorage   from "@react-native-community/async-storage";  



export class login extends Component {
    state={
        username:"",
        password:""
    }
    onPress_login_btn(){
      if(this.state.username.trim().length!=0&&this.state.password.trim().length!=0){
       Firebase.login_user(this.state.username,this.state.password,this.props.navigation)
                    .then((value)=>{
                      ToastAndroid.show("Login Successfull",ToastAndroid.LONG)
                      this.props.navigation.replace("dashboard")
                     AsyncStorage.setItem("sft","yes")  //get data
                      AsyncStorage.setItem("lt","dashboard")
                    }).catch((error)=>{
                      ToastAndroid.show("You have Entered Wrong username or password",ToastAndroid.LONG)
                    });
      // console.log(result)
      }
    }
    forgot_button_(){
      this.props.navigation.navigate("forgot_p");
    }
    render() {
        return (
            <View style={styles.container}>
              <Image style={styles.image} source={require("../Images/logo.png")} />
         
             
              <View style={styles.inputView}>
                <TextInput
                  style={styles.TextInput}
                  placeholder="Email."
                  keyboardType="email-address"
                  
                  placeholderTextColor="#003f5c"
                  onChangeText={(email) => this.setState({username:email})}
                />
              </View>
         
              <View style={styles.inputView}>
                <TextInput
                  style={styles.TextInput}
                  placeholder="Password."
                  placeholderTextColor="#003f5c"
                  secureTextEntry={true}
                  onChangeText={(pass) => this.setState({password:pass})}
                />
              </View>
         
              <TouchableOpacity
              onPress={()=>{this.forgot_button_()}}
              >
                <Text style={styles.forgot_button}>Forgot Password?</Text>
              </TouchableOpacity>
         
              <TouchableOpacity style={styles.loginBtn}
              onPress={()=>{this.onPress_login_btn()}}
              >
                <Text style={styles.loginText}>LOGIN</Text>
              </TouchableOpacity>

            </View>
          );
    }
}

export default login


 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
 
  image: {
    marginBottom: 40,
  },
 
  inputView: {
    backgroundColor: "#FFC0CB",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
 
    alignItems: "center",
  },
 
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
 
  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
 
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#FF1493",
  },
});