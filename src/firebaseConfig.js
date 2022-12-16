import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
const firebaseApp = initializeApp({
  apiKey: 'AIzaSyBsxlmCMQy1DJgIIGJU8Pdl4_sQjBdFxGY',
  authDomain: 'petvet-36f81.firebaseapp.com',
  projectId: 'petvet-36f81',
  storageBucket: 'petvet-36f81.appspot.com',
  messagingSenderId: '565348669373',
  appId: '1:565348669373:web:84cfe18b23378cab0624d4',
  measurementId: 'G-7134W00JGN',
});

export const auth = getAuth(firebaseApp);
