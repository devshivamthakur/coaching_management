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
}

export const Firebase = new firebase();