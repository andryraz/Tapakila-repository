import express from "express";
import userRoutes from "./routes/userRoutes";
import eventRoutes from "./routes/eventRoutes";
import reservationRoutes from "./routes/reservationRoutes";
import authRoutes from "./routes/authRoutes";
import dotenv from "dotenv";
import ticketRoutes from "./routes/ticketRoutes";

dotenv.config();
const app = express();
app.use(express.json());

app.use("/utilisateurs", userRoutes);
app.use("/evenements", eventRoutes);
app.use("/reservations", reservationRoutes);
app.use("/billets", ticketRoutes);
app.use("/auth", authRoutes);

export default app;
