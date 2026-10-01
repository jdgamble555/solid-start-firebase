import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";

const config = JSON.parse(import.meta.env.VITE_PUBLIC_FIREBASE_CONFIG);

const serverApp = getApps()
  ? getApp()
  : initializeApp(config);

export const serverDB = getFirestore(serverApp);
