import express from "express"
import globalErrorHandler from "./middlewares/errorMiddleware.js";
import indexRoutes from "./routes/index.js"
import cookieParser from "cookie-parser";
import cors from "cors";
import config from "./config/config.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
            origin: config.CLIENT_URL,
            credentials: true
}))


app.use("/api", indexRoutes);


app.use(globalErrorHandler);



export default app;