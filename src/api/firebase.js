import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyACPKokPEYRgvTGvcTRXANzhc8WTvXMu1Q",
  authDomain: "pokemon-quiz-7a302.firebaseapp.com",
  projectId: "pokemon-quiz-7a302",
  storageBucket: "pokemon-quiz-7a302.appspot.com",
  messagingSenderId: "177197423282",
  appId: "1:177197423282:web:e429accdb573ccb8d647ab",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = firebase.firestore.FieldValue.serverTimestamp();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const createResultSubCollection = async (userAuth, userResults) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`).collection("results");
  const snapShot = await userRef.get();

  if (!snapShot.exist) {
    const createdAt = new Date();

    try {
      await userRef.add({
        userResults,
        createdAt,
      });
    } catch (error) {
      console.log("cannot save your result", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
