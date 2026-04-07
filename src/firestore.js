import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// Security note: the database is functionally open if someone gains access to
// the Firestore project ID. Since this is an academic application, this is
// being accepted. This can be changed in the future if desired.
const firebaseConfig = {
    apiKey: "AIzaSyB7uPGQ0pl3eCrgeeIfkquzfo_bQ9eigC0",

    authDomain: "object-avoidance.firebaseapp.com",

    projectId: "object-avoidance",

    storageBucket: "object-avoidance.firebasestorage.app",

    messagingSenderId: "795729206974",

    appId: "1:795729206974:web:9507ce1561727fbc3488ef"

};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);