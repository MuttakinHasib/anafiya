import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const config = {
  apiKey: 'AIzaSyDFPuVFr2jtVP5LOEkRvgtOs4divVsJsG4',
  authDomain: 'anafiya-shop.firebaseapp.com',
  projectId: 'anafiya-shop',
  storageBucket: 'anafiya-shop.appspot.com',
  messagingSenderId: '252032847151',
  appId: '1:252032847151:web:d76d4b07fec2457cfe65da',
  measurementId: 'G-XJZHCFT94Y',
};

firebase.initializeApp(config);

export const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
