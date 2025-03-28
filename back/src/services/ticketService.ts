import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// 🔹 Fonction pour créer un billet et le lier à un événement
export async function createTicket(
  evenementId: number,
  type: string,
  prix: number,
  disponibilite: number,
  limiteAchat: number,
  venteActive: boolean
) {
  try {
    // Vérifier si l'événement existe
    const evenement = await prisma.evenement.findUnique({
      where: { id: evenementId },
    });

    if (!evenement) {
      throw new Error("L'événement spécifié n'existe pas.");
    }

    // Création du billet
    const billet = await prisma.billet.create({
      data: {
        evenementId,
        type: type as any, // TypeBillet (Enum)
        prix,
        disponibilite,
        limiteAchat,
        venteActive,
      },
    });

    return billet;
  } catch (error: unknown) {
    console.error("Erreur lors de la création du billet :", 
      error instanceof Error ? error.message : error
    );
    throw new Error(error instanceof Error ? error.message : "Une erreur inconnue est survenue.");
  }
}

// 🔹 Fonction pour récupérer les billets d'un événement
export async function getTicketsByEvenement(evenementId: number) {
  try {
    return await prisma.billet.findMany({
      where: { evenementId },
    });
  } catch (error: unknown) {
    console.error("Erreur lors de la recuperation du billets :", 
      error instanceof Error ? error.message : error
    );
    throw new Error(error instanceof Error ? error.message : "Une erreur inconnue est survenue.");
  }
}


// Activer/Désactiver la vente d'un billet
export async function updateBilletVenteStatus(billetId: number, venteActive: boolean) {
  try {
    // Vérifier si le billet existe
    const billet = await prisma.billet.findUnique({
      where: { id: billetId },
    });

    if (!billet) {
      throw new Error("Billet non trouvé.");
    }

    // Mise à jour du statut de vente du billet
    const updatedBillet = await prisma.billet.update({
      where: { id: billetId },
      data: { venteActive },
    });

    return updatedBillet;
  } catch (error) {
    console.error("Erreur lors de la mise à jour du billet");
    throw new Error("Impossible de modifier l'état de vente du billet.");
  }
}
