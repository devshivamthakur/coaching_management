import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Surface } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/AntDesign';

export class dashboard extends Component {
    render() {
        return (
            <View>

                <Surface
                    style={style.Surface}
                >
                    <Icon name="user-plus" size={45} color="black" />
                    <Text style={style.txt1}> Add New Student</Text>
                </Surface>
                <Surface
                    style={style.Surface}
                >
                    <Icon name="user" size={45} color="black" />
                    <Text style={style.txt1}> View Student</Text>
                </Surface>
                <Surface
                    style={style.Surface}
                >
                    <Icon2 name="logout" size={45} color="black" />
                    <Text style={style.txt1}> Logout</Text>
                </Surface>

            </View>
        )
    }
}
const style = StyleSheet.create({
    Surface: {
        width: 250,
        height: 150,
        flexDirection: "row",
        justifyContent: "space-between",
        borderRadius: 12,
        elevation: 5,
        backgroundColor:"#007c91"

    },
    txt1: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",

    }
})
export default dashboard
