import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import AuthenticationController from "./controllers/AuthenticationController";
import CompaniesController from "./controllers/CompaniesController";
import UserController from "./controllers/UserController";
import DataController from "./controllers/DataController";

const routes: Router = Router();

routes.get("", (_, res) => {
  return res.send("Working");
});

routes.get("/migrate", DataController.import);

routes.post("/login", AuthenticationController.login);

routes.post("/users", UserController.create);
routes.get("/users", UserController.listAll);
routes.patch("/users/password", UserController.forgotPassword);
routes.delete("/users", ensureAuthenticated, UserController.delete);

routes.post("/companies", ensureAuthenticated, CompaniesController.create);
routes.get("/companies", CompaniesController.listAll);
routes.get("/companies/:id", ensureAuthenticated, CompaniesController.listOne);
routes.patch(
  "/companies/:id/vote",
  ensureAuthenticated,
  CompaniesController.addVote
);
routes.put("/companies/:id", ensureAuthenticated, CompaniesController.update);

export { routes };
