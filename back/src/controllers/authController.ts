import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/authService";

export async function register(req: Request, res: Response): Promise<void> {
  try {
    const { nom, email, motDePasse } = req.body;
    if (!nom || !email || !motDePasse) {
      res.status(400).json({ error: "Tous les champs sont requis" });
      return;
    }
    const result = await registerUser(nom, email, motDePasse);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: "Erreur lors de l'inscription" });
  }
}

export async function login(req: Request, res: Response): Promise<void> {
  try {
    const { email, motDePasse } = req.body;
    if (!email || !motDePasse) {
      res.status(400).json({ error: "Email et mot de passe requis" });
      return;
    }
    const result = await loginUser(email, motDePasse);
    res.json(result);
  } catch (error) {
    console.error("Erreur dans /login:", error); 
    res.status(401).json({ error: "Email ou mot de passe incorrect" });
  }
}
