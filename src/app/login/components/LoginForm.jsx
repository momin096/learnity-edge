"use client"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
    CardContent,
    CardFooter,
} from "@/components/ui/card"
import { signIn } from "next-auth/react"

export default function LoginForm() {

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)

        const email = formData.get("email")
        const password = formData.get("password")

        // console.log("Login Data 👉", { email, password })

        await signIn("credentials", {
            email,
            password,
            callbackUrl: "/",
            redirect: true,
        })
    }

    return (
        <>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="m@example.com"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Password</Label>
                            </div>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="******"
                                required
                            />
                        </div>
                        <Button type="submit" className="w-full mt-4">
                            Login
                        </Button>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex-col gap-2">
                <Button variant="outline" className="w-full hover:text-white mt-2">
                    Login with Google
                </Button>
            </CardFooter>
        </>
    )
}
