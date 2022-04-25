// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA81k9eug-him_1kLzFsLu1qHVbMESBP5s",
  authDomain: "surf-spots-portal.firebaseapp.com",
  projectId: "surf-spots-portal",
  storageBucket: "surf-spots-portal.appspot.com",
  messagingSenderId: "145052338739",
  appId: "1:145052338739:web:2f6ece4400f2341688b146",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log("Initialized firebase");
const storageHandle = getStorage(app);
const uploadFile = async function (file: File, fileName: string) {
  const storageRef = ref(storageHandle, `uploads/${fileName}`);
  const res = await uploadBytes(storageRef, file);
  return getDownloadURL(res.ref);
};
export { app as default, uploadFile };
