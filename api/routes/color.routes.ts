import express from "express";
import { ProductColorController } from "@/controllers/colorCtrl";
import { auth, isAdmin } from "@/middlewares/authMiddleware";

const colorRoute = express.Router();

colorRoute.use(auth, isAdmin);

colorRoute
  .route("/")
  .get(ProductColorController.getAllColors)
  .post(ProductColorController.createColor);

colorRoute
  .route("/:id")
  .get(ProductColorController.getColorByID)
  .patch(ProductColorController.updateColor)
  .delete(ProductColorController.deleteColor);

export default colorRoute;
