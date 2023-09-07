import  express  from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user-routes";
import adminRouter from "./routes/admin-routes";
import consultantsRouter from "./routes/consultants-routes";
import bookingsRouter from "./routes/bookings-routes";
import cors from "cors";
dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());
app.use("/user", userRouter);
app.use("/admin",adminRouter)
app.use("/consultants",consultantsRouter);
app.use("/bookings",bookingsRouter);

mongoose.connect(
    `mongodb+srv://nayonranidulochana:${process.env.mongoDB_password}@cluster0.xxvadbi.mongodb.net/?retryWrites=true&w=majority`
    ).
      then(()=>
        app.listen(5000, ()=>
            console.log("connected to db")
    )
    )
    .catch((error)=> console.log(error));




