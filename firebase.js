import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import database from '@react-native-firebase/database';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage   from "@react-native-community/async-storage";  
class firebase {

    create_user = (user, pass) => {
        auth()
            .createUserWithEmailAndPassword(user, pass)
            .then(() => {
                console.log('User account created & signed in!');
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                }

                console.log(error);
            });

    }

    login_user = (user, pass, nav) => {

        return new Promise((myResolve, myReject) => {
            auth().
                signInWithEmailAndPassword(user, pass).
                then((res) => {
                    myResolve("successfull")
                })
                .catch(error => {
                    myReject("Unsuccessfull")
                    console.log(error)
                })
        })
    }


    forgot_password = (email) => {
        return new Promise(function (myResolve, myReject) {
            auth().sendPasswordResetEmail(email)
                .then(function (user) {
                    myResolve("link sent to email");
                }).catch(function (e) {
                    myReject("not sent");
                })

            // The producing code (this may take some time)


        });
    }

    upload_student_photo = async (uri) => {
        var d = new Date();
        const time = d.getTime();
        const reference = storage().ref(d.getTime() + '.png');
        //   const url= await reference.getDownloadURL();

        return new Promise(function (myResolve, myReject) {
            const pathToFile = `${uri}`;

            const task = reference.putFile(uri);

            // The producing code (this may take some time)
            task.on('state_changed', taskSnapshot => {
                console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
            });

            task.then(() => {
                myResolve(time)
                console.log('Image uploaded to the bucket!');
            });

        });
    }
    upload_student_data = (Name, Phone, Course, Address, Total_fee, Paid_fee, Due_fee, photo_url) => {
                return new Promise(function (myResolve, myReject) {
            const newReference = database()
            .ref('/student_data')
            .push();
        newReference
            .set({
                Name: Name,
                Phone:Phone,
                Course:Course,
                Address:Address,
                Total_fee:Total_fee,
                Paid_fee:Paid_fee,
                Due_fee:Due_fee,
                photo_url:String(photo_url)
            })
            .then(() => myResolve("uploaded"))
            .catch((error)=>{
                myReject("notuploaded")
            })
            ;

        });
    }

    read_value(){
        var data=[];
        var key=[];
 
  return new Promise(function (myResolve, myReject) {
           
    database()
    .ref('/student_data')
    .once('value')
    .then(snapshot => {
              
        console.log(JSON.stringify(snapshot.val()))
      console.log(' ', snapshot.forEach((value)=>{
          console.log(value.toJSON())
          data.push(value.toJSON())
          
          key.push(String(value.key))
        
      }));
      myResolve(data)
      AsyncStorage.setItem("key",JSON.stringify(key))
    }).catch((error)=>{
        myReject("not getted")
    })
    ;

});
    }
    async  requestUserPermission() {
        const authStatus = await messaging().requestPermission();
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;
      
        if (enabled) {
          var toake_id= await messaging().getToken();
          console.log("token id "+toake_id)
          console.log('Authorization status:', authStatus);
        }
      }
      
      update_student_data = (Name, Phone, Course, Address, Total_fee, Paid_fee, Due_fee, photo_url,key) => {
        return new Promise(function (myResolve, myReject) {
    const newReference = database()
    .ref('/student_data/'+key)
    .update({
        Name: Name,
        Phone:Phone,
        Course:Course,
        Address:Address,
        Total_fee:Total_fee,
        Paid_fee:Paid_fee,
        Due_fee:Due_fee,
        photo_url:String(photo_url)
    })
    .then(() => myResolve("updated"))
    .catch((error)=>{
        myReject("notupdated")
    })
    ;

});
}
}

export const Firebase = new firebase();