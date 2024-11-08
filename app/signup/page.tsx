import Link from "next/link"
import LoginForm from "../components/LoginForm"

export default function Signup() {
    return (
        <main>
            <h1>Signup</h1>

            <p className="mt-1">Already have an acccount? Login <Link className="underline underline-offset-2" href="/login">here</Link>.</p>

            <LoginForm signingUp={true} />
        </main>
    )
}