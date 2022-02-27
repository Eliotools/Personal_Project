// Mettre les bons credentials
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDxN-SgFRCQAIrFrrn6uupyP76SKFMz85A",
  authDomain: "magic-app-cb03f.firebaseapp.com",
  projectId: "magic-app-cb03f",
  storageBucket: "magic-app-cb03f.appspot.com",
  messagingSenderId: "831169476827",
  appId: "1:831169476827:web:be26496c42f1b66196b4fe",
  measurementId: "G-WP3HHM6DSH"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)