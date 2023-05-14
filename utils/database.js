import mongoose from "mongoose";


let isConnected = false;

export const connectToDB = async () => {
    mongoose.set("strictQuery", true);

    if(isConnected){
        console.log("MongoDB is already connected...");
        return; //To stop trying to initiate a connection to the DB
    }

    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            dbName: "share_prompt",
            // allow users to fall back to the old parser if they find a bug in the new parser
            useNewUrlParser: true,
            /*Set to true to opt in to using the MongoDB driver's new connection management engine. This should be 
            set to true, except for the unlikely case that it prevents the app from maintaining a stable connection.*/
            useUnifiedTopology: true
        })    

        isConnected = true;

        console.log("MongoDB Connected");
    } catch (error) {
        console.log(error);
    }
}