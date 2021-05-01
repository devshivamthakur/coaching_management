import auth from '@react-native-firebase/auth';

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

    login_user=  (user,pass,nav)=>{

        return new Promise((myResolve,myReject)=>{
            auth().
            signInWithEmailAndPassword(user,pass).
            then((res)=>{
               myResolve("successfull")
            })
            .catch(error=>{
                     myReject("Unsuccessfull")
                console.log(error)
            })
        })
    }


    forgot_password=(email)=>{
        return new Promise(function(myResolve, myReject) {
            auth().sendPasswordResetEmail(email)
        .then(function (user) {
            myResolve("link sent to email");
          }).catch(function (e) {
            myReject("not sent");
          })
          
          // The producing code (this may take some time)
          
           
          });
    }
}

export const Firebase = new firebase();