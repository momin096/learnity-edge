"use server"
import bcrypt from "bcrypt";

import dbConnect, { collectionNames } from "@/lib/dbConnect"

export const registerUser = async (payload) => {

    const { name, photo, email, password } = payload;


    const userCollection = dbConnect(collectionNames.usersCollection);
    // check is user exist
    const user = await userCollection.findOne({ email: payload?.email })

    if (!user) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const userData = {
            name,
            photo,
            email,
            password: hashedPassword,
            role: 'user'
        }
        const result = await userCollection.insertOne(userData)
        return {
            acknowledged: result.acknowledged,
            insertedId: result.insertedId.toString()
        };
    }

    return null
}