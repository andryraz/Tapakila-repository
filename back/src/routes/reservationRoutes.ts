import express from "express";
import { cancelReservationController, createReservation, getReservations, getUserReservations } from "../controllers/reservationController";
import { authenticateToken, authorizeRole } from "../middlewares/authMiddleware";
// import { authenticateUser } from "../middlewares/authMiddleware";

const router = express.Router();


router.get("/utilisateur/:userId", getUserReservations);
router.get("/:eventId", getReservations);
router.post("/", authenticateToken, authorizeRole("USER"), createReservation);
router.delete("/:reservationId", authenticateToken, cancelReservationController);


export default router;
