import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from './routes/user.route.js';
import gigRoute from "./routes/gig.route.js";
import authRoute from './routes/auth.route.js';
import conversationRoute from './routes/conversation.route.js';
import messageRoute from './routes/message.route.js';
import orderRoute from './routes/order.route.js';
import reviewRoute from './routes/review.route.js';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());
app.use(cookieParser());

dotenv.config();
mongoose.set("strictQuery", true);

const connectToDB = async () => {
	try {
		await mongoose.connect(process.env.MONGO);
		console.log("Connected to db");
	} catch (error) {
		console.log(error);
	}
};

app.use("/backend/users", userRoute);
app.use("/backend/auth", authRoute);
// app.use("/backend/conversations", conversationRoute);
// app.use("/backend/gigs", gigRoute);
// app.use("/backend/messages", messageRoute);
// app.use("/backend/orders", orderRoute);
// app.use("/backend/reviews", reviewRoute);

app.use((err, req, res, next)=>{
	const errorStatus = err.status || 500;
	const errorMessage = err.message || "Something went wrong ";

	return res.status(errorStatus).send(errorMessage);
})

app.listen(3000, () => {
    connectToDB();
	console.log("Connnected to port 3000");
});
