import { Router } from "express";
import CompaniesController from "./controllers/CompaniesController";
import UserController from "./controllers/UserController";

const routes: Router = Router();

routes.get("", (_, res) => {
  return res.send("Working");
});

routes.post("/users", UserController.create);
routes.get("/users", UserController.listAll);
routes.patch("/users/password", UserController.updatePassword);

routes.post("/companies", CompaniesController.create);
routes.get("/companies", CompaniesController.listAll);
routes.get("/companies/:id", CompaniesController.listOne);
routes.patch("/companies/:id/vote", CompaniesController.addVote);
routes.put("/companies/:id", CompaniesController.update);

export { routes };
