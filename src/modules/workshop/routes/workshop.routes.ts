import express from "express";
import workshopController from "../controllers/workshop.controller";
import { validateWorkshopCreate, validateWorkshopUpdate } from "../models/validator";

const router = express.Router();

router.get("/workshops/near", workshopController.getNearbyWorkshops);
router.get("/workshops", workshopController.getAll);
router.get("/workshops/:id", workshopController.getById);
router.post("/workshops", validateWorkshopCreate, workshopController.create);
router.put("/workshops/:id", validateWorkshopUpdate, workshopController.update);
router.delete("/workshops/:id", workshopController.remove);

export default router;
