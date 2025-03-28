import express from "express";
import { createTicketController, getTicketsByEvenementController, updateBilletVenteController } from "../controllers/ticketController";
import { authenticateToken, authorizeRoles } from "../middlewares/authMiddleware";

const router = express.Router();

// Route pour créer un billet pour un événement spécifique
router.post("/", createTicketController);

// Route pour récupérer les billets d'un événement
router.get("/:evenementId", getTicketsByEvenementController);

router.patch("/:billetId/vente", authenticateToken, authorizeRoles("ADMIN"), updateBilletVenteController);

export default router;
