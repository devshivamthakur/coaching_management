import React, { Component } from 'react'
import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import { Surface,Appbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';

export class dashboard extends Component {
    render() {
        return (
            <View
            >
                 <Appbar.Header
                 style={{
                     backgroundColor:"#007c91"
                  }}
                >
                    <View
                    style={{
                        padding:5,
                        flexDirection:"row"
                    }}
                    >
                        <Text style={{fontSize:16,color:"white"}}>Dashboard</Text>
                    
                    </View>
               
                </Appbar.Header>
               
                <ImageBackground
                source={require("../Images/bg.png")}
                style={{
                    width:"100%",
                    height:"100%",
                    alignItems:"center",
                justifyContent:"center",
                
                }}
                >
                <Surface
                    style={style.Surface}
                >
                    <Icon name="ios-person-add-sharp" size={40} color="white" style={style.Icon} />
                    <Text style={style.txt1}> Add New Student</Text>
                </Surface>
                <Surface
                    style={style.Surface}
                >
                    <Icon name="person-circle-outline" size={40} color="white" style={style.Icon}  />
                    <Text style={style.txt1}> View Student</Text>
                </Surface>
                <Surface
                    style={style.Surface}
                >
                    <Icon2 name="logout" size={45} color="white" style={style.Icon} />
                    <Text style={style.txt1}> Logout</Text>
                </Surface>
                </ImageBackground>
            </View>
        )
    }
}
const style = StyleSheet.create({
    Surface: {
        width: 190,
        height: 100,
        flexDirection: "row",
        justifyContent: "space-between",
        borderRadius: 12,
        elevation: 15,
        backgroundColor:"#007c91",
            margin:15,
            top:-70
    },
    txt1: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
              padding:10,
              color:"white",
            //   backgroundColor:"red",
              height:80,
              width:130,
              top:"10%",
              left:"-20%"
              

    },
    Icon:{
        marginHorizontal:25,
        marginVertical:25
    },

})
export default dashboard
