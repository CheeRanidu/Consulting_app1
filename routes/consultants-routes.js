import express from "express";
import {
  addconsultant,
  getAllconsultant,
  getconsultantById,
} from "../controllers/consultants-controller.js";
const consultantsRouter = express.Router();

consultantsRouter.get("/", getAllconsultant);
consultantsRouter.get("/:id", getconsultantById);
consultantsRouter.post("/", addconsultant);

export default consultantsRouter;
