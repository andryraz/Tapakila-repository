import { Request, Response } from "express";
import {  createTicket, getTicketsByEvenement, updateBilletVenteStatus } from "../services/ticketService";

// 🔹 Contrôleur pour créer un billet
export async function createTicketController(req: Request, res: Response): Promise<void> {
  try {
    const { evenementId, type, prix, disponibilite, limiteAchat, venteActive } = req.body;

    if (!evenementId || !type || prix == null || disponibilite == null || limiteAchat == null || venteActive == null) {
      res.status(400).json({ error: "Tous les champs sont requis." });
    }

    const billet = await createTicket(evenementId, type, prix, disponibilite, limiteAchat, venteActive);
     res.status(201).json(billet);
  } catch (error) {
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
}

// 🔹 Contrôleur pour récupérer les billets d'un événement
export async function getTicketsByEvenementController(req: Request, res: Response): Promise<void> {
  try {
    const { evenementId } = req.params;

    if (!evenementId) {
      res.status(400).json({ error: "L'ID de l'événement est requis." });
    }

    const billets = await getTicketsByEvenement(Number(evenementId));
    res.status(200).json(billets);
  } catch (error) {
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
}


// 🔹 Activer/Désactiver la vente d'un billet
export async function updateBilletVenteController(req: Request, res: Response): Promise<void> {
  try {
    const { billetId } = req.params;
    const { venteActive } = req.body;

    if (venteActive === undefined) {
      res.status(400).json({ error: "Le champ 'venteActive' est requis." });
    }

    const updatedBillet = await updateBilletVenteStatus(Number(billetId), venteActive);
     res.status(200).json(updatedBillet);
  } catch (error) {
     res.status(500).json({ error: "Erreur interne du serveur" });
  }
}
