import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const config = JSON.parse(import.meta.env.VITE_PUBLIC_FIREBASE_CONFIG);

export const app = getApps()
  ? getApp()
  : initializeApp(config);

export const auth = getAuth(app);
export const db = getFirestore(app);
