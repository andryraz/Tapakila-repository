import prisma from "../config/prisma";

export async function getReservationsByUserId(userId: number) {
  return prisma.reservation.findMany({
    where: { utilisateurId: userId },
    include: {
      evenement: true,
      billetsReserves: {
        include: { billet: true },
      },
    },
  });
}


export async function createReservation(
  utilisateurId: number,
  evenementId: number,
  billets: { billetId: number; quantite: number }[] // Liste des billets sélectionnés avec la quantité
) {
  // Commencer une transaction
  return prisma.$transaction(async (prisma) => {
    // Créer la réservation
    const reservation = await prisma.reservation.create({
      data: {
        utilisateurId,
        evenementId,
        dateReservation: new Date(),
      },
    });

    // Ajouter les billets réservés pour cette réservation
    const billetReserves = await Promise.all(
      billets.map((b) =>
        prisma.billetReserve.create({
          data: {
            reservationId: reservation.id,
            billetId: b.billetId,
            quantite: b.quantite,
          },
        })
      )
    );

    // Réduire la disponibilité des billets (en fonction de la quantité réservée)
    await Promise.all(
      billets.map(async (b) => {
        await prisma.billet.update({
          where: { id: b.billetId },
          data: {
            disponibilite: {
              decrement: b.quantite, // Décrémente la disponibilité du billet
            },
          },
        });
      })
    );

    return reservation;
  });
}


export async function createNewReservation(
  utilisateurId: number,
  evenementId: number,
  billets: { billetId: number; quantite: number }[]
) {
  try {
    console.log("Début de la création de réservation");

    return await prisma.$transaction(async (prisma) => {
      // Vérifier si l'événement existe
      const evenement = await prisma.evenement.findUnique({
        where: { id: evenementId },
      });

      if (!evenement) {
        throw new Error("L'événement sélectionné n'existe pas.");
      }

      // Création de la réservation
      const reservation = await prisma.reservation.create({
        data: {
          utilisateurId,
          evenementId,
          dateReservation: new Date(),
        },
      });

      console.log("Réservation créée :", reservation);

      for (const billet of billets) {
        // Récupérer les informations du billet
        const billetDetails = await prisma.billet.findUnique({
          where: { id: billet.billetId },
        });

        if (!billetDetails) {
          throw new Error(`Le billet ID ${billet.billetId} n'existe pas.`);
        }

        if (billetDetails.evenementId !== evenementId) {
          throw new Error(
            `Le billet ID ${billet.billetId} ne fait pas partie de l'événement ID ${evenementId}.`
          );
        }

        if (!billetDetails.venteActive) {
          throw new Error(`Le billet ${billetDetails.type} n'est pas disponible à la vente.`);
        }

        // Vérifier combien de billets cet utilisateur a déjà achetés
        const totalReserveParUtilisateur = await prisma.billetReserve.aggregate({
          _sum: {
            quantite: true,
          },
          where: {
            reservation: {
              utilisateurId,
            },
            billetId: billet.billetId,
          },
        });

        const totalReserve = totalReserveParUtilisateur._sum.quantite || 0;
        const limiteAchatRestante = billetDetails.limiteAchat - totalReserve;

        if (billet.quantite > limiteAchatRestante) {
          throw new Error(
            `Vous avez déjà réservé ${totalReserve} billet(s). La limite est de ${billetDetails.limiteAchat}.`
          );
        }

        // Vérifier la disponibilité des billets
        if (billetDetails.disponibilite < billet.quantite) {
          throw new Error(`Il ne reste que ${billetDetails.disponibilite} billets disponibles.`);
        }

        // Ajouter les billets réservés
        await prisma.billetReserve.create({
          data: {
            reservationId: reservation.id,
            billetId: billet.billetId,
            quantite: billet.quantite,
          },
        });

        // Mettre à jour la disponibilité des billets
        await prisma.billet.update({
          where: { id: billet.billetId },
          data: {
            disponibilite: {
              decrement: billet.quantite,
            },
          },
        });
      }

      console.log("Réservation finalisée.");

      // Retourner la réservation avec les détails
      return await prisma.reservation.findUnique({
        where: { id: reservation.id },
        include: {
          evenement: true,
          billetsReserves: {
            include: {
              billet: true,
            },
          },
        },
      });
    });
  } catch (error: unknown) {
    console.error("Erreur lors de la création de la réservation :", 
      error instanceof Error ? error.message : error
    );
    throw new Error(error instanceof Error ? error.message : "Une erreur inconnue est survenue.");
  }  
}


