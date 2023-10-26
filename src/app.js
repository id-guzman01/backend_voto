import express from "express";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";

//Import routes
import votosRoute from './routes/votos.route';
import authRoutes from './routes/auth.route';

const app = express();

//settings
app.set("port",3000);

//Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));

//routes
app.use("/api/v1/votos",votosRoute);
app.use("/api/v1/auth",authRoutes);

export default app;