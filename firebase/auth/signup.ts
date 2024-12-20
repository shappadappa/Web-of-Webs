import app from "../config"

import { Auth, createUserWithEmailAndPassword, getAuth } from "firebase/auth"
import { collection, doc, getDocs, getFirestore, query, setDoc, where }  from "firebase/firestore"

const auth: Auth = getAuth(app)
const db = getFirestore(app)

export default async function signup(email: string, username: string, password: string){
    let user, error

    try{
        if(!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)){
            error = "Invalid email"
            return {user, error}
        }

        if(!username.match(/^[a-zA-Z-._0-9]{3,25}$/)){
            error = "Invalid username"
            return {user, error}
        }

        const querySnapshot = await getDocs(query(collection(db, "users"), where("username_lowercase", "==", username.toLowerCase())))
        
        if(!querySnapshot.empty){
            error = "Username already in use"
            return {user, error}
        }

        user = await createUserWithEmailAndPassword(auth, email, password)

        await setDoc(doc(db, "users", user.user.uid), {username_lowercase: username.toLowerCase(), username, email, createdAt: new Date()})
    } catch(e: any){
        switch(e.code.split("auth/") [1]){
            case "weak-password":
                error = "Password is too weak"
                break
            case "email-already-in-use":
                error = "Email is already in use"
                break
            default:
                error = "Something went wrong. Please try again"
        }
    }

    return {user, error}
}