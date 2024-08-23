import express from "express";
import workshopController from "../controllers/workshop.controller";

const router = express.Router();

router.get("/workshops/near", workshopController.getNearbyWorkshops);
router. get("/workshops", workshopController.getAll);
router.get("/workshops/:id", workshopController.getById);
router.post("/workshops", workshopController.create);
router.put("/workshops/:id", workshopController.update);
router.delete("/workshops/:id", workshopController.remove);


export default router;
