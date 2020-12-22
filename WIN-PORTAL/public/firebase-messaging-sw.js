//주의: importScripts의 스크립트 버전과 pakcage.json에 명시된 firebase 의존성 버전(여기서는 7.6.1)이 일치하는지 확인하세요. 버전이 일치하지 않으면 올바르게 동작하지 않을 수 있습니다.
// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/7.19.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.19.1/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
  apiKey: "AIzaSyB9X_jTRuRqCk54vqAyOujynQrkid1G3as",
  projectId: "firsttest-17f3c",
  messagingSenderId: "31570577338",
  appId: "1:31570577338:web:d58060d1ee3ecfa29abf83",
}) 

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging()

// 백그라운드 상태에서 받은 알림 처리
//messaging.setBackgroundMessageHandler((payload) => {
  messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload)
  const Noti_Data = JSON.parse(payload.data.notification);
  if(payload.data.OpenPopup == "Y") {
    return self.registration.showNotification(Noti_Data.title, Noti_Data)
  }
  else {
    null;
  }
  debugger;
  
})

// TODO: Notification click event
self.addEventListener('notificationclick', function(event) {
  console.log('background Push clicked');

  event.notification.close();
  debugger;
  //debugger;
  //var thisvevent = event;
   event.waitUntil(
      clients.openWindow(event.notification.data.click_action).then(client=> {
      //clients.openWindow('http://localhost:8080/#/food_select?qqq=ttt').then(client=> {
        //const test = {page:'food_select', data:'444'};
        //debugger;
        //console.log('thisevent', thisevent);
        //client.postMessage(test)
     })
   );
});