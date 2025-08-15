import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCA1tSPPLTBpNmHryC_H2TqeU_P-U_w1ow",
  authDomain: "fir-push-notification-81c56.firebaseapp.com",
  projectId: "fir-push-notification-81c56",
  storageBucket: "fir-push-notification-81c56.firebasestorage.app",
  messagingSenderId: "959048959295",
  appId: "1:959048959295:web:ac3c3a53487f8bf14f3f8a",
//   measurementId: "G-MGTXSQWCBM"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// Permission lene aur token fetch karne ka function
export const getOrRenewToken = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      const currentToken = await getToken(messaging, {
        vapidKey: "BAIXkDMfg8UCDfoMY6s3bN-v375MZBoiTs2ecurKrsBw0O7tXBbNXpADwQfpUiKp--904pbriYJ_7S23GWIEj2E" // Yahan VAPID public key daalein
      });
      console.log("FCM Token:", currentToken);
      return currentToken;
    } else {
      console.log('Permission denied for notifications.');
      return null;
    }
  } catch (error) {
    console.error('An error occurred while retrieving token.', error);
    return null;
  }
};

// Foreground messages handle karne ke liye
export const onForegroundMessage = () => {
  onMessage(messaging, (payload) => {
    console.log('Foreground message received:', payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
    };
    new Notification(notificationTitle, notificationOptions);
  });
};