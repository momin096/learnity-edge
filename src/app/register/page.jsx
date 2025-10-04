import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Link from "next/link"
import RegisterForm from "./components/RegisterForm"

export default function Register() {
    return (
        <div className="flex justify-center items-center min-h-[calc(100vh-100px)]">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Create an Account</CardTitle>
                    <CardDescription>
                        Enter your info below to Register
                    </CardDescription>
                    <CardAction>
                        <Link href={'/login'}> <Button variant="link">Sign In</Button></Link>
                    </CardAction>
                </CardHeader>

                <RegisterForm />
            </Card>
        </div>
    )
}
