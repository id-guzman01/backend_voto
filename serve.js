import express from "express";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";

//Import routes
import votosRoute from './src/routes/votos.route';
import authRoutes from './src/routes/auth.route';
import sitioRoutes from './src/routes/sitio.router';
import mesaRoutes from './src/routes/mesas.route';

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
app.use("/api/v1/sitio",sitioRoutes);
app.use("/api/v1/mesas",mesaRoutes);

app.listen(3000, ()=>{ 
    console.log('Active web service on the port', 3000);
});