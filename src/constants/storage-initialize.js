import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBrdJ3b2dwDW3mCUCbFcxgHGoqzip4JdXQ",
  authDomain: "webshop-app-cf164.firebaseapp.com",
  databaseURL: "https://webshop-app-cf164-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "webshop-app-cf164",
  storageBucket: "webshop-app-cf164.appspot.com",
  messagingSenderId: "578622809002",
  appId: "1:578622809002:web:b1e94432a1c6e7aca2c1d3"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
