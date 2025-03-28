import { Request, Response } from "express";
import { getUserById, createUser, getAll, updateUser, updateRoleUser } from "../services/userService";

export async function getUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = parseInt(req.params.id, 10);
      
      if (isNaN(userId)) {
        res.status(400).json({ error: "ID utilisateur invalide" });
        return;
      }
  
      const user = await getUserById(userId);
      
      if (!user) {
        res.status(404).json({ error: "Utilisateur non trouvé" });
        return;
      }
  
      res.json(user);
    } catch (error) {
      console.error("Erreur dans getUser:", error);  // Ajout du log
      res.status(500).json({ error: "Erreur interne du serveur" });
    }
  }

  export const getAllUser = async (req: Request, res: Response) => {
    try {
      const utilisateurs = await getAll();
      res.status(200).json(utilisateurs);
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de la récupération des utilisateurs", error });
    }
  };


export async function registerUser(req: Request, res: Response) {
  const { nom, email, motDePasse } = req.body;
  try {
    const newUser = await createUser(nom, email, motDePasse);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la création de l'utilisateur" });
  }
}


  export async function updateUserController(req: Request, res: Response): Promise<void> {
      try {
          const userId = parseInt(req.params.id, 10);
          
          if (isNaN(userId)) {
              res.status(400).json({ error: "ID utilisateur invalide" });
              return;
          }

          const { nom, email, motDePasse } = req.body;
          const updatedUser = await updateUser(userId, { nom, email, motDePasse });

          res.json(updatedUser);
      } catch (error) {
          console.error("Erreur lors de la mise à jour de l'utilisateur :", error);
          res.status(500).json({ error: "Erreur interne du serveur" });
      }
  }

  export async function updateUserRole(req: Request, res: Response): Promise<void> {
    try {
        const userId = parseInt(req.params.id, 10);
        
        if (isNaN(userId)) {
            res.status(400).json({ error: "ID utilisateur invalide" });
            return;
        }

        const { role } = req.body;
        const updatedUser = await updateRoleUser(userId, { role });

        res.json(updatedUser);
    } catch (error) {
        console.error("Erreur lors de la mise à jour de l'utilisateur :", error);
        res.status(500).json({ error: "Erreur interne du serveur" });
    }
}
