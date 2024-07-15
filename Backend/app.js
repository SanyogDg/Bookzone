import { config } from "dotenv";
import express from "express";
import { connection } from "./connection/connection.js";
import { router } from "./routes/userroute.js";
import {brouter} from "./routes/bookRoute.js"
import {favRouter} from "./routes/fouriteRoute.js"
import {cartRoute} from "./routes/cartRoute.js"
import {orderRoute} from "./routes/orderRoute.js"
import cors from 'cors';


const app = express();
config({ path: "./config/config.env" })
connection();

app.use(cors());
app.use(express.json());

app.use("/api/v1/user", router)
app.use("/api/v1/book", brouter);
app.use("/api/v1/favr", favRouter);
app.use("/api/v1/cart", cartRoute);
app.use("/api/v1/order", orderRoute);


app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}.`);
})