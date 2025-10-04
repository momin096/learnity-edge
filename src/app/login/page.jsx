import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import Link from "next/link"
import LoginForm from "./components/LoginForm"

export default function Login() {
    return (
        <div className="flex justify-center items-center min-h-[calc(100vh-100px)]">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                    <CardAction>
                        <Link href={'/register'}> <Button variant="link">Sign Up</Button></Link>
                    </CardAction>
                </CardHeader>
                <LoginForm />
            </Card>
        </div>
    )
}
