"use client"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { CardContent, CardFooter } from "@/components/ui/card"
import { registerUser } from "@/app/actions/auth/registerUser"

export default function RegisterForm() {
    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)

        const name = formData.get("name")
        const email = formData.get("email")
        const photo = formData.get("photo")
        const password = formData.get("password")
        

        await registerUser({ name, email, photo, password })
    }

    return (
        <>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <CardContent>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Your Full Name</Label>
                                <Input id="name" name="name" type="text" placeholder="John Doe" required />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" name="email" type="email" placeholder="m@example.com" required />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="photo">PhotoUrl</Label>
                                <Input id="photo" name="photo" type="url" placeholder="https://example.com/photo.jpg" required />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" name="password" type="password" placeholder="******" required />
                            </div>
                        </div>
                    </CardContent>

                    <CardFooter className="flex-col gap-2 mt-4">
                        <Button type="submit" className="w-full">
                            Register
                        </Button>
                        <Button variant="outline" className="w-full hover:text-white mt-5">
                            Continue with Google
                        </Button>
                    </CardFooter>
                </form>
            </CardContent>
        </>
    )
}
