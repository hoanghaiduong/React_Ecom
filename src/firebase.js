import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyDD7Y5eelmdHmAW8xEwEcmMAFdZGVDzbSE",
    authDomain: "thuongmaidientu-1211f.firebaseapp.com",
    projectId: "thuongmaidientu-1211f",
    storageBucket: "thuongmaidientu-1211f.appspot.com",
    messagingSenderId: "1008396240937",
    appId: "1:1008396240937:web:c4f4819834bfbac3e37438",
    measurementId: "G-LJM6J3R796"
};


export const app = firebase.initializeApp(firebaseConfig);
