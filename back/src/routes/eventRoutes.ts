import express from "express";
import { getEvents, getEvent, getFilteredEvents, createEvenementController, updateEvenementController, deleteEvenementController, getEventsAdmin, deleteEvenementAdmin, updateEvenementAdmin } from "../controllers/eventController";
import { authenticateToken, authorizeRoles } from "../middlewares/authMiddleware";


const router = express.Router();

router.get("/", getEvents);
router.get("/admin", getEventsAdmin);
router.get("/:id", getEvent);

router.get("/categorie/:categorie", getFilteredEvents);
router.get("/lieu/:lieu", getFilteredEvents);
router.post("/", authenticateToken, authorizeRoles("ADMIN", "ORGANISATEUR"), createEvenementController);
// router.post("/", createEvenementController);
router.put("/:evenementId", authenticateToken, authorizeRoles("ADMIN", "ORGANISATEUR"), updateEvenementController);
router.delete("/:evenementId", deleteEvenementAdmin);
// router.get("/:categorie/:lieu", getEvents);
// http://localhost:3000/evenements/?titre=titre


export default router;
