// Firebase Cloud Messaging Configuration File.
// Read more at https://firebase.google.com/docs/cloud-messaging/js/client && https://firebase.google.com/docs/cloud-messaging/js/receive

import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
    apiKey: "AIzaSyBw9AcYrSRjbv3wi1sgOJKa89X_EksQUpc",
    authDomain: "pwa-pushnotification-83236.firebaseapp.com",
    projectId: "pwa-pushnotification-83236",
    storageBucket: "pwa-pushnotification-83236.appspot.com",
    messagingSenderId: "174704977049",
    appId: "1:174704977049:web:2ecafb14f221e25c67c408",
    measurementId: "G-BFPSM4M4N0"
};

initializeApp(firebaseConfig);

const messaging = getMessaging();

export const requestForToken = () => {
    const vapidKey = `BML9KfqaN565KjUb0AjxnncwG2Y3m_Qw3b1MgAIcjKXbe5dyli_K5-xedgoCG2dthuu_2ePCFBMmLuyPevieIgY`;
    // The method getToken(): Promise<string> allows FCM to use the VAPID key credential
    // when sending message requests to different push services
    return getToken(messaging, { vapidKey: `BML9KfqaN565KjUb0AjxnncwG2Y3m_Qw3b1MgAIcjKXbe5dyli_K5-xedgoCG2dthuu_2ePCFBMmLuyPevieIgY` }) //to authorize send requests to supported web push services
        .then((currentToken) => {
            if (currentToken) {
                console.log('current token for client: ', currentToken);

                if (localStorage.getItem('fcmToken') && currentToken !== localStorage.getItem('fcmToken')) {
                    localStorage.setItem('fcmToken', currentToken);

                }

                else if (!localStorage.getItem('fcmToken')) {
                    localStorage.setItem('fcmToken', currentToken);

                }


            } else {
                console.log('No registration token available. Request permission to generate one.');
            }
        })
        .catch((err) => {
            console.log('An error occurred while retrieving token. ', err);
        });
};

// Handle incoming messages. Called when:
// - a message is received while the app has focus
// - the user clicks on an app notification created by a service worker `messaging.onBackgroundMessage` handler.
export const onMessageListener = () =>
    new Promise((resolve) => {
        onMessage(messaging, (payload) => {
            resolve(payload);
        });
    });


