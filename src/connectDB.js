import mongoose from "mongoose";
import {
    DATABASE_HOST,
    DATABASE_USER,
    DATABASE_PASSWORD,
    
} from './config.js'



export default async(DB_NAME)=>{
    const connect = async ()=>{
        try {
            mongoose
            .connect(`mongodb+srv://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOST}/${DB_NAME}`)
            return console.info('Successfully connected to DB')
        } catch (error) {
            console.error(`Error connecting to DB:`, error)
            return process.exit(1)
        }
    }
    connect()
    mongoose.connection.on("disconnected", connect)
}