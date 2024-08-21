// This a service worker file for receiving push notifitications.
// See `Access registration token section` @ https://firebase.google.com/docs/cloud-messaging/js/client#retrieve-the-current-registration-token

// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');


// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyBw9AcYrSRjbv3wi1sgOJKa89X_EksQUpc",
  authDomain: "pwa-pushnotification-83236.firebaseapp.com",
  projectId: "pwa-pushnotification-83236",
  storageBucket: "pwa-pushnotification-83236.appspot.com",
  messagingSenderId: "174704977049",
  appId: "1:174704977049:web:2ecafb14f221e25c67c408",
  measurementId: "G-BFPSM4M4N0"
};


firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

// Handle incoming messages while the app is not in focus (i.e in the background, hidden behind other tabs, or completely closed).
messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
      notificationOptions);
});
