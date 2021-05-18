import React, { Component } from 'react'
import { ScrollView, StyleSheet, Text, TextInput, View, ToastAndroid } from 'react-native'
import { Surface, Button, Avatar, Colors } from 'react-native-paper';
import * as ImagePicker from 'react-native-image-picker';
import NetworkUtils from '../NetworkUtils'
import { Firebase } from '../firebase';
import storage from '@react-native-firebase/storage';
import { BackHandler } from 'react-native';
import ProgressDialog from 'react-native-progress-dialog';

let options = {
    title: 'Select  Image',
    customButtons: [
        { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
    ],
    storageOptions: {
        skipBackup: true,
        path: 'images',
    }

};
export class update_and_view extends Component {
    state = {
        Name: "",
        Phone: "",
        Course: "",
        Address: "",
        Photo: null,
        Total_fee: "",
        Paid_fee: "",
        Due_fee: "0000",
        is_uploading: false,
        photo_url: "",
        progress_visible: false,
        editable: false,
        backgroundColor:"white",
        key:""



    }
    get_Data() {
        var photo = { uri: this.props.route.params.data.photo_url }
        this.setState({
            Name: this.props.route.params.data.Name,
            Phone: this.props.route.params.data.Name,
            Course: this.props.route.params.data.Course,
            Address: this.props.route.params.data.Address,
            Total_fee: this.props.route.params.data.Total_fee,
            Paid_fee: this.props.route.params.data.Paid_fee,
            Due_fee: this.props.route.params.data.Due_fee,
            key: this.props.route.params.key,
            photo_url: this.props.route.params.data.photo_url,
        },
            () => {
                this.setState({
                    Photo: photo
                })
            }
        )
    }
    componentDidMount() {
        this.get_Data()
        // Firebase.read_value()
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    handleBackButtonClick = () => {
        this.props.navigation.goBack();
        return true;
    }
    async update_and_view() {
        const isConnected = await NetworkUtils.isNetworkAvailable()
        if (this.state.is_uploading) {
            ToastAndroid.show("Wait Profile Photo is uploading....", ToastAndroid.LONG);

        }
        else if (isConnected) {
            this.setState({ progress_visible: true })

            if (this.state.Name.trim().length == 0) {
                alert("Student Name is required")
            } else if (this.state.Phone.trim().length == 0) {
                alert("Student Phonenumber is required")

            } else if (this.state.Course.trim().length == 0) {
                alert("Student Course is required")

            } else if (this.state.Address.trim().length == 0) {
                alert("Student Address is required")

            } else if (this.state.Total_fee.trim().length == 0) {
                alert("Total_fee is required")

            } else if (this.state.Paid_fee.trim().length == 0) {
                alert("Paid_fee is required")

            } else if (this.state.photo_url == null && this.state.photo_url.length == 0) {
                alert("Student photo is required")

            } else {
                Firebase.update_student_data(this.state.Name, this.state.Phone, this.state.Course, this.state.Address, this.state.Total_fee, this.state.Paid_fee, this.state.Due_fee, this.state.photo_url,this.state.key)
                    .then((value) => {
                        if (value != null && value.length != 0) {
                            if (value == "updated") {
                                this.setState({ progress_visible: false,editable:false,backgroundColor:"white" })

                                alert('Student updated Successfully')
                            } else {
                                alert('Student Not updated ')
                            }
                        }
                    }).catch((value) => {
                        this.setState({ progress_visible: false })

                        alert('Student Not updated ')
                    })
            }
        }
        else {
            ToastAndroid.show("Internet is required....", ToastAndroid.LONG);
        }
    }
    async get_t(time) {
        const reference = storage().ref(time + '.png');
        const url = await reference.getDownloadURL();
        this.setState({
            photo_url: String(url)
        })
        console.log("url sfds" + url)


    }
    componentWillUnmount() {
        this.setState({
            Name: "",
            Phone: "",
            Course: "",
            Address: "",
            Photo: null,
            Total_fee: "",
            Paid_fee: "",
            Due_fee: "0000",
            is_uploading: false,
            photo_url: null,
            progress_visible: false

        })
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);

    }
    pick_profile_img = async () => {
        // console.log("pick ")
        const isConnected = await NetworkUtils.isNetworkAvailable();
        if (isConnected) {
            ImagePicker.launchImageLibrary(options, (response) => {
                // console.log('Response = ', response);
                if (response.didCancel) {
                    // console.log('User cancelled image picker');
                } else if (response.error) {
                    // console.log('ImagePicker Error: ', response.error);
                } else if (response.customButton) {
                    // console.log('User tapped custom button: ', response.customButton);
                } else {
                    const source = { uri: response.uri };

                    this.setState({
                        Photo: response,
                        is_uploading: true
                    })
                    ToastAndroid.show("ImageUploading...........", ToastAndroid.LONG);
                    console.log(typeof (response.uri));
                    Firebase.upload_student_photo(String(response.uri)).then((value) => {
                        console.log(value)
                        this.get_t(value)
                        this.setState({
                            Photo: response,
                            is_uploading: false
                        })
                    }).catch((error) => {
                        console.log(error)
                        this.setState({
                            is_uploading: false
                        })
                    })
                }
            })
        } else {
            ToastAndroid.show("Internet is not Available !", ToastAndroid.SHORT);
        }
    }
    render() {
        return (
            <View
          
            >
                <ProgressDialog visible={this.state.progress_visible} />
                <ScrollView
                >
                    <Surface
                        style={{
                            padding: 5,
                            backgroundColor:this.state.backgroundColor
                        }}
                    >
                        <Avatar.Image
                            source={this.state.Photo == null ? require("../Images/avatar.png") : { uri: `${this.state.Photo.uri}` }}
                            style={style.img}
                            size={122}
                        />
                        <Button
                            mode="contained"
                            labelStyle={{
                                color: 'white'
                            }}
                            style={
                                {
                                    width: 130,
                                    marginTop: "10%",
                                    borderRadius: 15,
                                    backgroundColor: "#005a9e",
                                    height: 35,
                                    bottom: 20,
                                    alignSelf: "center",
                                    display: this.state.editable ? "flex" : "none"

                                }
                            }
                            onPress={() => this.pick_profile_img()}
                        >
                            Choose File
                </Button>
                        <Text style={style.txt}> Name of student</Text>
                        <TextInput
                            editable={this.state.editable}
                            style={style.TextInput}
                            value={this.state.Name}
                            onChangeText={(text) => { this.setState({ Name: text }) }}
                            placeholder="Ex: Shivam kumar thakur "
                        />
                        <Text style={style.txt}> PhoneNumber of student</Text>
                        <TextInput
                            editable={this.state.editable}
                            style={style.TextInput}
                            value={this.state.Phone}
                            keyboardType="numeric"
                            onChangeText={(text) => { this.setState({ Phone: text }) }}
                            placeholder="Ex: 1234567890 "
                        />
                        <Text style={style.txt}> course</Text>
                        <TextInput
                            editable={this.state.editable}
                            style={style.TextInput}
                            value={this.state.Course}
                            onChangeText={(text) => { this.setState({ Course: text }) }}
                            placeholder="Ex: c,c++,java, "
                        />
                        <Text style={style.txt}> Address of student</Text>
                        <TextInput
                            editable={this.state.editable}
                            style={style.TextInput}
                            value={this.state.Address}
                            onChangeText={(text) => { this.setState({ Address: text }) }}
                            placeholder="Ex: HN XX,area bhopal, mp,1630202 "
                            multiline={true}
                        />

                        <Text style={style.txt}> Total Fee</Text>
                        <TextInput
                            editable={this.state.editable}
                            style={style.TextInput}
                            value={this.state.Total_fee}
                            keyboardType="numeric"
                            onChangeText={(text) => { this.setState({ Total_fee: text }) }}
                            placeholder="Ex: 10000 "
                        />

                        <Text style={style.txt} > Paid Fee</Text>
                        <TextInput
                            editable={this.state.editable}
                            style={style.TextInput}
                            value={this.state.Paid_fee}
                            keyboardType="numeric"
                            onChangeText={(text) => { this.setState({ Paid_fee: text }, () => { this.setState({ Due_fee: String(this.state.Total_fee - this.state.Paid_fee) }) }) }}
                            placeholder="Ex: 1200 "
                        />
                        <Text style={style.txt}>Due Fee</Text>
                        <TextInput
                            editable={this.state.editable}
                            style={[style.TextInput, { color: "black" }]}
                            value={this.state.Due_fee}
                            keyboardType="numeric"
                            editable={false}

                        />
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-around"
                            }}
                        >
                            <Button
                                mode="contained"
                                labelStyle={{
                                    color: 'white'
                                }}
                                style={
                                    {
                                        width: 90,
                                        marginTop: "10%",
                                        borderRadius: 15,
                                        backgroundColor: "#005a9e",
                                        height: 40,
                                        bottom: 20,
                                        alignSelf: "center"

                                    }
                                }
                            onPress={()=>this.setState({
                                editable:!this.state.editable
                            },()=>{
                                if(this.state.editable){
                                    this.setState({backgroundColor:Colors.amber300})
                                }else{
                                    this.setState({backgroundColor:"white"})
                                }
                            }
                            )}
                            >
                                Edit
                </Button>
                <Button
                            mode="contained"
                            labelStyle={{
                                color: 'white'
                            }}
                            style={
                                {
                                    width: 160,
                                    marginTop: "10%",
                                    borderRadius: 15,
                                    backgroundColor: "#005a9e",
                                    height: 40,
                                    bottom: 20,
                                    alignSelf: "center",
                                    display:this.state.editable?"flex":"none"

                                }
                            }
                        onPress={()=>this. update_and_view()}
                        >
                            Update Student
                </Button>

                        </View>

                    </Surface>
                </ScrollView>
            </View>
        )
    }
}
const style = StyleSheet.create({
    img: {

        alignSelf: "center",
        backgroundColor: "white"
    },
    txt: {
        color: "#29b6f6",
        fontSize: 15,
        fontWeight: "bold",
        width: "80%",
        alignSelf: "center"

    },
    TextInput: {
        borderBottomWidth: 1,
        borderColor: "#29b6f6",
        textAlign: "center",
        marginBottom: 10,
        // backgroundColor:"red",
        fontSize: 15,
        fontWeight: "bold",
        width: "80%",
        alignSelf: "center",
        color:"black"


    }
})
export default update_and_view
