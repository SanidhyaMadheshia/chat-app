import express from "express";
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js"

const app = express();
import authRouter from "./routes/authRoutes.js"
import connectToMongo from "./db/connectToMongoDb.js";
import messageRouter from "./routes/messageRoutes.js"

dotenv.config();


app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 3000;

app.use("/api/auth", authRouter)
app.use("/api/messages", messageRouter)
app.use("/api/users", userRoutes);







app.listen(PORT, () => {
    connectToMongo();
    console.log("running at port 3000");
});