export async function cancelReservation(utilisateurId: number, reservationId: number) {
  try {
    console.log(`Tentative d'annulation de la réservation ID: ${reservationId} par l'utilisateur ID: ${utilisateurId}`);

    return await prisma.$transaction(async (prisma) => {
      
      const reservation = await prisma.reservation.findUnique({
        where: { id: reservationId },
        include: {
          billetsReserves: true,
          evenement: true,
        },
      });

      
      if (!reservation) {
        console.error("Réservation introuvable.");
        throw new Error("La réservation n'existe pas.");
      }

      
      if (reservation.utilisateurId !== utilisateurId) {
        console.error("Accès refusé : L'utilisateur ne possède pas cette réservation.");
        throw new Error("Vous ne pouvez annuler que vos propres réservations.");
      }

      
      const now = new Date();
      if (reservation.evenement.dateHeure <= now) {
        console.error("Impossible d'annuler une réservation pour un événement passé.");
        throw new Error("Vous ne pouvez pas annuler une réservation pour un événement déjà passé.");
      }

      console.log("Réservation valide pour annulation. Restauration des billets...");

      
      await Promise.all(
        reservation.billetsReserves.map(async (billetReserve) => {
          await prisma.billet.update({
            where: { id: billetReserve.billetId },
            data: {
              disponibilite: {
                increment: billetReserve.quantite, 
              },
            },
          });
        })
      );

      console.log("Disponibilité des billets restaurée.");

    
      await prisma.billetReserve.deleteMany({
        where: { reservationId: reservation.id },
      });

      console.log("Billets réservés supprimés.");


      await prisma.reservation.delete({
        where: { id: reservation.id },
      });

      console.log(`Réservation ID ${reservation.id} annulée avec succès.`);
      return { message: "Réservation annulée avec succès." };
    });
  } catch (error) {
    console.error("Erreur lors de l'annulation de la réservation :");
    throw new Error("Erreur interne du serveur : ");
  }
}



// export async function createNewReservation(
//   utilisateurId: number,
//   evenementId: number,
//   billets: { billetId: number; quantite: number }[] // Liste des billets sélectionnés avec la quantité
// ) {
//   // Commencer une transaction pour garantir l'intégrité des données
//   return prisma.$transaction(async (prisma) => {
//     // Créer la réservation
//     const reservation = await prisma.reservation.create({
//       data: {
//         utilisateurId,
//         evenementId,
//         dateReservation: new Date(), // Date de la réservation
//       },
//     });

//     // Ajouter les billets réservés pour cette réservation
//     const billetReserves = await Promise.all(
//       billets.map((b) =>
//         prisma.billetReserve.create({
//           data: {
//             reservationId: reservation.id,
//             billetId: b.billetId,
//             quantite: b.quantite,
//           },
//         })
//       )
//     );

//     // Réduire la disponibilité des billets (en fonction de la quantité réservée)
//     await Promise.all(
//       billets.map(async (b) => {
//         await prisma.billet.update({
//           where: { id: b.billetId },
//           data: {
//             disponibilite: {
//               decrement: b.quantite, // Décrémente la disponibilité du billet
//             },
//           },
//         });
//       })
//     );

//     // Retourner la réservation avec les billets associés et l'événement
//     return prisma.reservation.findUnique({
//       where: { id: reservation.id },
//       include: {
//         evenement: true,
//         billetsReserves: {
//           include: {
//             billet: true, // Inclure les détails du billet
//           },
//         },
//       },
//     });
//   });
// }
