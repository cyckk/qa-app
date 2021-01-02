import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCNhYXJxelVpCR4z9QjcG1u6k_-2SNn72M',
  authDomain: 'quasar-app-4eb7c.firebaseapp.com',
  projectId: 'quasar-app-4eb7c',
  storageBucket: 'quasar-app-4eb7c.appspot.com',
  messagingSenderId: '477989129872',
  appId: '1:477989129872:web:0ba894cd6e022b51b09215',
  measurementId: 'G-613N2RK5XR',
};

// const firebaseConfig = {
//   apiKey: 'AIzaSyDYRVjJmC5pgqL7irE7ckJa2jKB8lQjO4w',
//   authDomain: 'qa-app-84120.firebaseapp.com',
//   projectId: 'qa-app-84120',
//   storageBucket: 'qa-app-84120.appspot.com',
//   messagingSenderId: '589891845722',
//   appId: '1:589891845722:web:48553ef7f354238f97a263',
//   measurementId: 'G-8V51QV2M6B',
// };

// Initialize Firebase
export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const firebaseAuth = firebaseApp.auth();
// export const firebaseDb = firebaseApp.database();
export const firestore = firebaseApp.firestore();

export const firebaseSecondaryApp = firebase.initializeApp(
  firebaseConfig,
  'Secondary'
);
// import something here

// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/boot-files
export default async ({ app, router, Vue }) => {
  // something to do
  Vue.prototype.$auth = firebaseAuth;
  Vue.prototype.$firestore = firestore;

  Vue.prototype.$authSecondary = firebaseSecondaryApp.auth();
};
