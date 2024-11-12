"use client"

import Link from "next/link";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import logout from "../../firebase/auth/logout";
import app from "../../firebase/config";
import { redirect } from "next/navigation";

export default function Navbar() {
    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState()

    useEffect(() =>{
        const auth = getAuth(app)

        const unsubscribe = onAuthStateChanged(auth, currentUser =>{
            setUser(currentUser)
            setIsLoading(false)
        })
        
        return () => unsubscribe()
    }, [])

    const handleLogout = async() =>{
        logout()
        setUser()
        redirect("/login")
    }

    return (
        <nav className="md:bg-slate-300 md:text-slate-700 md:col-span-1 md:p-1 md:min-h-screen">
            <h1 className="text-left leading-10"><Link href="/">Web of Webs.</Link></h1>

            {!isLoading &&
                <ul className="mt-8 px-2 lg:px-4 flex flex-col gap-2 mx-auto">
                    {!user ?
                    <>
                        <li><Link href="/login">Login</Link></li>
                        <li><Link href="/signup">Signup</Link></li>
                    </>
                    :
                    <>
                        <li><Link href="/">Home</Link></li>
                        <li><button onClick={handleLogout}>Logout</button></li>
                    </>
                    }
                </ul>
            }
        </nav>
    )
}