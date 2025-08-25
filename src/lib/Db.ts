import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGO_URI!;

if (!MONGODB_URI) {
    throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

let cachedDb = global.mongoose;

if (!cachedDb) {
    cachedDb = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
    if (cachedDb.conn) {
        return cachedDb.conn;
    }

    if (!cachedDb.promise) {
        const opts = {
            bufferCommands: false,
            maxPoolSize: 10,
        };
        cachedDb.promise = mongoose.connect(MONGODB_URI, opts).then(() => mongoose.connection);
    }
    try {
        cachedDb.conn = await cachedDb.promise;
    } catch (error) {
        cachedDb.promise = null;
        throw error;
    }

}

export default cachedDb;
