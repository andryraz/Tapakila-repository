import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma"; // Vérifie bien ton import de Prisma !
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

export async function registerUser(nom: string, email: string, motDePasse: string) {
  const hashedPassword = await bcrypt.hash(motDePasse, 10);
  const user = await prisma.utilisateur.create({
    data: { nom, email, motDePasse: hashedPassword }
  });

  const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: "10h" });

  return { user, token };
}

export async function loginUser(email: string, motDePasse: string) {
  const user = await prisma.utilisateur.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(motDePasse, user.motDePasse))) {
    throw new Error("Identifiants incorrects");
  }

  const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: "10h" });

  return { user, token };
}
