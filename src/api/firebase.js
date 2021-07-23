import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyACPKokPEYRgvTGvcTRXANzhc8WTvXMu1Q",
    authDomain: "pokemon-quiz-7a302.firebaseapp.com",
    projectId: "pokemon-quiz-7a302",
    storageBucket: "pokemon-quiz-7a302.appspot.com",
    messagingSenderId: "177197423282",
    appId: "1:177197423282:web:e429accdb573ccb8d647ab"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export default firebase;
