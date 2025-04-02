import { Request, Response } from "express";
import { createEvent, deleteEvent, getAllEventAdmin, getAllEvents, getEventById, getSearchEvents, updateEvent } from "../services/eventService";
import { AuthRequest } from "../middlewares/authMiddleware";

// export async function getEvents(req: Request, res: Response) {
//   const events = await getAllEvents();
//   res.json(events);
// }

export async function getFilteredEvents(req: Request, res: Response) {
    try {
      const { categorie, lieu } = req.params; 
  
      const events = await getAllEvents(categorie, lieu);
  
      res.json(events);
    } catch (error) {
      res.status(500).json({ error: "Erreur lors de la récupération des événements" });
    }
  }

  
  export async function getEvents(req: Request, res: Response) {
    try {
      const titre = req.query.titre as string | undefined;
      const events = await getSearchEvents(titre);
      res.json(events);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur serveur" });
    }
  }
  
//ADMIN
export async function getEventsAdmin(req: Request, res: Response) {
  try {
    const events = await getAllEventAdmin();
    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur" });
  }
}


export async function getEvent(req: Request, res: Response): Promise<void>  {
    try { 
        const eventId = parseInt(req.params.id);
        if (isNaN(eventId)) {
            res.status(400).json({ error: "ID d'événement invalide" });
        }
        const event = await getEventById(eventId);
        if (!event) {
            res.status(404).json({ error: "Événement non trouvé" });
        }
        res.json(event);
    } catch (error) {
        res.status(500).json({ error: "Erreur interne du serveur" });
    }   
}


export async function createEvenementController(req: AuthRequest, res: Response): Promise<void> {
  try {
    const { titre, description, categorie, image, dateHeure, lieu } = req.body;

    if (!req.user) {
      res.status(401).json({ error: "Utilisateur non authentifié." });
      return;
    }

    const newEvenement = await createEvent(req.user.userId, titre, description, categorie, image, new Date(dateHeure), lieu);
    res.status(201).json(newEvenement);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}


export async function updateEvenementController(req: AuthRequest, res: Response): Promise<void> {
  try {
    const { evenementId } = req.params;
    const updateData = req.body;

    if (!req.user) {
      res.status(401).json({ error: "Utilisateur non authentifié." });
      return;
    }

    const updatedEvenement = await updateEvent(Number(evenementId), req.user.userId, req.user.role, updateData);
    res.json(updatedEvenement);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}


export async function deleteEvenementController(req: AuthRequest, res: Response): Promise<void> {
  try {
    const { evenementId } = req.params;

    if (!req.user) {
      res.status(401).json({ error: "Utilisateur non authentifié." });
      return;
    }

    await deleteEvent(Number(evenementId), req.user.userId, req.user.role);
    res.json({ message: "Événement supprimé avec succès." });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
