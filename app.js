// import express from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import userRouter from "./routes/user-routes";
// import adminRouter from "./routes/admin-routes";
// import consultantsRouter from "./routes/consultants-routes";
// import bookingsRouter from "./routes/bookings-routes";
// import cors from "cors";

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// const corsOptions = {
//   origin: [
//     "https://funny-beijinho-38123d.netlify.app",
//     "http://localhost:5000",
//   ], // Replace with your frontend URL
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   credentials: true, // If you need to include cookies in your requests
//   optionsSuccessStatus: 204, // Some legacy browsers (IE11, various SmartTVs) choke on 204
// };

// app.use(cors(corsOptions));

// // Middleware to handle preflight requests
// app.options("https://funny-beijinho-38123d.netlify.app", (req, res) => {
//   res.status(200).send();
// });

// app.use(express.json());
// app.use("/user", userRouter);
// app.use("/admin", adminRouter);
// app.use("/consultants", consultantsRouter);
// app.use("/bookings", bookingsRouter);

// mongoose
//   .connect(
//     `mongodb+srv://nayonranidulochana:${process.env.mongoDB_password}@cluster0.xxvadbi.mongodb.net`
//   )
//   .then(() =>
//     app.listen(PORT, () =>
//       console.log(`Connected to db and server started on port ${PORT}`)
//     )
//   )
//   .catch((error) => console.log(error));

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user-routes.js";
import adminRouter from "./routes/admin-routes.js";
import consultantsRouter from "./routes/consultants-routes.js";
import bookingsRouter from "./routes/bookings-routes.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/consultants", consultantsRouter);
app.use("/bookings", bookingsRouter);

mongoose
  .connect(
    `mongodb+srv://nayonranidulochana:${process.env.mongoDB_password}@cluster0.xxvadbi.mongodb.net`
  )
  .then(() =>
    app.listen(5000, () =>
      console.log("Connected to db and server started on port 5000")
    )
  )
  .catch((error) => console.log(error));

// import  express  from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import userRouter from "./routes/user-routes";
// import adminRouter from "./routes/admin-routes";
// import consultantsRouter from "./routes/consultants-routes";
// import bookingsRouter from "./routes/bookings-routes";
// import cors from "cors";
// dotenv.config();

// const app = express();

// app.use(cors());

// app.use(express.json());
// app.use("/user", userRouter);
// app.use("/admin",adminRouter)
// app.use("/consultants",consultantsRouter);
// app.use("/bookings",bookingsRouter);

// mongoose.connect(
//     `mongodb+srv://nayonranidulochana:${process.env.mongoDB_password}@cluster0.xxvadbi.mongodb.net/?retryWrites=true&w=majority`
//     ).
//       then(()=>
//         app.listen(5000, ()=>
//             console.log("connected to db")
//     )
//     )
//     .catch((error)=> console.log(error));
