import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { loginUser } from "./LoginUser";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                if (!credentials?.email || !credentials?.password) {
                    return null
                }

                try {
                    const user = await loginUser({
                        email: credentials.email,
                        password: credentials.password
                    })

                    if (!user) {
                        return null
                    }

                    if (user.success === false) {
                        return null
                    }

                    if (user._id) {
                        return {
                            id: user._id.toString(),
                            email: user.email,
                            name: user.name,
                            image: user.photo || null,
                            role: user.role || 'user', // ✅ role যোগ করুন
                        }
                    }

                    if (user.success && user.user) {
                        return {
                            id: user.user._id.toString(),
                            email: user.user.email,
                            name: user.user.name,
                            image: user.user.photo || null,
                            role: user.user.role || 'user', // ✅ role যোগ করুন
                        }
                    }

                    return null

                } catch (error) {
                    console.error("Authorize error:", error)
                    return null
                }
            }
        })
    ],
    pages: {
        signIn: '/login',
        error: '/login',
    },
    callbacks: {
        async jwt({ token, user, trigger, session }) {
            // প্রথম login এ user থাকবে
            if (user) {
                token.id = user.id
                token.email = user.email
                token.name = user.name
                token.image = user.image
                token.role = user.role // ✅ JWT token এ role যোগ করুন
            }

            // Update করার জন্য (optional)
            if (trigger === "update" && session) {
                token.role = session.role
            }

            return token
        },
        async session({ session, token }) {
            // Session এ user info যোগ করুন
            if (token && session.user) {
                session.user.id = token.id
                session.user.email = token.email
                session.user.name = token.name
                session.user.image = token.image
                session.user.role = token.role // ✅ Session এ role যোগ করুন
            }
            return session
        }
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60,
    },
    secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }