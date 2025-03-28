import prisma from "../config/prisma";


// export async function getAllEvents() {
//   return prisma.evenement.findMany({
//     where: {
//       statut: "PUBLIE",
//       dateHeure: {
//         gte: new Date(), 
//       },
//     },
//     select: {
//       titre: true,      
//       dateHeure: true,  
//       image: true,      
//       lieu: true,       
//     },
//   });
// }

export async function getAllEvents(categorie?: string, lieu?: string) {
  return prisma.evenement.findMany({
    where: {
      statut: "PUBLIE",
      dateHeure: {
        gte: new Date(), 
      },
      categorie: categorie ? categorie : undefined, 
      lieu: lieu ? lieu : undefined, 
    },
    select: {
      titre: true,
      dateHeure: true,
      image: true,
      lieu: true,
    },
  });
}

export async function getSearchEvents(titre?: string) {
  return prisma.evenement.findMany({
    where: {
      statut: "PUBLIE",
      dateHeure: { gte: new Date() }, 
      titre: titre
        ? {
            contains: titre, 
            mode: "insensitive", 
          }
        : undefined,
    },
    select: {
      id: true,
      titre: true,
      dateHeure: true,
      lieu: true,
      image: true,
    },
  });
}


export async function getEventById(eventId: number) {
  return prisma.evenement.findUnique({
    where: { id: eventId },
    select: {
      titre: true,
      description: true,
      dateHeure: true,
      lieu: true,
      organisateur: {
        select: {
          nom: true,
          email: true,
        },
      },
      billets: {
        select: {
          type: true,
          prix: true,
          disponibilite: true,
          limiteAchat: true,
        },
      },
    },
  });
}


// ✅ Créer un événement
export async function createEvent(
  organisateurId: number,
  titre: string,
  description: string,
  categorie: string,
  image: string,
  dateHeure: Date,
  lieu: string
) {
  return await prisma.evenement.create({
    data: {
      organisateurId,
      titre,
      description,
      categorie,
      image,
      dateHeure,
      lieu,
      statut: "BROUILLON", // Par défaut
    },
  });
}

// ✅ Modifier un événement (seulement l'organisateur ou un admin)
export async function updateEvent(
  evenementId: number,
  userId: number,
  userRole: string,
  updateData: Partial<{ titre: string; description: string; categorie: string; image: string; dateHeure: Date; lieu: string }>
) {
  // Vérifier si l'événement existe
  const evenement = await prisma.evenement.findUnique({
    where: { id: evenementId },
  });

  if (!evenement) {
    throw new Error("Événement introuvable.");
  }

  // Vérifier si l'utilisateur est bien l'organisateur
  if (evenement.organisateurId !== userId && userRole !== "ADMIN") {
    throw new Error("Accès refusé. Seul l'organisateur peut modifier cet événement.");
  }

  return await prisma.evenement.update({
    where: { id: evenementId },
    data: updateData,
  });
}

// ✅ Supprimer un événement (seulement l'organisateur ou un admin)
export async function deleteEvent(evenementId: number, userId: number, userRole: string) {
  // Vérifier si l'événement existe
  const evenement = await prisma.evenement.findUnique({
    where: { id: evenementId },
  });

  if (!evenement) {
    throw new Error("Événement introuvable.");
  }

  // Vérifier si l'utilisateur est bien l'organisateur
  if (evenement.organisateurId !== userId && userRole !== "ADMIN") {
    throw new Error("Accès refusé. Seul l'organisateur peut supprimer cet événement.");
  }

  return await prisma.evenement.delete({
    where: { id: evenementId },
  });
}
