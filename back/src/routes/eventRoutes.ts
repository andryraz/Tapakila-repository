import express from "express";
import { getEvents, getEvent, getFilteredEvents, createEvenementController, updateEvenementController, deleteEvenementController, getEventsAdmin } from "../controllers/eventController";
import { authenticateToken, authorizeRoles } from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/", getEvents);
router.get("/admin", getEventsAdmin);
router.get("/:id", getEvent);

router.get("/categorie/:categorie", getFilteredEvents);
router.get("/lieu/:lieu", getFilteredEvents);
router.post("/", authenticateToken, authorizeRoles("ADMIN", "ORGANISATEUR"), createEvenementController);
router.put("/:evenementId", authenticateToken, updateEvenementController);
router.delete("/:evenementId", authenticateToken, deleteEvenementController);
// router.get("/:categorie/:lieu", getEvents);
// http://localhost:3000/evenements/?titre=titre


export default router;
