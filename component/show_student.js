import React, { Component } from 'react'
import { FlatList, StyleSheet, Text, ToastAndroid, View } from 'react-native'
import { Surface,  Avatar } from 'react-native-paper';
import { Firebase } from '../firebase';
import NetworkUtils from '../NetworkUtils'
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-community/async-storage';
export class show_student extends Component {
    state={
        data:[],
        animvisible:"flex",
        key:[]
    }
 async   get_data(){
    const isConnected = await NetworkUtils.isNetworkAvailable()
    

if(isConnected){
       Firebase.read_value().
       then((value)=>{
        this.setState({animvisible:"none"})
          if(value!=null&&value.length!=0){
           
              console.log(value)
              this.setState({
                  data:value
              },
              
              )
          }
       })
       .catch((error)=>{

       })
       var key=JSON.parse( await AsyncStorage.getItem("key"))
       this.setState({
           key:key
       })
}else{
    ToastAndroid.show("Internet is required",ToastAndroid.LONG)
}
    }
    componentDidMount(){
this.get_data()
    }
    render_item=({item,index})=>{
           return(
            <Surface
            style={{
                flexDirection:"row",
                elevation:5,
                borderRadius:12,
                marginTop:4,
             

            }}
            onTouchStart={()=>{
                this.props.navigation.navigate("view_Student1",{key:this.state.key[index],data:item})
            }}
            >


                <Avatar.Image source={{uri:item.photo_url}} size={55} style={{padding:10,backgroundColor:"white"}}
                 />
              
                <View
                style={{
                    padding:10,
                    marginLeft:"5%"
                }}
                >
                    <Text style={style.txtname}>{item.Name} </Text>
                    <Text>{item.Course}</Text>
                    <Text>{item.Phone}</Text>
                </View>

            </Surface>
      
           )
    }
    render() {
        return (
            <View
            style={{
                backgroundColor:"#fce4ec",
                height:"100%",
                padding:10
            }}
            >
                        <View
                        style={{
                            display:this.state.animvisible,
                            height:"100%",
                            width:"100%"
                        }}
                        >
                        <LottieView source={require('../Images/loading.json')} autoPlay  loop style={{display:"flex",alignSelf:"center",top:"0%",}} />
                        </View>
                <FlatList
                // style={{position:"absolute",width:"100%",alignSelf:"center"}}
                data={this.state.data}
                keyExtractor={(item)=>item.Name+item.Phone}
                renderItem={this.render_item}
                />
         
                </View>
        )
    }
}

const style=StyleSheet.create({
    txtname:{
        fontSize:15,
        fontWeight:"bold",
        color:"blue"
    }
})
export default show_student
