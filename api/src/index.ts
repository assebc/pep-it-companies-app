import "dotenv/config";
import express, { Express } from "express";
import { routes } from "./routes";
import cors from "cors";

const app: Express = express();

app.use(express.json());
app.use(cors());
app.use(routes);

app.listen(process.env.PORT, () => console.log("Api running!!!"));
