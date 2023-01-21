import "dotenv/config";
import express, { Express } from "express";
import { routes } from "./routes";

const app: Express = express();

app.use(express.json());
app.use(routes);

app.listen(process.env.PORT, () => console.log("Api running!!!"));
