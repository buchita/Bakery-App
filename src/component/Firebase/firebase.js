import firebase from 'firebase'


const firebaseConfig = {
    apiKey: "AIzaSyD9sSTTN-oAd-rqa4mfc0RKIQIj9gQAql8",
    authDomain: "bakeryfr-6c98c.firebaseapp.com",
    databaseURL: "https://bakeryfr-6c98c.firebaseio.com",
    projectId: "bakeryfr-6c98c",
    storageBucket: "bakeryfr-6c98c.appspot.com",
    messagingSenderId: "1010271633562",
    appId: "1:1010271633562:web:bdc334e3d4819c03ef1f23",
    measurementId: "G-3J8TJQYZ4J"
  };

var Firebase = firebase.initializeApp(firebaseConfig);

export default Firebase