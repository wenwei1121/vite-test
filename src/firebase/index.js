import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCYEOwH02NQUgy_c4x5KGdvokG-wcUCIQo",
  authDomain: "vue3-test-1645f.firebaseapp.com",
  projectId: "vue3-test-1645f",
  storageBucket: "vue3-test-1645f.appspot.com",
  messagingSenderId: "212148843751",
  appId: "1:212148843751:web:ac1af026b67b7646705e42"
};

const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { db }