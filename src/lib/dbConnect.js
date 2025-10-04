const { MongoClient, ServerApiVersion } = require('mongodb');


export const collectionNames = {
    usersCollection: "users",
}


export default function dbConnect(collectionName) {
    const uri = process.env.MONGO_URI;

    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });

    return client.db(process.env.DB_NAME).collection(collectionName)
}