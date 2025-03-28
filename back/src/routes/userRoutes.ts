import express from "express";
import { getAllUser, getUser, registerUser, updateUserController, updateUserRole } from "../controllers/userController";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/:id", getUser);
router.get("/", getAllUser);
router.get("/user/profile", authenticateToken, getUser);
router.post("/", registerUser);
router.put("/:id", updateUserController);
router.put("/role/:id", updateUserRole);

export default router;
