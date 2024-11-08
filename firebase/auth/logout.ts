import app from "../config"

import { Auth, getAuth, signOut } from "firebase/auth"

const auth: Auth = getAuth(app)

export default async function logout(){
    try{
        await signOut(auth)
    } catch(e){
        return {user: auth.currentUser, error: e}
    }
    
    return {user: {}, error: null}
}