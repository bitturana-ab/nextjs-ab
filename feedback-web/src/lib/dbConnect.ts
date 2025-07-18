import mongoose from "mongoose";

// return connection object from mongoose after connection
type ConnectionObject = {
    isConnected?: number;
}
// initialy empty object in connection
const connection: ConnectionObject ={}

// promise void means that fn will return any type of promise data i don't care what type of return
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