import firebase from 'firebase/app'
import 'firebase/messaging'
import { SetPushToken } from "@/api/Notification.js";

var firebaseConfig = {
  apiKey: "AIzaSyB9X_jTRuRqCk54vqAyOujynQrkid1G3as",
  authDomain: "firsttest-17f3c.firebaseapp.com",
  databaseURL: "https://firsttest-17f3c.firebaseio.com",
  projectId: "firsttest-17f3c",
  storageBucket: "firsttest-17f3c.appspot.com",
  messagingSenderId: "31570577338",
  appId: "1:31570577338:web:d58060d1ee3ecfa29abf83",
  measurementId: "G-NR3DZ6HX7B"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.usePublicVapidKey('BPb2mYgseE47UKy6UWShhopyF-2p_JwxhtbbnEPe0h1_gYPVqhUqh4em3YUZLniZgDb6VV_zdrqrJfVecwRzqy8')

messaging.onTokenRefresh(() => {
  messaging.getToken().then((refreshedToken) => {
    console.log('Token refreshed.', refreshedToken);
    this.get_Token(refreshedToken);
    
    this.sendTokenToServer(refreshedToken);
    // Indicate that the new Instance ID token has not yet been sent to the
    // app server.
    //setTokenSentToServer(false);
    // Send Instance ID token to app server.
    //sendTokenToServer(refreshedToken);
    // [START_EXCLUDE]
    // Display new Instance ID token and clear UI of all previous messages.
    //resetUI();
    // [END_EXCLUDE]
  }).catch((err) => {
    console.log('Unable to retrieve refreshed token ', err);
    //showToken('Unable to retrieve refreshed token ', err);
  });
});

messaging.onMessage(function(payload) {
  console.log('onMessage', payload);
  // const notificationTitle = 'Background Message Title';
  // const notificationOptions = {
  //   body: 'Background Message body.',
  //   icon: '/firebase-logo.png'
  // };
  //debugger;
  if(payload.data.OpenPopup == "Y") {
    navigator.serviceWorker.getRegistration().then(registration => {
      const Noti_Data = JSON.parse(payload.data.notification);
    //  debugger;
      registration.showNotification(Noti_Data.title, Noti_Data);
    }).catch(err => {
      console.log('onmessage_catch', err);
    });
  } else {
    const info = JSON.parse(payload.data.info);
    //const content = JSON.parse(info.content);
    window.postMessage(info.content,info.url);
  }
 
  //window.postMessage('111','http://localhost:8080/food_select');
  

  // return self.registration.showNotification(notificationTitle,
  //   notificationOptions);
});

export default {  

  // FireBase Server에서 클라이언트의 Token을 받아온다.
  async getToken() {
    let Token = '';
    
    try {
       const currentToken = await messaging.getToken();
      // if(currentToken) {
         Token = currentToken;
      //   this.sendTokenToServer(currentToken);
      //   console.log("Token Receieved", currentToken);
      // }
      // else {
      //   console.log("Token not Receieved");
      // }
    }
    catch(err) {
      console.log("getToken_Err", err);
    }
    return Token;
  },

  // 서버에 토큰을 저장한다.
  async sendTokenToServer(Token) {
  
    const data=[];    
    data[0]= {data: JSON.stringify({ TYPE:"PORTAL", USER_ID:"", TOKEN:Token })}
    const Save_Data={data}; // 저장할 데이터를 담는 변수(구분, 도서구분키, 대여자, 대여여부)
    //SetPushToken(Save_Data);
    const result = await SetPushToken(Save_Data);
    console.log('send_token_result', result[0].query_err_msg)
  },

  
}
