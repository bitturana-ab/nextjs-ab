import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?: Number;
}

const connection: ConnectionObject ={}

// promise void means that fn will return a any type of promise
async function dbConnect(): Promise<void>{
    if(connection.isConnected){
        console.log("Already connected to the database");
        return;
    }
    // if not 
    try{
        const db = await mongoose.connect(process.env.MONGODB_URI || "");
        connection.isConnected = db.connections[0].readyState;
        console.log("Connected to the database"); 
    }
    catch( error) {
        console.log("database connection error", error);
        process.exit(1); // Exit the process with failure
    }
}

export default dbConnect;