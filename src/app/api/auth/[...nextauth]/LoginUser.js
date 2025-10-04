"use server";

import dbConnect, { collectionNames } from "@/lib/dbConnect";
import bcrypt from 'bcrypt'


export const loginUser = async (payload) => {
    const { email, password } = payload;

    const userCollection = dbConnect(collectionNames.usersCollection);
    const user = await userCollection.findOne({ email })

    if (!user) return { success: false, message: "User not found!" }

    const isPasswordOk = await bcrypt.compare(password, user.password)
    if (!isPasswordOk) return { success: false, message: "Invalid password!" }

    return user

}