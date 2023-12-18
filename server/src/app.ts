import express from "express";
import cakeRoute from "./routers/CakeRoute";
import paymentRoute from "./routers/PayPayRoute";
import orderRoute from "./routers/OrderRoute";
import nativePaymentRoute from "./routers/NativePaymentRoute";
import dotenv from "dotenv";
import { logger } from "./logger/logger";
import bodyParser from "body-parser";
import cors from "cors";
import configurePayPay from "./config/config";
import { connectDB } from "./config/db";
import { ErrorHandler } from "./middlewares/ErrorHandler";

dotenv.config();
const app = express();

/// env
const PORT = process.env.PORT || 8020;
const API_KEY = process.env.API_KEY;
const API_SECRET = process.env.API_SECRET;
const MERCHANT_ID = process.env.MERCHANT_ID;

/// paypay config
configurePayPay(API_KEY, API_SECRET, MERCHANT_ID);

/// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

/// db connection
connectDB();

///test route
app.get("/", (req, res) => {
  res.send("Hello OneClick Shop");
});

/// cake routes
app.use("/api/v1", cakeRoute);

/// payment routes
app.use("/api/v1", paymentRoute);

/// order routes
app.use("/api/v1", orderRoute);

/// native payment
app.use("/api/v1", nativePaymentRoute);

/// error handler with middleware
app.use(ErrorHandler);

app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
