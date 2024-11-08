import app from "../config"

import { Auth, getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore"

const auth: Auth = getAuth(app)
const db = getFirestore(app)

export default async function login(emailOrUsername: string, password: string){
    let user, error

    try{
        let email

        if(!emailOrUsername.includes("@")){
            const querySnapshot = await getDocs(query(collection(db, "users"), where("username", "==", emailOrUsername)))

            if(querySnapshot.empty){
                error = "Username or password is incorrect"
                return {user, error}
            }

            email = querySnapshot.docs [0].data().email
        } else{
            email = emailOrUsername
        }

        user = await signInWithEmailAndPassword(auth, email, password)
    } catch(e: any){
        switch(e.code.split("auth/") [1]){
            case "invalid-login-credentials":
                error = "Email or password is incorrect"
                break
            case "too-many-requests":
                error = "Too many recent login requests. Try again later"
                break
            default:
                error = e.code
        }
    }

    return {user, error}
}