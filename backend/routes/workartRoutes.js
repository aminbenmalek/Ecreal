import express from "express";
import {
  ajoutWorkart,
  updateArticle,
  remiseWorkArt,
} from "../controllers/workartController.js";

const Router = express.Router();
Router.route("/:code_art").put(ajoutWorkart);
Router.route("/").put(updateArticle);
Router.route("/delete").delete(remiseWorkArt);
export default Router;
