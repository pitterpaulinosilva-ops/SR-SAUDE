
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// These variables are expected to be defined globally in a <script> tag in index.html
declare const __firebase_config: string;
declare const __app_id: string;
declare const __initial_auth_token: string | null;

const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
export const appId = typeof __app_id !== 'undefined' ? __app_id : 'sesi-ona-dashboard';
export const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
