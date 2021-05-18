import React,{useEffect} from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import login from "./component/login";
import AsyncStorage   from "@react-native-community/async-storage";  
import {  ImageBackground,Alert } from 'react-native';
import forgot_password from './component/forgot_password';
import dashboard from './component/dashboard';
import add_new_Student from './component/add_new_Student';
import show_student from './component/show_student';
import { Firebase } from './firebase';
import messaging from '@react-native-firebase/messaging';
import update_and_view from './component/update_and_view';


var isfirsttime;
var lt="login";

const Stack=createStackNavigator();
 class App extends React.Component{
componentDidMount(){
  Firebase.requestUserPermission()
}
  state={
    loading:true
  }
componentWillUnmount(){
  this.setState({
    loading:true
  })
}
   constructor(args){
     super(args)
    setTimeout(()=>{
        this.setState({
          loading:false
        })
    },4000)
   }
 

  // splash=()=>{
  //   return(
  //             <ImageBackground 
  //             source={require("./images/main_logo.jpg")}
  //             resizeMode="stretch"
  //             style={{
  //               // flex:1,
  //               // alignSelf:"center",
  //               // justifyContent:"center",
  //               width:"100%",
  //               height:"100%",
  //               backgroundColor:"#102027"
              
  //             }}
  //             />
  //   );
  // }

render(){
  const AppNavigation=  () =>{
    // const [getft,setft] = useState(true);  // getft used for check data is getted from storage or not 
   
    const ct= async()=>{  //this method get data (is already loged in or not )
      try {
        var check = await AsyncStorage.getItem("sft")  //get data
        var get_lt = await AsyncStorage.getItem("lt")  //get login type
        if(check==null||get_lt==null){
          isfirsttime=true;
          lt="Login";
          // setft(false)
        }
       else if(check.length==0||get_lt.length==0){
        //  console.log("hello 1");
         isfirsttime=true;
         lt="Login";
            // setft(false)
        
        }
        if(check=='yes'){
          lt="Login";
         isfirsttime=true;
        //  setft(false)
        }
        else if(check=='no'){
           if(get_lt==""){
             lt="Login";
           }else if(get_lt=="dashboard"){
             lt="dashboard";
           }
          isfirsttime=false;
          // setft(false)
        }
      } catch (error) {
        // Alert.alert(error.message)
      }
      
    }
   useEffect(() => {  //it is used to get data before start app
     ct()               //calling function
     const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;

   },[]);
   
    if(!this.state.loading){
      // console.log(isfirsttime)
      // lt="addnh";
      return(
        <NavigationContainer>
          <Stack.Navigator

          // initialRouteName={isfirsttime?lt:lt}  //if isfirsttime is true than call login page or if false call emp page

           initialRouteName={"dashboard"}
          >
             <Stack.Screen
            options={{headerShown:false}}
             name="Login"
             component={login}
             /> 
              <Stack.Screen
            options={{
              title:"forgot password"
            }}
             name="forgot_p"
             component={forgot_password}
             /> 
              <Stack.Screen
            options={{
              title:"dashboard",
              headerShown:false
            }}
             name="dashboard"
            
             component={dashboard}
             /> 
               <Stack.Screen
            options={{
              title:"Add New Student",
              headerShown:true
            }}
             name="add_new_student"
            
             component={add_new_Student}
             /> 
             <Stack.Screen
            options={{
              title:"Registered Student",
              headerShown:true
            }}
             name="view_student"
            
             component={show_student}
             /> 
    
    <Stack.Screen
            options={{
              headerShown:true,
              title:"Student Data"
            }}
             name="view_Student1"
            
             component={update_and_view}
             /> 
          </Stack.Navigator>
        </NavigationContainer>
      );
       
    }
    else{
      return null;
    } 
    
    }
  return(
    <AppNavigation/>
  );
}
}

export default App;
