"use client"

import { FormEvent, useState } from "react"
import login from "../../firebase/auth/login"
import signup from "../../firebase/auth/signup"
import { redirect } from "next/navigation"

export default function LoginForm({signingUp}: {signingUp: boolean}) {
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = async(e: FormEvent) =>{
        e.preventDefault()

        const {user, error} = await login(username, password)

        if(user){
            redirect("/")
        } else{
            console.error(error)
        }
    }

    const handleSignup = async(e: FormEvent) =>{
        e.preventDefault()

        const {user, error} = await signup(email, username, password)

        if(user){
            redirect("/")
        } else{
            console.error(error)
        }
    }

    return (
        <form className="bg-gray-150 max-w-md mx-auto my-10 rounded-md p-4 text-left shadow-[1rem_1rem_0_rgba(0,0,0,0.3)]" onSubmit={e => signingUp ? handleSignup(e) : handleLogin(e)}>
            {signingUp && 
            <>
                <label htmlFor="email">email</label>
                <input className="mb-4" id="email" type="email" value={email} onChange={e => setEmail(e.target.value)}/>
            </>
            }

            <label htmlFor="username">username{!signingUp && " (or email)"}</label>
            <input id="username" type="text" value={username} onChange={e => setUsername(e.target.value)}/>

            <label className="mt-4" htmlFor="password">password</label>
            <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)}/>

            <input className="block mt-8 bg-gray-400 rounded px-2 py-1 cursor-pointer tracking-wider hover:shadow-[0.25rem_0.25rem_0_rgba(0,0,0,0.2)] transition-shadow" type="submit" value={signingUp ? "signup" : "login"}/>
        </form>
    )
}