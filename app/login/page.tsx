import Link from "next/link"
import LoginForm from "../components/LoginForm"

export default function Login() {
    return (
        <main>
            <h1>Login</h1>

            <p className="mt-1">Don't have an acccount? Signup <Link className="underline underline-offset-2" href="/signup">here</Link>.</p>

            <LoginForm signingUp={false} />
        </main>
    )
}