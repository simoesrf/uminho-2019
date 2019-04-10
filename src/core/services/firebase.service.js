// import mock from "./mock.json";
import "firebase/firestore";
import firebase from "firebase/app";

// Initialize Firebase
const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "uminho-2019.firebaseapp.com",
    databaseURL: "https://uminho-2019.firebaseio.com",
    projectId: "uminho-2019",
    storageBucket: "uminho-2019.appspot.com",
    messagingSenderId: "803005561200"
};

firebase.initializeApp(config);

const get = async (path, params) => {
    const docsRef = await firebase.firestore().collection(path).get();
    const data = docsRef.docs.map(doc => doc.data())

    return data;
    // return new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //         try {
    //             resolve(mock[path]);
    //         } catch (error) {
    //             reject(error);
    //         }
    //     }, 0);
    // });
};

export { get };
