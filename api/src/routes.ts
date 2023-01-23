import { Router } from "express";
import UserController from "./controllers/UserController";

const routes: Router = Router();

routes.get("", (_, res) => {
  return res.send("Working");
});

routes.post("/users", UserController.create);
routes.get("/users", UserController.listAll);
routes.patch("/users/password", UserController.updatePassword);

export { routes };
