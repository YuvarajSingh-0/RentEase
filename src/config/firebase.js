import { initializeApp } from "firebase/app";
import {
    GoogleAuthProvider,
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
    signInWithRedirect,
    getRedirectResult
} from "firebase/auth";
import {
    getFirestore,
    query,
    getDocs,
    collection,
    where,
    addDoc,
} from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FB_AUTHKEY,
    authDomain: process.env.REACT_APP_FB_AUTHDOMAIN,
    databaseURL: process.env.REACT_APP_FB_DB_URL,
    projectId: process.env.REACT_APP_FB_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FB_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FB_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_FB_APPID,
    measurementId: process.env.REACT_APP_FB_MEASUREMENTID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Creating a new instance of the GoogleAuthProvider
const googleProvider = new GoogleAuthProvider();

// const signInWithGoogle = async (isOwner=true) => {
//     try {
//         await signInWithRedirect(auth, googleProvider);
//         const res = await getRedirectResult(auth);
//         console.log("in signinwithrd - res",res);
//         const user = res.user;
//         console.log("in user", user);
//         const q = query(collection(db, "users"), where("uid", "==", user.uid));
//         const docs = await getDocs(q);
//         console.log("in docs",docs.docs);
//         if (docs.docs.length === 0) {
//             await addDoc(collection(db, "users"), {
//                 uid: user.uid,
//                 name: user.displayName,
//                 authProvider: "google",
//                 email: user.email,
//                 isOwner: isOwner
//             });
//         }
//     } catch (err) {
    //         console.error(err);
    //         alert(err.message);
    //     }
    // }
    
const signInWithGoogle = async (isOwner = true) => {
        try {
            await signInWithRedirect(auth, googleProvider);
        } catch (err) {
            console.error(err);
            alert(err.message);
        }
    }
    

// const createOnAuthStateChangedCallback = (isOwner) => {
//     console.log("in cretae")
//     return async (user) => {
//         if (user) {
//             try {
//                 const res = await getRedirectResult(auth);
//                 console.log("in signinwithrd - res", res);
//                 const user = res.user;
//                 console.log("in user", user);
//                 const q = query(collection(db, "users"), where("uid", "==", user.uid));
//                 const docs = await getDocs(q);
//                 console.log("in docs", docs.docs);
//                 if (docs.docs.length === 0) {
//                     await addDoc(collection(db, "users"), {
//                         uid: user.uid,
//                         name: user.displayName,
//                         authProvider: "google",
//                         email: user.email,
//                         isOwner: isOwner
//                     });
//                 }
//             } catch (err) {
//                 console.error(err);
//                 alert(err.message);
//             }
//         }
//     };
// };


const logInWithEmailAndPassword = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};


const registerWithEmailAndPassword = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};


const sendPasswordReset = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        alert("Password reset link sent!");
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};
const logout = () => {
    signOut(auth);
};
export {
    auth,
    db,
    signInWithGoogle,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    logout,
};

// console.log(app)