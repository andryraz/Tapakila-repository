import { Request, Response } from "express";
import { cancelReservation, createNewReservation, getReservationsByUserId } from "../services/reservationService";
import { AuthRequest } from "../middlewares/authMiddleware";


// export async function createReservationController(req: Request, res: Response) {
//   try {
//     const { utilisateurId, evenementId, billets } = req.body; // Récupère les données de la requête
//     const reservation = await createReservation(utilisateurId, evenementId, billets);

//     res.status(201).json(reservation);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Erreur serveur" });
//   }
// }


export async function getUserReservations(req: Request, res: Response): Promise<void> {
  
    try {
    const userId = parseInt(req.params.userId);
    if (isNaN(userId)) {
        res.status(400).json({ error: "ID utilisateur invalide" });
    }
    const reservations = await getReservationsByUserId(userId);
    if (!reservations) {
      res.status(401).json({ error: "L'utilisateur n'a pas encore de reservations !" });
    }
    res.json(reservations);
    } catch (error) {
        res.status(500).json({ error: "Erreur interne du serveur" });
    }

}

export async function createReservation(req: AuthRequest, res: Response): Promise<void> {
  try {
    const { evenementId, billets } = req.body;

    if (!req.user) {
      res.status(401).json({ error: "Non authentifié" });
      return;  
    }

    const userId = req.user.userId; 

   
    if (!evenementId || !billets || !Array.isArray(billets)) {
      res.status(400).json({ error: "Données invalides" });
      return;  
    }

    const reservation = await createNewReservation(userId, evenementId, billets);

    res.status(201).json(reservation);
  } catch (error) {
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
}


export async function cancelReservationController(req: Request, res: Response): Promise<void> {
  try {
    console.log("Utilisateur connecté :", (req as any).utilisateur);

    const utilisateurId = (req as any).user?.userId; 
    const reservationId = parseInt(req.params.reservationId, 10);

    console.log(`Tentative d'annulation de la réservation ID: ${reservationId} par l'utilisateur ID: ${utilisateurId}`);

    if (!utilisateurId) {
      res.status(401).json({ error: "Utilisateur non authentifié !" });
    }

    if (isNaN(reservationId)) {
      res.status(400).json({ error: "ID de réservation invalide." });
    }

    const result = await cancelReservation(utilisateurId, reservationId);
     res.status(200).json(result);
  } catch (error) {
    let errorMessage = "Une erreur inconnue s'est produite.";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    res.status(500).json({ error: errorMessage });
  }
}



