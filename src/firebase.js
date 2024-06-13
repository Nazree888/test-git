import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import {toast} from 'react-toastify'

const firebaseConfig = {
    apiKey: "AIzaSyCJIGSLq0KxfXsC5skBhxk6I2etWTfks5Y",
    authDomain: "netflix-clone-51091.firebaseapp.com",
    projectId: "netflix-clone-51091",
    storageBucket: "netflix-clone-51091.appspot.com",
    messagingSenderId: "303144690265",
    appId: "1:303144690265:web:db8a70bf909d7d3a3b4748"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });

    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const login = async (email, password) => { // เพิ่มพารามิเตอร์ email และ password
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const logout = () => {
    signOut(auth);
}

export { auth, db, login, signup, logout };
