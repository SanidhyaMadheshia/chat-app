import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();
const urwefi = process.env.DBLINK;


// mongoose.connect(uri, ()=>{
//     console.log("mongo db is connected");

// });


const connectToMongo = async() => {
    try {
        await mongoose.connect(urwefi);
        console.log("efwerf");

    } catch (error) {
        console.log(error);
        console.log("there is a problem with the uri");

    }
}

export default connectToMongo;